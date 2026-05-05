"use client";

import { useState, useEffect, useRef } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Review {
  id: number;
  name: string;
  rating: number;
  img: string;
  text: string;
  date?: string;
}

interface ArcPoint {
  x: number;
  y: number;
}

interface TextStyles {
  nameSz: number;
  rateSz: number;
  nameCol: string;
  rateCol: string;
}

interface AnimationState {
  angles: number[];
  opacities: number[];
  activeText: number;
}

interface IncomingAvatar {
  reviewIdx: number;
  angle: number;
  opacity: number;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const reviews: Review[] = [
  {
    id: 0,
    name: 'Dr. Rajesh Kumar',
    rating: 4.9,
    img: '/r1.png',
    text: 'Veesha Wellness has been a game-changer for our distribution network. Their commitment to WHO-GMP standards ensures that we provide only the best to our patients across India.',
  },
  {
    id: 1,
    name: 'Priya Sharma',
    rating: 4.9,
    img: '/r2.png',
    text: "As a pharmacist, I've seen many brands, but the efficacy of Veesha's products is outstanding. Their seamless supply chain even in remote areas is truly commendable.",
  },
  {
    id: 2,
    name: 'Amit Patel',
    rating: 4.9,
    img: '/r3.png',
    text: "Partnering with Veesha Wellness helped us scale our export operations. Their professional approach and high-quality pharmaceutical solutions represent the best of Indian innovation.",
  },
];

// ── Arc math ──────────────────────────────────────────────────────────────────

const toRad = (d: number): number => (d * Math.PI) / 180;
const ARC_CX = 0;
const ARC_CY = 210;
const ARC_R  = 210;
const arcPt  = (deg: number): ArcPoint => ({
  x: ARC_CX + ARC_R * Math.cos(toRad(deg)),
  y: ARC_CY + ARC_R * Math.sin(toRad(deg)),
});

const STEP        = 50;
const ENTRY_ANGLE = -100;
const easeInOut   = (t: number): number =>
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

// ── Sub-components ────────────────────────────────────────────────────────────

interface AvatarImageProps {
  img: string;
  name: string;
  size: number;
  isMid: boolean;
}

function AvatarImage({ img, name, size, isMid }: AvatarImageProps): React.JSX.Element {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        flexShrink: 0,
        filter: isMid ? 'none' : 'grayscale(60%) brightness(0.92)',
        background: '#ddd',
      }}
    >
      <img
        src={img}
        alt={name}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  );
}

interface AvatarInfoProps {
  name: string;
  rating: number;
  date?: string;
  styles: TextStyles;
  isMid: boolean;
}

