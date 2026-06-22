import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Car, Phone, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const hours = [
  { day: 'Tuesday — Friday', time: '10:00 AM — 9:00 PM' },
  { day: 'Saturday', time: '10:00 AM — 8:00 PM' },
  { day: 'Sunday', time: '11:00 AM — 6:00 PM' },
  { day: 'Monday', time: 'Closed' },
];

export default function Location() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content.querySelectorAll('.location-reveal'),
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

  const openMaps = () => {
    window.open('https://maps.google.com/?q=Jalan+SS15/4D+Subang+Jaya', '_blank');
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-espresso py-24 md:py-32 lg:py-40"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Address & Map */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="copper-line" />
              <p
                className="location-reveal font-body text-xs tracking-[0.12em] uppercase text-copper-bright"
                style={{ opacity: 0 }}
              >
                Find Us
              </p>
            </div>
            <h2
              className="location-reveal font-display text-4xl md:text-5xl lg:text-[3.5rem] font-semibold leading-[1.05] tracking-[-0.02em] text-white mb-10"
              style={{ opacity: 0 }}
            >
              Visit Us in
              <br />
              SS15
            </h2>

            {/* Address Card */}
            <div
              className="location-reveal bg-charcoal/50 p-8 mb-8"
              style={{ opacity: 0 }}
            >
              <div className="flex items-start gap-4 mb-6">
                <MapPin size={22} className="text-copper-bright flex-shrink-0 mt-1" />
                <div>
                  <p className="font-display text-lg text-white mb-1">GARIS Barber</p>
                  <p className="font-body text-sm text-warm-muted leading-relaxed">
                    No. 23, Jalan SS15/4D,<br />
                    47500 Subang Jaya,<br />
                    Selangor
                  </p>
                </div>
              </div>

              <button
                onClick={openMaps}
                className="w-full py-3 border border-copper-bright/30 text-copper-bright font-display text-sm tracking-wider uppercase hover:bg-copper-bright hover:text-charcoal transition-all duration-300"
              >
                Open in Google Maps
              </button>
            </div>

            {/* Parking Note */}
            <div
              className="location-reveal flex items-center gap-3 text-warm-muted"
              style={{ opacity: 0 }}
            >
              <Car size={18} className="text-copper-bright" />
              <span className="font-body text-sm">
                Street parking and SS15 courtyard parking available nearby.
              </span>
            </div>

            {/* Phone */}
            <div
              className="location-reveal flex items-center gap-3 text-warm-muted mt-4"
              style={{ opacity: 0 }}
            >
              <Phone size={18} className="text-copper-bright" />
              <span className="font-body text-sm">+60 12-345 6789</span>
            </div>
          </div>

          {/* Right: Hours & CTA */}
          <div>
            <h3
              className="location-reveal font-display text-2xl font-medium text-white mb-8"
              style={{ opacity: 0 }}
            >
              Opening Hours
            </h3>

            <div className="space-y-0 mb-10">
              {hours.map((item, index) => (
                <div
                  key={item.day}
                  className={`location-reveal flex justify-between items-center py-4 ${
                    index < hours.length - 1 ? 'border-b border-subtle' : ''
                  }`}
                  style={{ opacity: 0 }}
                >
                  <span className="font-body text-sm text-white">{item.day}</span>
                  <span
                    className={`font-body text-sm ${
                      item.time === 'Closed' ? 'text-red-400' : 'text-copper-bright'
                    }`}
                  >
                    {item.time}
                  </span>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div
              className="location-reveal bg-copper-bright/10 border border-copper-bright/30 p-8"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle size={22} className="text-copper-bright" />
                <h4 className="font-display text-lg font-medium text-white">
                  Book via WhatsApp
                </h4>
              </div>
              <p className="font-body text-sm text-warm-muted mb-6">
                The easiest way to book. Just drop us a message with your preferred 
                service and time. We typically reply within 10 minutes during operating hours.
              </p>
              <button
                onClick={openWhatsApp}
                className="w-full btn-primary justify-center"
              >
                <MessageCircle size={18} className="mr-2" />
                Message Us on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
