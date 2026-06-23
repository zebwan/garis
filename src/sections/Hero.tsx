import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    const image = imageRef.current;
    if (!content || !image) return;

    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      image,
      { scale: 1.15, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.4, ease: 'power3.out' }
    );

    tl.fromTo(
      content.querySelectorAll('.hero-reveal'),
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.15 },
      0.2
    );

    // Parallax on scroll
    const handleScroll = () => {
      if (!image) return;
      const scrollY = window.scrollY;
      image.style.transform = `translateY(${scrollY * 0.15}px) scale(1)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      tl.kill();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToServices = () => {
    const el = document.querySelector('#services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/60123456789?text=Hi%20GARIS%2C%20I%20want%20to%20book%20an%20appointment', '_blank');
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-charcoal"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img
          src="./images/barbershop-hero.jpg"
          alt="GARIS Barbershop Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/40" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 min-h-screen flex items-center px-6 md:px-12 lg:px-20"
      >
        <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="pt-24 lg:pt-0">
            <p
              className="hero-reveal font-body text-xs md:text-sm tracking-[0.15em] uppercase text-copper-bright mb-6"
              style={{ opacity: 0 }}
            >
              Subang Jaya &bull; Since 2018
            </p>

            <h1
              className="hero-reveal font-display text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-white mb-8"
              style={{ opacity: 0 }}
            >
              Where Precision
              <br />
              Meets Style
            </h1>

            <p
              className="hero-reveal font-body text-base md:text-lg text-warm-muted max-w-md mb-10 leading-relaxed"
              style={{ opacity: 0 }}
            >
              Expert cuts, straight razor shaves, and classic grooming in the heart of SS15.
            </p>

            <div
              className="hero-reveal flex flex-wrap gap-4"
              style={{ opacity: 0 }}
            >
              <button onClick={openWhatsApp} className="btn-primary">
                Book Appointment
              </button>
              <button onClick={scrollToServices} className="btn-outline">
                Our Services
              </button>
            </div>
          </div>

          {/* Right side spacer for image visibility */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-charcoal to-transparent z-10 pointer-events-none" />
    </section>
  );
}
