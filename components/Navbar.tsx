"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { usePageTransition, TransitionLink } from "./page-transition";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
];

function NavbarContent() {
  const { phase } = usePageTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const lastPathFromScroll = useRef<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
        setIsOpen(false);
      } else if (currentScrollY < lastScrollY.current) {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    };
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (phase !== "idle") return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const targetPath = id === "home" ? "/" : `/${id}`;
          if (id && pathname !== targetPath && navLinks.some((l) => l.href === targetPath)) {
            lastPathFromScroll.current = targetPath;
            window.history.replaceState(null, "", targetPath);
          }
        }
      });
    };
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    navLinks.forEach((link) => {
      const id = link.href === "/" ? "home" : link.href.substring(1);
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname, phase]);

  useEffect(() => {
    if (phase !== "idle") return;
    if (pathname === lastPathFromScroll.current) return;
    const id = pathname === "/" ? "home" : pathname.substring(1);
    const validIds = navLinks.map((l) => (l.href === "/" ? "home" : l.href.substring(1)));
    if (id === "home") return;
    if (id && validIds.includes(id)) {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
    }
  }, [pathname, phase]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out ${
        hidden ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      }`}
    >
      {/* ── Pill bar ── */}
      <div className="container mx-auto px-3 sm:px-4 mt-3 sm:mt-4 lg:mt-6">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-2.5 sm:py-3 lg:py-3.5 rounded-full bg-white shadow-lg border border-border/50 max-w-[1400px] mx-auto">
          
          {/* Logo */}
          <TransitionLink
            href="/"
            className="flex items-center gap-2 shrink-0"
            onClick={() => { lastPathFromScroll.current = null; }}
          >
            <img
              src="/logo.svg"
              alt="Veesha Wellness"
              className="h-8 sm:h-9 md:h-10 lg:h-11 w-auto object-contain"
            />
          </TransitionLink>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10 xl:gap-12">
            {navLinks.map((link) => {
            const isSection = link.href.startsWith("/") && link.href !== "/" && !link.href.includes("/allproducts");
              const href = isSection ? "/" : link.href;
              const sectionId = isSection ? link.href.substring(1) : (link.href === "/" ? "home" : undefined);
              const isActive = pathname === link.href;

              return (
                <TransitionLink
                  key={link.name}
                  href={href}
                  sectionId={sectionId}
                  onClick={() => { lastPathFromScroll.current = null; }}
                  className={`text-[11px] lg:text-[13px] font-bold tracking-widest uppercase transition-colors underline-offset-8 hover:underline whitespace-nowrap ${
                    isActive ? "underline decoration-2" : "text-foreground/70"
                  }`}
                  style={{ color: isActive ? "#386BB4" : undefined }}
                >
                  {link.name}
                </TransitionLink>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer overlay ── */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-[-1]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ── Mobile drawer panel ── */}
      <div
        className={`md:hidden absolute top-full left-0 w-full px-3 sm:px-4 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-white mt-2 rounded-3xl p-6 sm:p-8 flex flex-col gap-1 shadow-2xl border border-border">
          {navLinks.map((link, i) => {
            const isSection = link.href.startsWith("/") && link.href !== "/" && !link.href.includes("/allproducts");
            const href = isSection ? "/" : link.href;
            const sectionId = isSection ? link.href.substring(1) : (link.href === "/" ? "home" : undefined);
            const isActive = pathname === link.href;

            return (
              <TransitionLink
                key={link.name}
                href={href}
                sectionId={sectionId}
                className={`flex items-center justify-between py-3.5 px-2 text-lg sm:text-xl font-black border-b border-gray-100 last:border-0 transition-colors rounded-lg hover:bg-gray-50 ${
                  isActive ? "" : "text-foreground/80"
                }`}
                style={{
                  color: isActive ? "#386BB4" : undefined,
                  animationDelay: `${i * 40}ms`,
                }}
                onClick={() => {
                  lastPathFromScroll.current = null;
                  setIsOpen(false);
                }}
              >
                {link.name}
                {isActive && (
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: "#386BB4" }} />
                )}
              </TransitionLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={null}>
      <NavbarContent />
    </Suspense>
  );
}