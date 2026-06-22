import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Ahmad Faris',
    role: 'Marketing Executive',
    image: '/images/testimonial-1.jpg',
    quote: 'Fade kemas gila. Barber tak rushing, dia ambil masa betul-betul. Will definitely come back.',
    rating: 5,
  },
  {
    name: 'David Lim',
    role: 'Accountant',
    image: '/images/testimonial-2.jpg',
    quote: 'Senang book through WhatsApp. Reply cepat and confirm slot within minutes. Very professional.',
    rating: 5,
  },
  {
    name: 'Karthik Raja',
    role: 'Software Engineer',
    image: '/images/testimonial-3.jpg',
    quote: 'Nice place, clean, comfortable. The hot towel shave was relaxing. Good for a work haircut or before an event.',
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;
    if (!section || !header || !cards) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header.querySelectorAll('.testimonial-header-reveal'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        cards.querySelectorAll('.testimonial-card'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
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
      className="relative w-full bg-charcoal py-24 md:py-32 lg:py-40"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="copper-line" />
            <p
              className="testimonial-header-reveal font-body text-xs tracking-[0.12em] uppercase text-copper-bright"
              style={{ opacity: 0 }}
            >
              Testimonials
            </p>
            <div className="copper-line" />
          </div>
          <h2
            className="testimonial-header-reveal font-display text-4xl md:text-5xl lg:text-[3.5rem] font-semibold leading-[1.05] tracking-[-0.02em] text-white mb-6"
            style={{ opacity: 0 }}
          >
            What Our Clients Say
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="testimonial-card bg-espresso/50 p-8 relative"
              style={{ opacity: 0 }}
            >
              {/* Quote Icon */}
              <Quote
                size={32}
                className="text-copper-bright/20 mb-4"
                strokeWidth={1}
              />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-copper-bright text-copper-bright"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="font-body text-base text-cream leading-relaxed mb-8 italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-subtle">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-display text-sm font-medium text-white">
                    {testimonial.name}
                  </p>
                  <p className="font-body text-xs text-warm-muted">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
