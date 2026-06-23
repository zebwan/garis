import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    if (!section || !content || !image) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content.querySelectorAll('.philosophy-reveal'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        image,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-ivory py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text Content */}
          <div ref={contentRef}>
            <p
              className="philosophy-reveal font-body text-xs tracking-[0.12em] uppercase text-copper-bright mb-6"
              style={{ opacity: 0 }}
            >
              Our Craft
            </p>

            <h2
              className="philosophy-reveal font-display text-4xl md:text-5xl lg:text-[3.5rem] font-semibold leading-[1.05] tracking-[-0.02em] text-charcoal mb-10"
              style={{ opacity: 0 }}
            >
              Every Cut Tells
              <br />
              a Story
            </h2>

            <div className="space-y-6 mb-10">
              <p
                className="philosophy-reveal font-body text-base md:text-lg text-charcoal/70 leading-relaxed"
                style={{ opacity: 0 }}
              >
                At GARIS, we believe a good haircut is more than just grooming — it is a statement. 
                Whether you are preparing for a big interview, your wedding day, or just want to 
                look sharp for Friday prayers, we have got you covered.
              </p>

              <p
                className="philosophy-reveal font-body text-base md:text-lg text-charcoal/70 leading-relaxed"
                style={{ opacity: 0 }}
              >
                Our barbers are trained in classic techniques and modern styles. We take the time 
                to understand what you want, and we do not rush the process. Walk in when you are 
                around SS15, or book ahead on WhatsApp to secure your slot.
              </p>

              <p
                className="philosophy-reveal font-body text-base md:text-lg text-charcoal/70 leading-relaxed"
                style={{ opacity: 0 }}
              >
                Clean tools, comfortable chairs, good coffee, and barbers who actually listen. 
                That is the GARIS experience.
              </p>
            </div>

            {/* Pull Quote */}
            <blockquote
              className="philosophy-reveal relative pl-6 border-l-[3px] border-copper-bright"
              style={{ opacity: 0 }}
            >
              <p className="font-display text-xl md:text-2xl font-medium text-charcoal leading-snug italic">
                "A good haircut is the best accessory you can wear."
              </p>
            </blockquote>
          </div>

          {/* Right: Image */}
          <div ref={imageRef} className="relative" style={{ opacity: 0 }}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="./images/barber-at-work.jpg"
                alt="Barber at work"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-copper-bright/30 -z-10" />
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-copper-bright/10 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
