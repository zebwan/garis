import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scissors, Sparkles, Droplets, Crown, User, Baby, GraduationCap, Palette, Timer } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    name: "Men's Haircut",
    description: 'Classic cut with wash and styling. Suitable for work, events, or just keeping it fresh.',
    price: 'RM35',
    duration: '45 min',
    icon: Scissors,
  },
  {
    name: 'Skin Fade',
    description: 'Clean skin fade with precision blending. Low, mid, or high fade — your choice.',
    price: 'RM40',
    duration: '50 min',
    icon: Sparkles,
  },
  {
    name: 'Classic Scissor Cut',
    description: 'Traditional scissor-over-comb technique for a natural, textured finish.',
    price: 'RM38',
    duration: '45 min',
    icon: Scissors,
  },
  {
    name: 'Beard Trim',
    description: 'Shape and tidy up your beard with straight razor line-up.',
    price: 'RM20',
    duration: '20 min',
    icon: User,
  },
  {
    name: 'Hot Towel Shave',
    description: 'Relaxing hot towel treatment followed by a precision straight razor shave.',
    price: 'RM45',
    duration: '35 min',
    icon: Droplets,
  },
  {
    name: 'Hair Wash',
    description: 'Deep cleansing wash with scalp massage and premium shampoo.',
    price: 'RM15',
    duration: '15 min',
    icon: Droplets,
  },
  {
    name: 'Hair Styling',
    description: 'Professional styling with pomade, clay, or wax. Perfect for events and weddings.',
    price: 'RM25',
    duration: '20 min',
    icon: Crown,
  },
  {
    name: 'Haircut + Beard Combo',
    description: 'Full haircut with beard trim and shape-up. Best value package.',
    price: 'RM50',
    duration: '60 min',
    icon: Scissors,
  },
  {
    name: 'Kids Cut',
    description: 'Gentle and patient service for boys under 12.',
    price: 'RM25',
    duration: '30 min',
    icon: Baby,
  },
  {
    name: 'Student Cut',
    description: 'Discounted rate for students with valid ID. Weekdays only.',
    price: 'RM28',
    duration: '45 min',
    icon: GraduationCap,
  },
  {
    name: 'Groom Package',
    description: 'Full haircut, beard trim, hot towel shave, and styling. The complete experience.',
    price: 'RM80',
    duration: '90 min',
    icon: Crown,
  },
  {
    name: 'Hair Colour / Grey Coverage',
    description: 'Professional hair colouring and grey coverage with premium products.',
    price: 'From RM60',
    duration: '60 min',
    icon: Palette,
  },
];

export default function Services() {
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
        header.querySelectorAll('.service-header-reveal'),
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
        cards.querySelectorAll('.service-card'),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
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
      id="services"
      className="relative w-full bg-espresso py-24 md:py-32 lg:py-40"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div ref={headerRef} className="mb-16 md:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="copper-line" />
            <p
              className="service-header-reveal font-body text-xs tracking-[0.12em] uppercase text-copper-bright"
              style={{ opacity: 0 }}
            >
              What We Do
            </p>
          </div>
          <h2
            className="service-header-reveal font-display text-4xl md:text-5xl lg:text-[3.5rem] font-semibold leading-[1.05] tracking-[-0.02em] text-white mb-6"
            style={{ opacity: 0 }}
          >
            Our Services
          </h2>
          <p
            className="service-header-reveal font-body text-base md:text-lg text-warm-muted max-w-xl"
            style={{ opacity: 0 }}
          >
            From clean fades to hot towel shaves, we have everything you need to look your best.
            All services include a consultation so you get exactly what you want.
          </p>
        </div>

        {/* Service Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.name}
                className="service-card bg-charcoal/40 backdrop-blur-sm p-6 md:p-8 group cursor-default"
                style={{ opacity: 0 }}
              >
                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center border border-copper-bright/30 text-copper-bright mb-6 group-hover:bg-copper-bright group-hover:text-charcoal transition-all duration-300">
                  <IconComponent size={22} strokeWidth={1.5} />
                </div>

                {/* Name */}
                <h3 className="font-display text-xl font-medium text-white mb-2 group-hover:text-copper-bright transition-colors">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="font-body text-sm text-warm-muted leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Price & Duration */}
                <div className="flex items-center justify-between pt-4 border-t border-subtle">
                  <span className="font-display text-lg font-semibold text-copper-bright">
                    {service.price}
                  </span>
                  <span className="font-body text-xs text-warm-muted flex items-center gap-1">
                    <Timer size={12} />
                    {service.duration}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <p className="mt-12 font-body text-sm text-warm-muted/60 text-center">
          Prices are subject to change based on hair length and complexity. Student rates require a valid student ID.
        </p>
      </div>
    </section>
  );
}
