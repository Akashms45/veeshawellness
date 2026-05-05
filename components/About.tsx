"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clamp01 = (t: number) => Math.max(0, Math.min(1, t));
const ease    = (t: number) => t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t;
const mapE    = (v: number, a: number, b: number, x: number, y: number) => x + ease(clamp01((v - a) / (b - a))) * (y - x);

const GAP = 16;

function useMobileCardScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const calc = () => {
      const rect = el.getBoundingClientRect();
      const vh   = globalThis.window.innerHeight;
      const raw = 1 - (rect.bottom / (vh + rect.height));
      setProg(clamp01(raw * 2.2));
    };
    calc();
    globalThis.window.addEventListener('scroll', calc, { passive: true });
    return () => globalThis.window.removeEventListener('scroll', calc);
  }, []);

  return { ref, prog };
}

interface MobileCardItemProps {
  image?: string;
  body: string;
  cta: string;
  backgroundColor?: string;
}

function MobileCardItem({ image, body, cta, backgroundColor }: MobileCardItemProps) {
  const { ref, prog } = useMobileCardScroll();

  const cardW = mapE(prog, 0, 0.7, 30, 88);
  const cardH = mapE(prog, 0, 0.7, 8,  55);
  const cardR = mapE(prog, 0, 0.3, 40, 18);
  const tOpacity = mapE(prog, 0.6, 0.95, 0, 1);
  const tSlide   = mapE(prog, 0.6, 0.95, 20, 0);

  return (
    <div ref={ref} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: '5vw', width: '100%', padding: '14vh 0 14vw', backgroundColor,
    }}>
      <div style={{
        width: `${cardW}vw`, height: `${cardH}vw`, borderRadius: cardR,
        background: '#140505', overflow: 'hidden',
        willChange: 'width, height, border-radius', transition: 'none',
      }}>
        {image && (
          <img 
            src={image} 
            alt="" 
            loading="lazy" 
            onError={(e) => {
              // Fallback to original if webp fails
              if ((e.target as HTMLImageElement).src.endsWith('.webp')) {
                (e.target as HTMLImageElement).src = image.replace('.webp', '.png');
              }
            }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} 
          />
        )}
      </div>
      <div style={{
        padding: '0 7vw', width: '100%', boxSizing: 'border-box',
        opacity: tOpacity, transform: `translateY(${tSlide}px)`, willChange: 'opacity, transform',
      }}>
        <p style={{ margin: '0 0 1rem 0', fontSize: 'clamp(0.9rem, 4vw, 1.05rem)', fontWeight: 400, color: '#140505', lineHeight: 1.65 }}>
          {body}
        </p>
        <button style={{ all: 'unset', fontSize: '1rem', fontWeight: 800, color: '#140505', borderBottom: '2px solid #140505', paddingBottom: '2px', cursor: 'pointer' }}>
          {cta}
        </button>
      </div>
    </div>
  );
}

interface CardAnimationProps {
  heading: string;
  leftText?: string;
  rightText?: string;
  bodyText?: string;
  bodyText2?: string;
  bodyText3?: string;
  ctaText?: string;
  ctaText2?: string;
  ctaText3?: string;
  imageSrc?: string;
  image2Src?: string;
  image3Src?: string;
  backgroundColor?: string;
}

function MobileCardAnimation({
  heading, leftText, rightText,
  bodyText, bodyText2, bodyText3,
  ctaText, ctaText2, ctaText3,
  imageSrc, image2Src, image3Src,
  backgroundColor,
}: CardAnimationProps) {
  const CARDS = [
    { image: imageSrc,   body: bodyText,  cta: ctaText },
    { image: image2Src,  body: bodyText2, cta: ctaText2 || ctaText },
    { image: image3Src,  body: bodyText3, cta: ctaText3 || ctaText },
  ];

  return (
    <div id="about" style={{ width: '100%', backgroundColor, fontFamily: 'var(--font-sans), serif' }}>
      <div style={{ padding: '14vh 6vw 4vh', textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: 'clamp(1.9rem, 8vw, 3rem)', fontWeight: 800, color: '#140505', lineHeight: 1.1, letterSpacing: '-0.025em', fontFamily: 'var(--font-display), serif' }}>
          {heading}
        </h1>
      </div>
      {CARDS.map((card, idx) => (
        <MobileCardItem key={idx} image={card.image} body={card.body!} cta={card.cta!} backgroundColor={backgroundColor} />
      ))}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4vw 6vw 6vw' }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#140505' }}>{leftText}</span>
        <button style={{ all: 'unset', fontSize: '0.65rem', fontWeight: 700, color: '#140505', borderBottom: '1px solid #140505', paddingBottom: '1px', cursor: 'pointer' }}>{rightText}</button>
      </div>
    </div>
  );
}

