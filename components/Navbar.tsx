"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
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

  // Update URL on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // Don't update URL during a transition to prevent "jumping back"
      if (phase !== "idle") return;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const targetPath = id === 'home' ? '/' : `/${id}`;
          
          if (id && pathname !== targetPath && navLinks.some(l => l.href === targetPath)) {
            // Track that this update is coming from a scroll event
            lastPathFromScroll.current = targetPath;
            window.history.replaceState(null, '', targetPath);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    navLinks.forEach(link => {
      const id = link.href === '/' ? 'home' : link.href.substring(1);
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname, phase]);


  // Scroll to section on path change
  useEffect(() => {
    // If we're in a page transition, let the transition provider handle the scroll
    if (phase !== "idle") return;

    // If the pathname change was just triggered by our scroll observer, don't jump
    if (pathname === lastPathFromScroll.current) {
      return;
    }

    const id = pathname === '/' ? 'home' : pathname.substring(1);
    const validIds = navLinks.map(l => l.href === '/' ? 'home' : l.href.substring(1));

    // Special case for home - only scroll to top if we are NOT already on the home page
    // and the pathname actually changed to '/'. This prevents jumping back to top 
    // when a transition to a section on the same page completes.
    if (id === "home") {
      // Check if we are already near the top or if this is a fresh page load/navigation
      // If we are at the home page and not in a transition, we usually don't want to 
      // force a scroll to 0 unless it's a specific "Home" link click which TransitionLink handles.
      return; 
    }

    if (id && validIds.includes(id)) {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({
          behavior: "instant",
          block: "start"
        });
      }
    }
  }, [pathname, phase]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-700 ease-in-out delay-150 ${
        hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className={`container mx-auto px-4 mt-6 transition-all duration-300`}>
        <div className={`flex items-center justify-between px-10 py-3.5 rounded-full bg-white shadow-lg border border-border/50 max-w-[1400px] mx-auto w-full`}>
          {/* Logo */}
          <TransitionLink 
            href="/" 
            className="flex items-center gap-2 shrink-0"
            onClick={() => { lastPathFromScroll.current = null; }}
          >
            <img src="/logo.svg" alt="Veesha Wellness" className="h-9 md:h-11 w-auto object-contain" />
          </TransitionLink>

          {/* Desktop Nav Links (Right Side) */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => {
              const isSection = link.href.startsWith("/") && link.href !== "/" && !link.href.includes("/our-sku");
              const href = isSection ? "/" : link.href;
              const sectionId = isSection ? link.href.substring(1) : (link.href === "/" ? "home" : undefined);
              
              return (
                <TransitionLink
                  key={link.name}
                  href={href}
                  sectionId={sectionId}
                  onClick={() => { lastPathFromScroll.current = null; }}
                  className={`text-[13px] font-bold tracking-widest uppercase transition-colors underline-offset-8 hover:underline ${
                    pathname === link.href ? "underline decoration-2" : "text-foreground/70"
                  }`}
                  style={{ color: pathname === link.href ? '#386BB4' : undefined }}
                >
                  {link.name}
                </TransitionLink>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground p-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden bg-white mt-4 rounded-3xl p-8 flex flex-col gap-6 shadow-2xl border border-border animate-in slide-in-from-top-4 duration-300">
            {navLinks.map((link) => {
              const isSection = link.href.startsWith("/") && link.href !== "/" && !link.href.includes("/our-sku");
              const href = isSection ? "/" : link.href;
              const sectionId = isSection ? link.href.substring(1) : (link.href === "/" ? "home" : undefined);

              return (
                <TransitionLink
                  key={link.name}
                  href={href}
                  sectionId={sectionId}
                  className={`text-xl font-black ${
                    pathname === link.href ? "" : "text-foreground/90"
                  }`}
                  style={{ color: pathname === link.href ? '#386BB4' : undefined }}
                  onClick={() => {
                    lastPathFromScroll.current = null;
                    setIsOpen(false);
                  }}
                >
                  {link.name}
                </TransitionLink>
              );
            })}
          </div>
        )}
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
