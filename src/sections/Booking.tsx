import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Calendar, Scissors, Clock, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    step: '01',
    title: 'Choose Your Service',
    description: 'Pick from our menu — haircut, shave, beard trim, or a full package.',
    icon: Scissors,
  },
  {
    step: '02',
    title: 'Pick a Time',
    description: 'Let us know your preferred date and time. We will check availability.',
    icon: Calendar,
  },
  {
    step: '03',
    title: 'Confirm on WhatsApp',
    description: 'Send us a message and we will confirm your booking within minutes.',
    icon: MessageCircle,
  },
  {
    step: '04',
    title: 'Come In & Relax',
    description: 'Show up, sit back, and let our barbers do their magic.',
    icon: Clock,
  },
];

export default function Booking() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content.querySelectorAll('.booking-reveal'),
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

  const openWhatsApp = () => {
    window.open('https://wa.me/60123456789?text=Hi%20GARIS%2C%20I%20want%20to%20book%20an%20appointment', '_blank');
  };

  return (
    <section
      ref={sectionRef}
      id="booking"
      className="relative w-full bg-copper py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: CTA */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[3px] bg-white/40" />
              <p
                className="booking-reveal font-body text-xs tracking-[0.12em] uppercase text-white/80"
                style={{ opacity: 0 }}
              >
                Book Now
              </p>
            </div>
            <h2
              className="booking-reveal font-display text-4xl md:text-5xl lg:text-[3.5rem] font-semibold leading-[1.05] tracking-[-0.02em] text-white mb-6"
              style={{ opacity: 0 }}
            >
              Ready for a
              <br />
              Fresh Cut?
            </h2>
            <p
              className="booking-reveal font-body text-base md:text-lg text-white/80 max-w-md mb-10"
              style={{ opacity: 0 }}
            >
              Booking is easy. Just send us a WhatsApp message and we will get you sorted. 
              Walk-ins are welcome too, but booking ahead guarantees your slot.
            </p>

            <div className="booking-reveal flex flex-wrap gap-4" style={{ opacity: 0 }}>
              <button
                onClick={openWhatsApp}
                className="inline-flex items-center gap-3 px-8 py-4 bg-charcoal text-white font-display font-medium text-sm tracking-wider uppercase hover:bg-charcoal/80 transition-colors"
              >
                <MessageCircle size={18} />
                Book on WhatsApp
              </button>
            </div>

            <div className="booking-reveal mt-8 flex items-center gap-2 text-white/70" style={{ opacity: 0 }}>
              <Check size={16} />
              <span className="font-body text-sm">Walk-ins accepted when slots are available</span>
            </div>
          </div>

          {/* Right: Steps */}
          <div className="space-y-6">
            {steps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.step}
                  className="booking-reveal flex gap-5 p-6 bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors"
                  style={{ opacity: 0 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white/10 text-white">
                    <IconComponent size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="font-display text-xs text-white/50 tracking-wider uppercase mb-1">
                      Step {step.step}
                    </div>
                    <h3 className="font-display text-lg font-medium text-white mb-1">
                      {step.title}
                    </h3>
                    <p className="font-body text-sm text-white/70">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