function DesktopCardAnimation({
  heading, leftText, rightText,
  bodyText, bodyText2, bodyText3,
  ctaText, ctaText2, ctaText3,
  imageSrc, image2Src, image3Src,
  backgroundColor,
}: CardAnimationProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [p,  setP]  = useState(0);
  // ✦ Always start with static SSR-safe values so server & client HTML match
  const [vw, setVw] = useState(1440);
  const [vh, setVh] = useState(900);

  useEffect(() => {
    const onResize = () => { setVw(globalThis.window.innerWidth); setVh(globalThis.window.innerHeight); };
    // Delay initial state update to avoid cascading render error
    setTimeout(onResize, 0);
    globalThis.window.addEventListener('resize', onResize);
    return () => globalThis.window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const sticky = stickyRef.current;
    if (!wrap || !sticky) return;

    const st = ScrollTrigger.create({
      trigger: wrap,
      start: 'top top',
      end: 'bottom bottom',
      pin: sticky,
      pinSpacing: false,
      onUpdate: (self) => {
        setP(self.progress);
      }
    });

    return () => {
      st.kill();
    };
  }, []);

  const BOTTOM_VH = 3;
  const BIG_VW    = 46;
  const BIG_VH    = 94;
  const SM_VW     = 8;
  const SM_VH     = 17;
  const SM_R      = 14;
  const BIG_R     = 20;
  const BOTTOM    = `${BOTTOM_VH}vh`;

  const bigW_px  = (BIG_VW / 100) * vw;
  const bigH_px  = (BIG_VH / 100) * vh;
  const btm_px   = (BOTTOM_VH / 100) * vh;

  const bigLeft_px  = (vw - bigW_px) / 2;
  const bigRight_px = bigLeft_px + bigW_px;
  const bigTop_px   = vh - btm_px - bigH_px;

  const smR_left_px  = bigRight_px + GAP;
  const smL_left_px  = bigLeft_px - GAP - (SM_VW / 100) * vw;
  const smL_top_px   = (BOTTOM_VH / 100) * vh;

  const textCentreFromBottom_px = btm_px + bigH_px / 2;
  const textBottom_css = `${textCentreFromBottom_px}px`;
  const textLeft_px = smR_left_px;

  const pA = clamp01(p / 0.33);
  const c1W  = mapE(pA, 0, 1, 0, BIG_VW);
  const c1H  = mapE(pA, 0, 1, 0, BIG_VH);
  const c1R  = mapE(pA, 0, 0.16, 0, BIG_R);
  const c2_app_W = mapE(pA, 0.5, 0.75, 0, SM_VW);
  const c2_app_H = mapE(pA, 0.5, 0.75, 0, SM_VH);
  const c2_app_R = mapE(pA, 0.5, 0.75, 0, SM_R);
  const hOpacity = 1 - mapE(pA, 0.65, 0.9, 0, 1);
  const hSlide   = mapE(pA, 0.65, 0.9, 0, -40);
  const t1In = mapE(pA, 0.8, 1, 0, 1);

  const pB = clamp01((p - 0.33) / 0.33);
  const t1Opacity = t1In * (1 - mapE(pB, 0, 0.25, 0, 1));
  const t1Slide   = mapE(pA, 0.8, 1, 16, 0);
  const c1B_W    = mapE(pB, 0, 0.6, BIG_VW, SM_VW);
  const c1B_H    = mapE(pB, 0, 0.6, BIG_VH, SM_VH);
  const c1B_R    = mapE(pB, 0, 0.6, BIG_R, SM_R);
  const c1B_left = mapE(pB, 0, 0.6, bigLeft_px, smL_left_px);
  const c1B_top  = mapE(pB, 0, 0.6, bigTop_px, smL_top_px);
  const c2_left = mapE(pB, 0, 0.7, smR_left_px, bigLeft_px);
  const c2_W    = mapE(pB, 0, 0.7, SM_VW, BIG_VW);
  const c2_H    = mapE(pB, 0, 0.7, SM_VH, BIG_VH);
  const c2_R    = mapE(pB, 0, 0.2, SM_R, BIG_R);
  const c3_app_W = mapE(pB, 0.35, 0.6, 0, SM_VW);
  const c3_app_H = mapE(pB, 0.35, 0.6, 0, SM_VH);
  const c3_app_R = mapE(pB, 0.35, 0.6, 0, SM_R);
  const t2In = mapE(pB, 0.5, 0.8, 0, 1);

  const pC = clamp01((p - 0.66) / 0.34);
  const t2Opacity = t2In * (1 - mapE(pC, 0, 0.25, 0, 1));
  const t2Slide   = mapE(pB, 0.5, 0.8, 16, 0);
  const c2C_W    = mapE(pC, 0, 0.6, BIG_VW, SM_VW);
  const c2C_H    = mapE(pC, 0, 0.6, BIG_VH, SM_VH);
  const c2C_R    = mapE(pC, 0, 0.6, BIG_R, SM_R);
  const c2C_left = mapE(pC, 0, 0.6, bigLeft_px, smL_left_px);
  const c2C_top  = mapE(pC, 0, 0.6, bigTop_px, smL_top_px);
  const c3_left = mapE(pC, 0, 0.7, smR_left_px, bigLeft_px);
  const c3_W    = mapE(pC, 0, 0.7, SM_VW, BIG_VW);
  const c3_H    = mapE(pC, 0, 0.7, SM_VH, BIG_VH);
  const c3_R    = mapE(pC, 0, 0.2, SM_R, BIG_R);
  const c1C_W = mapE(pC, 0, 0.6, SM_VW, 0);
  const c1C_H = mapE(pC, 0, 0.6, SM_VH, 0);
  const c1C_R = mapE(pC, 0, 0.6, SM_R, 0);
  const t3Opacity = mapE(pC, 0.4, 0.75, 0, 1);
  const t3Slide   = mapE(pC, 0.4, 0.75, 16, 0);

  const inB = p >= 0.33;
  const inC = p >= 0.66;

  const words = heading.split(' ');
  const mid   = Math.ceil(words.length / 2);
  const line1 = words.slice(0, mid).join(' ');
  const line2 = words.slice(mid).join(' ');

  return (
    <div id="about">
      <div ref={wrapRef} style={{ height: '350vh', position: 'relative' }}>
        <div ref={stickyRef} style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh',
          backgroundColor,
          overflow: 'hidden',
          fontFamily: 'var(--font-sans), serif',
        }}>
          <div style={{
            position: 'absolute', top: '12vh', left: 0, right: 0,
            zIndex: 10, pointerEvents: 'none', userSelect: 'none',
            opacity: hOpacity,
            transform: `translateY(${hSlide}px)`,
            willChange: 'opacity, transform',
          }}>
            <div style={{
              textAlign: 'left',
              paddingLeft: '20%',
              fontSize: 'clamp(2rem, 5.2vw, 5.6rem)',
              fontWeight: 800,
              fontFamily: 'var(--font-display), serif',
              color: '#140505',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
            }}>
              {line1}
            </div>
            <div style={{
              paddingLeft: '50%',
              fontSize: 'clamp(2rem, 5.2vw, 5.6rem)',
              fontWeight: 800,
              fontFamily: 'var(--font-display), serif',
              color: '#140505',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              whiteSpace: 'nowrap',
            }}>
              {line2}
            </div>
          </div>

          <span style={{
            position: 'absolute', bottom: BOTTOM, left: '4vw',
            zIndex: 30, fontSize: '0.7rem', fontWeight: 800,
            letterSpacing: '0.06em', textTransform: 'uppercase', color: '#140505',
          }}>
            {leftText}
          </span>

          <button style={{
            all: 'unset', position: 'absolute', bottom: BOTTOM, right: '4vw',
            zIndex: 30, fontSize: '0.7rem', fontWeight: 700,
            color: '#140505', borderBottom: '1px solid #140505',
            paddingBottom: '1px', cursor: 'pointer',
          }}>
            {rightText}
          </button>

          <SideText opacity={t1Opacity} slide={t1Slide} body={bodyText!}  cta={ctaText!} left={textLeft_px} bottom={textBottom_css} />
          <SideText opacity={t2Opacity} slide={t2Slide} body={bodyText2!} cta={ctaText2 || ctaText!} left={textLeft_px} bottom={textBottom_css} />
          <SideText opacity={t3Opacity} slide={t3Slide} body={bodyText3!} cta={ctaText3 || ctaText!} left={textLeft_px} bottom={textBottom_css} />

          {/* CARD 1 */}
          {(() => {
            let style: React.CSSProperties = { position: 'absolute', zIndex: 20, overflow: 'hidden', background: '#140505', willChange: 'width, height' };
            if (p < 0.33) {
              style = { ...style, bottom: BOTTOM, left: '50%', transform: 'translateX(-50%)', width: `${c1W}vw`, height: `${c1H}vh`, borderRadius: c1R };
            } else if (p < 0.66) {
              style = { ...style, left: `${c1B_left}px`, top: `${c1B_top}px`, width: `${c1B_W}vw`, height: `${c1B_H}vh`, borderRadius: c1B_R, willChange: 'width, height, left, top' };
            } else {
              style = { ...style, left: `${smL_left_px}px`, top: `${smL_top_px}px`, width: `${c1C_W}vw`, height: `${c1C_H}vh`, borderRadius: c1C_R };
            }
            return (
              <div style={style}>
                {imageSrc && (
                  <img 
                    src={imageSrc} 
                    alt="" 
                    loading="lazy" 
                    onError={(e) => {
                      if ((e.target as HTMLImageElement).src.endsWith('.webp')) {
                        (e.target as HTMLImageElement).src = imageSrc.replace('.webp', '.png');
                      }
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} 
                  />
                )}
              </div>
            );
          })()}

          {/* CARD 2 */}
          {(() => {
            if (p < 0.33) {
              return (
                <div style={{ position: 'absolute', bottom: BOTTOM, left: smR_left_px, width: `${SM_VW}vw`, height: `${SM_VH}vh`, overflow: 'visible', zIndex: 20, pointerEvents: 'none' }}>
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: `${c2_app_W}vw`, height: `${c2_app_H}vh`, borderRadius: c2_app_R, overflow: 'hidden', background: '#140505', pointerEvents: 'auto', willChange: 'width, height' }}>
                    {image2Src && <img src={image2Src} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />}
                  </div>
                </div>
              );
            } else if (p < 0.66) {
              return (
                <div style={{ position: 'absolute', bottom: `${btm_px}px`, left: `${c2_left}px`, width: `${c2_W}vw`, height: `${c2_H}vh`, borderRadius: c2_R, zIndex: 21, overflow: 'hidden', background: '#140505', willChange: 'width, height, left' }}>
                  {image2Src && <img src={image2Src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} loading="lazy" />}
                </div>
              );
            } else {
              return (
                <div style={{ position: 'absolute', left: `${c2C_left}px`, top: `${c2C_top}px`, width: `${c2C_W}vw`, height: `${c2C_H}vh`, borderRadius: c2C_R, zIndex: 21, overflow: 'hidden', background: '#140505', willChange: 'width, height, left, top' }}>
                  {image2Src && <img src={image2Src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} loading="lazy" />}
                </div>
              );
            }
          })()}

          {/* CARD 3 */}
          {inB && !inC && (
            <div style={{ position: 'absolute', bottom: BOTTOM, left: smR_left_px, width: `${SM_VW}vw`, height: `${SM_VH}vh`, overflow: 'visible', zIndex: 22, pointerEvents: 'none' }}>
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: `${c3_app_W}vw`, height: `${c3_app_H}vh`, borderRadius: c3_app_R, overflow: 'hidden', background: '#140505', pointerEvents: 'auto', willChange: 'width, height' }}>
                {image3Src && <img src={image3Src} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />}
              </div>
            </div>
          )}
          {inC && (
            <div style={{ position: 'absolute', bottom: `${btm_px}px`, left: `${c3_left}px`, width: `${c3_W}vw`, height: `${c3_H}vh`, borderRadius: c3_R, zIndex: 22, overflow: 'hidden', background: '#140505', willChange: 'width, height, left' }}>
              {image3Src && <img src={image3Src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} loading="lazy" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CenteredCardAnimation(props: Partial<CardAnimationProps>) {
  // ✦ Always start as false so server & client HTML match, then correct in useEffect
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(globalThis.window.innerWidth < 768);
    check();
    globalThis.window.addEventListener('resize', check);
    return () => globalThis.window.removeEventListener('resize', check);
  }, []);

  const allProps: CardAnimationProps = {
    heading:         props.heading         ?? 'Your Journey to Better Health Starts Here',
    leftText:        props.leftText        ?? 'Veesha Wellness Experience',
    rightText:       props.rightText       ?? "",
    bodyText:        props.bodyText        ?? "Established in 2007 under the visionary leadership of Managing partner Dr.Hari Shankaara Nayak,VWPL pharma has emerged as a leading pharmaceutical conglomerate. With a strong focus on innovation, quality, and customer satisfaction, we have set new benchmarks in the industry as a trusted manufacturer, exporter, and government tenderers and Four mfg units with EUGMP and PIC's certificate",
    bodyText2:       props.bodyText2       ?? "At vlpl pharma, we envision Global Pharmaceutical Leadership through innovation, creativity, and an unwavering commitment to enhancing patient lives. Our focus on science and medicine dudevelop superior, differentiated products that address patient requirements.",
    bodyText3:       props.bodyText3       ?? "Our vision is to deliver compassionate, high-quality medical care through trusted expertise and advanced healthcare solutions. We are committed to providing safe, reliable, and patient-centered healthcare that contributes to a healthier tomorrow. By integrating modern medical technology with a human touch, we aim to support individuals at every stage of life. We strive to be a trusted partner in every healthcare journey, upholding excellence, integrity, and personalized care, while ensuring accessible and quality healthcare for all.",
    ctaText:         props.ctaText         ?? 'About Us',
    ctaText2:        props.ctaText2        ?? 'Mission',
    ctaText3:        props.ctaText3        ?? 'Vision',
    imageSrc:        props.imageSrc        ?? '/about.webp',
    image2Src:       props.image2Src       ?? '/mission.webp',
    image3Src:       props.image3Src       ?? '/vision.webp',
    backgroundColor: props.backgroundColor ?? '#f8f8f8',
  };

  return isMobile
    ? <MobileCardAnimation {...allProps} />
    : <DesktopCardAnimation {...allProps} />;
}

interface SideTextProps {
  opacity: number;
  slide: number;
  body: string;
  cta: string;
  left: string | number;
  bottom: string | number;
}

const SideText = ({ opacity, slide, body, cta, left, bottom }: SideTextProps) => (
  <div
    style={{
      position: 'absolute',
      left,
      bottom,
      transform: `translateY(calc(50% + ${slide}px))`,
      width: '25vw',
      zIndex: 25,
      opacity,
      willChange: 'opacity, transform',
      pointerEvents: 'none',
    }}
  >
    <p
      style={{
        margin: '0 0 1rem 0',
        fontFamily: 'var(--font-sans), serif',
        fontSize: 'clamp(0.85rem, 1.05vw, 1.05rem)',
        fontWeight: 400,
        color: '#140505',
        lineHeight: 1.55,
      }}
    >
      {body}
    </p>
    <button
      style={{
        all: 'unset',
        fontFamily: 'var(--font-display), serif',
        fontSize: '1.25rem',
        fontWeight: 800,
        color: '#140505',
        borderBottom: '2px solid #140505',
        paddingBottom: '2px',
        cursor: 'pointer',
      }}
    >
      {cta}
    </button>
  </div>
);