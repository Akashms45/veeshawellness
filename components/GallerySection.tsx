"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageTransition } from "./page-transition";
import { GALLERY_PROJECTS } from "./gallerydata";

gsap.registerPlugin(ScrollTrigger);

const PINK = "#E91E8C";
const N = GALLERY_PROJECTS.length;

const ALL_ITEMS = [
  ...GALLERY_PROJECTS,
  {
    id: "cta",
    isCta: true,
    color: PINK,
    name: "",
    description: "",
    services: [] as string[],
    image: "",
  },
];
const TOTAL = ALL_ITEMS.length;

// ── Helpers ───────────────────────────────────────────────────────────────────
function hexToRgb(h: string): [number, number, number] {
  const s = h.replace("#", "");
  return [
    parseInt(s.slice(0, 2), 16),
    parseInt(s.slice(2, 4), 16),
    parseInt(s.slice(4, 6), 16),
  ];
}
function lerpColor(a: string, b: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(a),
    [r2, g2, b2] = hexToRgb(b);
  return `rgb(${~~(r1 + (r2 - r1) * t)},${~~(g1 + (g2 - g1) * t)},${~~(b1 + (b2 - b1) * t)})`;
}

// ── useWindowSize ─────────────────────────────────────────────────────────────
function useWindowSize(): { w: number; h: number } {
  const [mounted, setMounted] = useState(false);
  const [size, setSize] = useState({ w: 1440, h: 900 });

  useEffect(() => {
    setMounted(true);
    setSize({ w: window.innerWidth, h: window.innerHeight });
    const handler = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  if (!mounted) return { w: 1440, h: 900 };
  return size;
}

// ── WordRevealTitle ───────────────────────────────────────────────────────────
interface WordRevealTitleProps {
  text: string;
  style?: React.CSSProperties;
}
function WordRevealTitle({ text, style }: WordRevealTitleProps) {
  const words = (text ?? "").split(" ").filter(Boolean);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0 0.25em", ...style }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            lineHeight: 1,
            paddingBottom: "0.08em",
          }}
        >
          <span
            style={{
              display: "inline-block",
              animation: `wordSlideUp 1s cubic-bezier(0.19,1,0.22,1) both`,
              animationDelay: `${i * 0.12}s`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </div>
  );
}

// ── SpanizeDesc ───────────────────────────────────────────────────────────────
interface SpanizeDescProps {
  text: string;
  style?: React.CSSProperties;
  className?: string;
}
function SpanizeDesc({ text, style, className }: SpanizeDescProps) {
  const chars = (text ?? "").split("");
  return (
    <p style={{ margin: 0, ...style }} className={className}>
      {chars.map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            whiteSpace: char === " " ? "pre" : "normal",
            opacity: 0,
            animation: `letterFadeIn 0.4s ease forwards`,
            animationDelay: `${i * 0.03}s`,
          }}
        >
          {char}
        </span>
      ))}
    </p>
  );
}

// ── CardFace ──────────────────────────────────────────────────────────────────
interface GalleryItem {
  id: string | number;
  isCta?: boolean;
  color: string;
  name: string;
  description: string;
  services: string[];
  image: string;
  title?: string;
}
interface CardFaceProps {
  card: GalleryItem;
}
function CardFace({ card }: CardFaceProps) {
  const { navigateTo } = usePageTransition();
  if (card.isCta) {
    return (
      <div
        onClick={() => navigateTo("/our-sku")}
        style={{
          width: "100%",
          height: "100%",
          background: PINK,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          padding: "0 28px",
          cursor: "pointer",
        }}
      >
        <div style={{ fontSize: "clamp(2rem,6vw,3rem)", lineHeight: 1 }}>📦</div>
        <h2
          style={{
            fontFamily: "'Impact','Anton', sans-serif",
            fontSize: "clamp(1.4rem,4vw,2.2rem)",
            color: "#fff",
            textTransform: "uppercase",
            textAlign: "center",
            lineHeight: 1,
            margin: 0,
          }}
        >
          View All
          <br />
          Products
        </h2>
      </div>
    );
  }
  return (
    <>
      <img
        src={card.image}
        alt={card.name}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom,rgba(0,0,0,0.05) 0%,transparent 30%,rgba(0,0,0,0.72) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          transform: "translateY(-50%)",
          textAlign: "center",
          padding: "0 12px",
        }}
      >
        <h2
          style={{
            fontFamily: "Impact,'Anton','Arial Black',sans-serif",
            fontSize: "clamp(1.5rem,4vw,2.8rem)",
            color: "#fff",
            textTransform: "uppercase",
            lineHeight: 0.85,
            margin: 0,
            textShadow: "1px 3px 12px rgba(0,0,0,0.65)",
            whiteSpace: "pre-line",
          }}
        >
          {card.title}
        </h2>
      </div>
    </>
  );
}

