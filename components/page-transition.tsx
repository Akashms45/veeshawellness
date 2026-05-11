"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// ─── Constants ───────────────────────────────────────────────────────────────
const STAGGER    = 50;
const DURATION   = 400;
const RECT_COUNT = 4;
const ANIM_TIME  = (RECT_COUNT - 1) * STAGGER + DURATION;
const NAVBAR_H   = 0;

// ─── Types ───────────────────────────────────────────────────────────────────
type Phase = "idle" | "in" | "out";

interface TransitionCtx {
  phase: Phase;
  navigateTo: (href: string, sectionId?: string) => void;
}

// ─── Context ─────────────────────────────────────────────────────────────────
const Ctx = createContext<TransitionCtx | null>(null);

export function usePageTransition() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("Wrap your app with <PageTransitionProvider>");
  return ctx;
}

// ─── Provider ────────────────────────────────────────────────────────────────
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const busy   = useRef(false);
  const router = useRouter();

  const navigateTo = useCallback(
    (href: string, sectionId?: string) => {
      if (busy.current) return;
      busy.current = true;

      // 1. DROP CURTAIN IN
      setPhase("in");

      const isDifferentPage = window.location.pathname !== href;

      // 2. START NAVIGATION EARLY (after a tiny delay so the first strip starts)
      setTimeout(() => {
        if (isDifferentPage) {
          router.push(href, { scroll: false });
        }
      }, 80);

      // 3. LIFT CURTAIN after animation completes + small buffer for load
      const totalWait = ANIM_TIME + (isDifferentPage ? 150 : 50);

      setTimeout(() => {
        // SCROLL to section (or top)
        if (sectionId) {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: "instant", block: "start" });
          } else if (!isDifferentPage) {
            window.scrollTo({ top: 0, behavior: "instant" });
          }
        } else if (!isDifferentPage) {
          window.scrollTo({ top: 0, behavior: "instant" });
        }

          // 3. LIFT CURTAIN OUT
        setPhase("out");

          // 4. RESET
        setTimeout(() => {
          setPhase("idle");
          busy.current = false;
        }, ANIM_TIME + 50);
      }, totalWait);
    },
    [router]
  );

  return (
    <Ctx.Provider value={{ phase, navigateTo }}>
      {children}
    </Ctx.Provider>
  );
}

// ─── Overlay ─────────────────────────────────────────────────────────────────
// 4 horizontal strips (25% height each).
// Strips 1 & 3 enter from LEFT, strips 2 & 4 enter from RIGHT.
const STRIPS = [
  { id: 1, fromX: "-100%" },
  { id: 2, fromX: "100%"  },
  { id: 3, fromX: "-100%" },
  { id: 4, fromX: "100%"  },
];

export function PageTransitionOverlay() {
  const { phase } = usePageTransition();

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex flex-col overflow-hidden ${
        phase === "idle" ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      {STRIPS.map((strip, i) => (
        <motion.div
          key={strip.id}
          className="w-full shrink-0 bg-[#386BB4] border-b border-white/10 last:border-none will-change-transform"
          style={{ height: "25%" }}
          initial={{ x: strip.fromX }}
          animate={{
            x: phase === "in" ? "0%" : strip.fromX,
          }}
          transition={{
            duration: DURATION / 1000,
            delay:    i * (STAGGER / 1000),
            ease:     [0.76, 0, 0.24, 1],
          }}
        />
      ))}
    </div>
  );
}

// ─── TransitionLink ──────────────────────────────────────────────────────────
// Drop-in replacement for <a> / <Link>.
// href        = the page route  e.g. "/products"
// sectionId   = optional scroll target  e.g. "hero"
// All other props (className, children, etc.) pass through.

interface TransitionLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  sectionId?: string;
}

export function TransitionLink({
  href,
  sectionId,
  children,
  onClick,
  ...rest
}: TransitionLinkProps) {
  const { navigateTo } = usePageTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.(e);
    navigateTo(href, sectionId);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}