function AvatarInfo({ name, rating, date, styles, isMid }: AvatarInfoProps): React.JSX.Element {
  return (
    <div style={{ whiteSpace: 'nowrap' }}>
      <div
        style={{
          fontSize: `${styles.nameSz}rem`,
          fontWeight: 700,
          color: styles.nameCol,
          marginBottom: 3,
        }}
      >
        {name}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ color: styles.rateCol, fontSize: `${styles.rateSz}rem` }}>★</span>
        <span
          style={{
            fontSize: `${styles.rateSz}rem`,
            fontWeight: isMid ? 600 : 400,
            color: styles.rateCol,
          }}
        >
          {rating} {date}
        </span>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function CustomerReviews(): React.JSX.Element {
  const angRef  = useRef<number[]>([-50, 0, 50]);
  const busyRef = useRef<boolean>(false);

  const [state, setState] = useState<AnimationState>({
    angles: [-50, 0, 50],
    opacities: [1, 1, 1],
    activeText: 1,
  });
  const [incoming, setIncoming] = useState<IncomingAvatar | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const check = (): void => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const DURATION = 700;

    const runAnimation = (curAngles: number[]): void => {
      const exitIdx = curAngles.reduce<number>(
        (bi, a, i) => (a > curAngles[bi] ? i : bi),
        0
      );
      const topIdx = curAngles.reduce<number>(
        (ti, a, i) => (a < curAngles[ti] ? i : ti),
        0
      );
      const startAngles: number[] = [...curAngles];
      const endAngles: number[]   = curAngles.map((a) => a + STEP);
      const startTime: number     = performance.now();

      const animate = (now: number): void => {
        const t = Math.min((now - startTime) / DURATION, 1);
        const e = easeInOut(t);
        const interp: number[] = startAngles.map((s, i) => s + (endAngles[i] - s) * e);

        angRef.current = interp;

        const ops: number[] = [1, 1, 1];
        ops[exitIdx] = 1 - e;

        const inAngle: number = ENTRY_ANGLE + (-50 - ENTRY_ANGLE) * e;

        setState({ angles: [...interp], opacities: [...ops], activeText: topIdx });
        setIncoming({ reviewIdx: exitIdx, angle: inAngle, opacity: e });

        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          const snapped: number[] = interp.map((a, i) => (i === exitIdx ? -50 : a));
          angRef.current = snapped;
          setState({ angles: [...snapped], opacities: [1, 1, 1], activeText: topIdx });
          setIncoming(null);
          busyRef.current = false;
        }
      };

      requestAnimationFrame(animate);
    };

    const tick = (): void => {
      if (busyRef.current) return;
      busyRef.current = true;
      runAnimation([...angRef.current]);
    };

    const id = setInterval(tick, 3000);
    return () => clearInterval(id);
  }, []);

  const { angles, opacities, activeText } = state;

  const MOBILE_SCALE = 0.55;
  const arcScale     = isMobile ? MOBILE_SCALE : 1;
  const SIZE_MID     = isMobile ? 48 : 68;
  const SIZE_SIDE    = isMobile ? 34 : 46;
  const ARC_BOX      = isMobile ? Math.round(420 * MOBILE_SCALE) : 420;

  const sizeForAngle = (angle: number): number => {
    const t = Math.max(0, 1 - Math.abs(angle) / 50);
    return SIZE_SIDE + (SIZE_MID - SIZE_SIDE) * t;
  };

  const fontForAngle = (angle: number, midVal: number, sideVal: number): number => {
    const t = Math.max(0, 1 - Math.abs(angle) / 50);
    return sideVal + (midVal - sideVal) * t;
  };

  const buildTextStyles = (angle: number, isMid: boolean): TextStyles => ({
    nameSz:  fontForAngle(angle, isMobile ? 0.82 : 1.0,  isMobile ? 0.62 : 0.76),
    rateSz:  fontForAngle(angle, isMobile ? 0.68 : 0.78, isMobile ? 0.56 : 0.63),
    nameCol: isMid ? '#140505' : '#aaa',
    rateCol: isMid ? '#386BB4' : '#ccc',
  });

  const renderAvatar = (
    r: Review,
    angle: number,
    opacity: number,
    key: string
  ): React.JSX.Element => {
    const rawPt = arcPt(angle);
    const pt: ArcPoint = { x: rawPt.x * arcScale, y: rawPt.y * arcScale };
    const size  = sizeForAngle(angle);
    const isMid = Math.abs(angle) < 18;
    const textStyles = buildTextStyles(angle, isMid);

    return (
      <div
        key={key}
        style={{
          position: 'absolute',
          left: pt.x - size / 2,
          top:  pt.y - size / 2,
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? 8 : 12,
          zIndex:  isMid ? 3 : 2,
          opacity,
          pointerEvents: 'none',
        }}
      >
        <AvatarImage img={r.img} name={r.name} size={size} isMid={isMid} />
        <AvatarInfo
          name={r.name}
          rating={r.rating}
          date={r.date}
          styles={textStyles}
          isMid={isMid}
        />
      </div>
    );
  };

  const text: string = reviews[activeText].text;

  return (
    <div id="testimonials">
      <div
        style={{
          minHeight:      '100vh',
          width:          '100%',
          background:     '#f8f8f8',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          fontFamily:     'var(--font-sans)',
          position:       'relative',
          overflow:       'hidden',
          padding:        isMobile ? '120px 16px' : '160px 0',
          boxSizing:      'border-box',
        }}
      >
        {/* Half circle decoration */}
        {isMobile ? (
          <div
            style={{
              position:     'absolute',
              left:         '50%',
              bottom:       '-50vw',
              transform:    'translateX(-50%)',
              width:        '140vw',
              height:       '100vw',
              borderRadius: '50%',
              background:   '#386BB4',
              zIndex:       0,
            }}
          />
        ) : (
          <div
            style={{
              position:     'absolute',
              left:         0,
              top:          '50%',
              transform:    'translateY(-50%)',
              width:        '50vh',
              height:       '100vh',
              borderRadius: '0 100vh 100vh 0',
              background:   '#386BB4',
              zIndex:       0,
            }}
          />
        )}

        {/* Card */}
        <div
          style={{
            position:     'relative',
            zIndex:       1,
            background:   '#ffffff',
            borderRadius: isMobile ? 16 : 20,
            width:        isMobile ? '88vw' : '78vw',
            maxWidth:     '1100px',
            minWidth:     isMobile ? 'unset' : '660px',
            padding:      isMobile ? '80px 20px 80px' : '36px 64px 40px 52px',
            boxShadow:    '0 6px 48px rgba(0,0,0,0.07)',
            boxSizing:    'border-box',
          }}
        >
          {/* Heading */}
          <div style={{ marginBottom: isMobile ? 20 : 28 }}>
            <div
              style={{
                width: 36,
                height: 3,
                background: '#386BB4',
                borderRadius: 2,
                marginBottom: 10,
              }}
            />
            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontSize: isMobile ? '1.05rem' : '1.25rem',
                fontWeight: 700,
                color: '#140505',
              }}
            >
              What Client Says
            </h2>
          </div>

          {/* Body */}
          <div
            style={{
              display:       'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems:    isMobile ? 'stretch' : 'center',
              gap:           isMobile ? 20 : 48,
            }}
          >
            {/* Arc */}
            <div
              style={{
                position:   'relative',
                width:      ARC_BOX,
                height:     ARC_BOX,
                flexShrink: 0,
                overflow:   'hidden',
                alignSelf:  isMobile ? 'center' : 'auto',
              }}
            >
              <svg
                width={ARC_BOX}
                height={ARC_BOX}
                viewBox={`0 0 ${ARC_BOX} ${ARC_BOX}`}
                fill="none"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              >
                <path
                  d={`M 0 0 A ${ARC_BOX / 2} ${ARC_BOX / 2} 0 0 1 0 ${ARC_BOX}`}
                  stroke="#386BB444"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>

              {reviews.map((r, i) =>
                renderAvatar(r, angles[i], opacities[i], `main-${r.id}`)
              )}
              {incoming &&
                renderAvatar(
                  reviews[incoming.reviewIdx],
                  incoming.angle,
                  incoming.opacity,
                  `ghost-${incoming.reviewIdx}`
                )}
            </div>

            {/* Quote */}
            <div style={{ flex: 1, paddingTop: 4 }}>
              <p
                key={activeText}
                style={{
                  margin:     0,
                  fontSize:   isMobile ? '0.88rem' : '0.95rem',
                  lineHeight: 1.9,
                  color:      '#555',
                  fontStyle:  'italic',
                  fontFamily: 'var(--font-sans)',
                  animation:  'fadeUpText 0.5s ease',
                }}
              >
                <span
                  style={{
                    float:       'left',
                    fontSize:    isMobile ? '2.4rem' : '3rem',
                    lineHeight:  0.75,
                    fontWeight:  700,
                    fontStyle:   'normal',
                    color:       '#386BB4',
                    marginRight: '4px',
                    marginTop:   '6px',
                    fontFamily:  'var(--font-sans)',
                  }}
                >
                  {text.charAt(0)}
                </span>
                {text.slice(1)}
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeUpText {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
}