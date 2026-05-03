"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { usePageTransition } from "./page-transition";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { navigateTo } = usePageTransition();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    navigateTo("/", "home");
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-[60] p-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
      aria-label="Scroll to top"
    >
      <ArrowUp size={24} />
    </button>
  );
}
