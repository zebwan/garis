import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Armchair, Users, CalendarCheck, Banknote, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    title: 'Easy WhatsApp Booking',
    description: 'No need to download another app. Just message us on WhatsApp to book your slot. We reply fast.',
    icon: MessageCircle,
  },
  {
    title: 'Clean & Comfortable Space',
    description: 'Our shop is kept spotless. Fresh towels, sanitised tools, and a relaxed vibe.',
    icon: Armchair,
  },
  {
    title: 'Experienced Local Barbers',
    description: 'Our barbers know Malaysian hair textures and styles. From tight fades to traditional scissor cuts.',
    icon: Users,
  },
  {
    title: 'For Every Occasion',
    description: 'Work cuts, wedding grooming, Raya prep, date nights, or just because. We got you.',
    icon: CalendarCheck,
  },
  {
    title: 'Transparent Prices',
    description: 'No hidden charges. The price you see is the price you pay.',
    icon: Banknote,
  },
  {
    title: 'No Rushed Haircuts',
    description: 'We take our time. Every cut gets the attention it deserves. Quality over speed.',
    icon: Clock,
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content.querySelectorAll('.why-reveal'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
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
      className="relative w-full bg-charcoal py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Sticky Header */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="flex items-center gap-4 mb-6">
              <div className="copper-line" />
              <p
                className="why-reveal font-body text-xs tracking-[0.12em] uppercase text-copper-bright"
                style={{ opacity: 0 }}
              >
                Why GARIS
              </p>
            </div>
            <h2
              className="why-reveal font-display text-4xl md:text-5xl lg:text-[3.5rem] font-semibold leading-[1.05] tracking-[-0.02em] text-white mb-6"
              style={{ opacity: 0 }}
            >
              Why Choose
              <br />
              Us?
            </h2>
            <p
              className="why-reveal font-body text-base md:text-lg text-warm-muted max-w-md"
              style={{ opacity: 0 }}
            >
              We are not just another barbershop. We are a place where you can 
              relax, get a great cut, and leave feeling like the best version of yourself.
            </p>
          </div>

          {/* Right: Reasons Grid */}
          <div className="grid sm:grid-cols-2 gap-8">
            {reasons.map((reason) => {
              const IconComponent = reason.icon;
              return (
                <div
                  key={reason.title}
                  className="why-reveal group"
                  style={{ opacity: 0 }}
                >
                  <div className="w-10 h-10 flex items-center justify-center border border-copper-bright/30 text-copper-bright mb-5 group-hover:bg-copper-bright group-hover:text-charcoal transition-all duration-300">
                    <IconComponent size={18} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-lg font-medium text-white mb-2 group-hover:text-copper-bright transition-colors">
                    {reason.title}
                  </h3>
                  <p className="font-body text-sm text-warm-muted leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
