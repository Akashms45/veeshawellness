"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
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
  }, [pathname]);

  // Scroll to section on path change
  useEffect(() => {
    // If the pathname change was just triggered by our scroll observer, don't jump
    if (pathname === lastPathFromScroll.current) {
      // Clear it so that a future Navbar click to the same path will work
      // (though pathname won't change if it's the same, so this effect wouldn't run anyway)
      return;
    }

    const id = pathname === '/' ? 'home' : pathname.substring(1);
    const validIds = navLinks.map(l => l.href === '/' ? 'home' : l.href.substring(1));

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "instant" });
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
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass py-3 shadow-sm" : "bg-transparent py-5"
      } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link 
          href="/" 
          className="flex items-center gap-2 group"
          onClick={() => { lastPathFromScroll.current = null; }}
        >
          <img src="/logo.svg" alt="Veesha Wellness" className="h-10 md:h-12 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => { lastPathFromScroll.current = null; }}
              className={`text-foreground/80 hover:text-primary font-medium transition-colors ${
                pathname === link.href ? "text-primary font-bold" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden glass absolute top-full left-0 w-full p-6 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-2 duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-lg font-medium py-2 border-b border-border/50 ${
                pathname === link.href ? "text-primary" : "text-foreground/90"
              }`}
              onClick={() => {
                lastPathFromScroll.current = null;
                setIsOpen(false);
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
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