// ── GallerySection ────────────────────────────────────────────────────────────
export default function GallerySection() {
  // ✅ outerRef = the tall scroll container (pre-sized, never changes)
  // ✅ sectionRef = the sticky inner panel (100vh, stays on screen)
  const outerRef   = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [animKey,   setAnimKey]   = useState(0);

  const { w } = useWindowSize();

  const isMobile = w < 640;
  const isTablet = w >= 640 && w < 1024;

  const CARD_W  = isMobile ? w * 0.62 : isTablet ? w * 0.28 : 340;
  const CARD_H  = CARD_W * 1.5;
  const SPACING = CARD_W + (isMobile ? 16 : 30);

  const active = GALLERY_PROJECTS[activeIdx] ?? GALLERY_PROJECTS[N - 1];

  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [activeIdx]);

  // ── MAIN GSAP EFFECT ──────────────────────────────────────────────────────
  useEffect(() => {
    const bg    = bgRef.current;
    const outer = outerRef.current;
    const cards = cardRefs.current;
    if (!bg || !outer || !cards.length) return;

    let st: ScrollTrigger | undefined;
    let masterTl: gsap.core.Timeline | undefined;

    const init = () => {
      // Set initial card positions
      gsap.set(cards[0], { x: 0, opacity: 1 });
      for (let i = 1; i < TOTAL; i++) {
        gsap.set(cards[i], { x: i * SPACING, opacity: 1 });
      }
      gsap.set(bg, { backgroundColor: ALL_ITEMS[0].color });

      // Heading reveal observer
      if (headingRef.current) {
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              headingRef.current!.classList.add("animate-in");
              obs.disconnect();
            }
          },
          { threshold: 0.3 },
        );
        obs.observe(headingRef.current);
      }

      masterTl = gsap.timeline({ paused: true });

      for (let i = 1; i < TOTAL; i++) {
        const item     = ALL_ITEMS[i];
        const prevItem = ALL_ITEMS[i - 1];
        const targets  = Array.from({ length: TOTAL - i }, (_, k) => cards[i + k]);

        masterTl.to(targets, {
          x: (k: number) => k * SPACING,
          duration: 1,
          ease: "none", // scrub overrides per-tween ease; none = even step weights
          onUpdate() {
            const frontX = Number(gsap.getProperty(cards[i]!, "x"));
            const t = Math.max(0, Math.min(1, frontX / SPACING));
            bg.style.backgroundColor = lerpColor(item.color, prevItem.color, t);
            if (frontX < 5) {
              setActiveIdx(Math.min(i, N - 1));
            } else {
              setActiveIdx(Math.min(i - 1, N - 1));
            }
          },
          onComplete() {
            setActiveIdx(Math.min(i, N - 1));
            bg.style.backgroundColor = item.color;
          },
        });
      }

      // ✅ KEY FIX: trigger on the OUTER wrapper, not the sticky inner section
      // pin: false — CSS sticky does the pinning, GSAP just drives the animation
      // No spacer is ever inserted, document height never changes = no jump
      st = ScrollTrigger.create({
        trigger: outer,
        start: "top top",
        end: "bottom bottom",
        pin: false,           // ✅ CSS sticky handles pinning — GSAP never touches DOM
        scrub: 1,             // 1s smooth lag — cards glide naturally with scroll
        animation: masterTl,
      });
    };

    if (document.readyState === "complete") {
      init();
    } else {
      window.addEventListener("load", init, { once: true });
    }

    return () => {
      st?.kill();
      masterTl?.kill();
    };
  }, [SPACING]);

  // Total scroll height = (cards - 1) steps × 300vh + 1 viewport to show section
  // 200vh per card step = enough room for each card to animate fully before next fires
  const scrollHeight = `calc(${(TOTAL - 1) * 200}vh + 100vh)`;

  return (
    <>
      <style>{`
        #gs *, #gs *::before, #gs *::after { box-sizing: border-box; }
        #gs button { outline: none; }
        #gs { will-change: transform; }

        @keyframes wordSlideUp {
          0%   { transform: translateY(110%); opacity: 0; }
          100% { transform: translateY(0%);   opacity: 1; }
        }
        @keyframes letterFadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }

        .gs-reveal-heading { position: relative; display: inline-block; overflow: hidden; }
        .gs-reveal-heading h2 { opacity: 0; }
        .gs-reveal-heading.animate-in h2 { animation: gsRevealTextShow 0.1s 1.1s forwards; }
        .gs-reveal-heading.animate-in::before,
        .gs-reveal-heading.animate-in::after {
          content: ''; position: absolute; top: 0; height: 100%; z-index: 20;
        }
        .gs-reveal-heading.animate-in::before {
          background-color: #233E8B;
          animation: gsRevealLTR 1.8s ease forwards;
        }
        .gs-reveal-heading.animate-in::after {
          background-color: #0E101E;
          animation: gsRevealLTR 1s 0.6s ease forwards;
        }
        @keyframes gsRevealLTR {
          0%   { width: 0; left: 0; }
          65%  { width: 100%; left: 0; }
          100% { width: 0; left: 100%; }
        }
        @keyframes gsRevealTextShow { to { opacity: 1; } }
      `}</style>

      {/*
        ✅ outerRef — tall wrapper, pre-sized from the start.
        Document height is set on first paint and NEVER changes.
        No spacer insertion = no scroll jump ever.
      */}
      <div
        id="products"
        ref={outerRef}
        style={{
          height: scrollHeight,
          position: "relative",
        }}
      >
        {/*
          ✅ sectionRef — CSS sticky, 100vh tall.
          Sticks to top while user scrolls through outerRef's height.
          GSAP reads that scroll progress and drives masterTl.
        */}
        <div
          id="gs"
          ref={sectionRef}
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            width: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
          }}
        >
          {/* Background */}
          <div
            ref={bgRef}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: ALL_ITEMS[0].color,
              zIndex: 0,
            }}
          />

          {/* Gallery heading */}
          <div
            style={{
              position: "absolute",
              top: isMobile ? 80 : 100,
              left: isMobile ? 0 : -30,
              right: 0,
              zIndex: 40,
              padding: `0 ${isMobile ? "1.2rem" : "clamp(1.5rem,4vw,4.5rem)"}`,
            }}
          >
            <div ref={headingRef} className="gs-reveal-heading">
              <h2
                style={{
                  fontFamily: "'Impact','Anton', sans-serif",
                  fontSize: "clamp(2rem, 7vw, 4.5rem)",
                  color: "#0E101E",
                  textTransform: "uppercase",
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                Gallery
              </h2>
            </div>
          </div>

          {/* ── MOBILE ── */}
          {isMobile ? (
            <>
              <div
                style={{
                  position: "relative",
                  zIndex: 30,
                  width: "100%",
                  padding: "130px 1.2rem 12px",
                  flexShrink: 0,
                }}
              >
                <WordRevealTitle
                  key={`title-${animKey}`}
                  text={active.title ?? ""}
                  style={{
                    fontFamily: "'Impact','Anton', sans-serif",
                    fontSize: "clamp(1.8rem,8vw,3rem)",
                    color: "#fff",
                    textTransform: "uppercase",
                    letterSpacing: "-1px",
                    margin: "0 0 10px 0",
                    textShadow: "2px 4px 0 rgba(0,0,0,0.15)",
                    paddingTop: 26,
                  }}
                />
                <SpanizeDesc
                  key={`desc-${animKey}`}
                  text={active.description ?? ""}
                  style={{
                    fontFamily: "'grift-medium',sans-serif",
                    fontSize: "clamp(0.7rem,3vw,0.85rem)",
                    color: "rgba(255,255,255,0.78)",
                    lineHeight: 1.5,
                    margin: "0 0 12px 0",
                    maxWidth: "90vw",
                    whiteSpace: "pre-wrap",
                  }}
                />
                <div style={{ display: "flex", alignItems: "center" }}>
                  {GALLERY_PROJECTS.map((p, i) => (
                    <div
                      key={p.id}
                      style={{
                        width: i === activeIdx ? 38 : 34,
                        height: i === activeIdx ? 38 : 34,
                        borderRadius: "50%",
                        overflow: "hidden",
                        flexShrink: 0,
                        marginLeft: i === 0 ? 0 : 6,
                        position: "relative",
                        zIndex: i === activeIdx ? 10 : N - i,
                        border:
                          i === activeIdx
                            ? `2px solid ${PINK}`
                            : "2px solid rgba(255,255,255,0.2)",
                        transition: "all 0.3s",
                        background: p.color,
                      }}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  width: "100%",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 5,
                }}
              >
                {ALL_ITEMS.map((item, i) => (
                  <div
                    key={item.id}
                    ref={(el) => { cardRefs.current[i] = el; }}
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      marginLeft: -CARD_W / 2,
                      marginTop: -CARD_H / 2,
                      width: CARD_W,
                      height: CARD_H,
                      borderRadius: 20,
                      overflow: "hidden",
                      background: item.color,
                      boxShadow: "0 6px 24px rgba(0,0,0,0.2)",
                      zIndex: i,
                      willChange: "transform",
                    }}
                  >
                    <CardFace card={item} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* ── TABLET + DESKTOP ── */
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                height: "100%",
                position: "relative",
                zIndex: 10,
              }}
            >
              {/* LEFT PANEL */}
              <div
                style={{
                  position: "relative",
                  zIndex: 30,
                  width: isTablet
                    ? "clamp(160px,30%,280px)"
                    : "clamp(200px,32%,400px)",
                  flexShrink: 0,
                  padding: `0 0 0 ${isTablet ? "1.5rem" : "clamp(1.5rem,4vw,4.5rem)"}`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100vh",
                  gap: 0,
                }}
              >
                <WordRevealTitle
                  key={`title-${animKey}`}
                  text={active.title ?? ""}
                  style={{
                    fontFamily: "'Impact','Anton', sans-serif",
                    fontSize: isTablet
                      ? "clamp(1rem, 2vw, 1.6rem)"
                      : "clamp(1.4rem, 2.8vw, 2.8rem)",
                    color: "#fff",
                    textTransform: "uppercase",
                    letterSpacing: "-1px",
                    margin: "0 0 14px 0",
                    textShadow: "2px 4px 0 rgba(0,0,0,0.15)",
                    minHeight: "1.8em",
                  }}
                />
                <SpanizeDesc
                  key={`desc-${animKey}`}
                  text={active.description ?? ""}
                  style={{
                    fontFamily: "girft-medium",
                    fontSize: isTablet
                      ? "clamp(0.7rem,1.2vw,0.85rem)"
                      : "clamp(0.75rem,1.1vw,0.9rem)",
                    color: "rgba(255,255,255,0.78)",
                    lineHeight: 1.6,
                    margin: "0 0 20px 0",
                    maxWidth: isTablet ? 220 : 300,
                    minHeight: "3em",
                    whiteSpace: "pre-wrap",
                  }}
                />
                <div style={{ display: "flex", alignItems: "center", marginBottom: 22 }}>
                  {GALLERY_PROJECTS.map((p, i) => (
                    <div
                      key={p.id}
                      style={{
                        width:  i === activeIdx ? (isTablet ? 46 : 64) : (isTablet ? 42 : 62),
                        height: i === activeIdx ? (isTablet ? 46 : 64) : (isTablet ? 42 : 62),
                        borderRadius: "50%",
                        overflow: "hidden",
                        flexShrink: 0,
                        marginLeft: i === 0 ? 0 : isTablet ? 6 : 8,
                        position: "relative",
                        zIndex: i === activeIdx ? 10 : N - i,
                        border:
                          i === activeIdx
                            ? `2.5px solid ${PINK}`
                            : "2.5px solid rgba(255,255,255,0.2)",
                        transition:
                          "width 0.3s, height 0.3s, border-color 0.3s, box-shadow 0.3s",
                        boxShadow:
                          i === activeIdx
                            ? `0 0 0 2px ${PINK}55, 0 3px 10px rgba(0,0,0,0.35)`
                            : "0 1px 4px rgba(0,0,0,0.25)",
                        background: p.color,
                      }}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* CARDS AREA */}
              <div
                style={{
                  flex: 1,
                  height: "100vh",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  zIndex: 5,
                }}
              >
                {ALL_ITEMS.map((item, i) => (
                  <div
                    key={item.id}
                    ref={(el) => { cardRefs.current[i] = el; }}
                    style={{
                      position: "absolute",
                      left: isTablet ? "38%" : "33%",
                      top: "55%",
                      marginLeft: -CARD_W / 2,
                      marginTop: -CARD_H / 2,
                      width: CARD_W,
                      height: CARD_H,
                      borderRadius: 28,
                      overflow: "hidden",
                      background: item.color,
                      boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
                      zIndex: i,
                      willChange: "transform",
                    }}
                  >
                    <CardFace card={item} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}