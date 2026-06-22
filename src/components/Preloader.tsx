import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const completedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Hard safety timeout: always complete after 4.5s max
    const safetyTimeout = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        if (container) {
          gsap.to(container, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              setVisible(false);
              onComplete();
            },
          });
        }
      }
    }, 4500);

    const tl = gsap.timeline({
      onComplete: () => {
        if (!completedRef.current) {
          completedRef.current = true;
          clearTimeout(safetyTimeout);
          gsap.to(container, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
              setVisible(false);
              onComplete();
            },
          });
        }
      },
    });

    // Animate the letters of GARIS
    const letters = container.querySelectorAll('.preloader-letter');
    const subtitle = container.querySelector('.preloader-subtitle');
    const line = container.querySelector('.preloader-line');

    // Initial states
    gsap.set(letters, { y: 80, opacity: 0, rotateX: -90 });
    gsap.set(subtitle, { y: 20, opacity: 0 });
    gsap.set(line, { scaleX: 0 });

    // Reveal letters with stagger
    tl.to(letters, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
      stagger: 0.08,
    });

    // Reveal line
    tl.to(line, {
      scaleX: 1,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.3');

    // Reveal subtitle
    tl.to(subtitle, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.3');

    // Hold for a moment
    tl.to({}, { duration: 1.2 });

    // Exit: letters scatter up and fade
    tl.to(letters, {
      y: -60,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      stagger: 0.04,
    });

    tl.to(subtitle, {
      y: -30,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
    }, '<');

    tl.to(line, {
      scaleX: 0,
      duration: 0.4,
      ease: 'power2.in',
    }, '<');

    return () => {
      clearTimeout(safetyTimeout);
      tl.kill();
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ backgroundColor: '#2b2825' }}
    >
      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-copper-bright/30" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-copper-bright/30" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-copper-bright/30" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-copper-bright/30" />

      {/* GARIS Letters */}
      <div className="flex items-center gap-1 md:gap-2 mb-6" style={{ perspective: '600px' }}>
        {'GARIS'.split('').map((letter, i) => (
          <span
            key={i}
            className="preloader-letter font-display text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Copper line */}
      <div
        className="preloader-line w-24 md:w-32 h-[2px] bg-copper-bright mb-6 origin-center"
      />

      {/* Subtitle */}
      <p className="preloader-subtitle font-body text-xs md:text-sm tracking-[0.3em] uppercase text-copper-bright">
        Premium Barbering
      </p>

      {/* Loading dots */}
      <div className="absolute bottom-12 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-copper-bright/50"
            style={{
              animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
