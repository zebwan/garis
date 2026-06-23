import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const barbers = [
  {
    name: 'Amir Hakim',
    role: 'Senior Barber',
    speciality: 'Fades, Hair Tattoos',
    description: '10 years of experience. Amir is the go-to guy for precision fades and creative hair tattoos. His steady hands and eye for detail make every cut a masterpiece.',
    image: './images/barber-team-1.jpg',
  },
  {
    name: 'Jason Tan',
    role: 'Classic Cut Specialist',
    speciality: 'Scissor Cuts, Styling',
    description: 'Jason specialises in classic scissor cuts and modern styling. Whether you want a textured crop or a slick side-part, he will nail the look.',
    image: './images/barber-team-2.jpg',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Beard & Shave Expert',
    speciality: 'Beard Shaping, Hot Towel Shaves',
    description: 'Raj is our beard guru. From full beard sculpting to clean straight razor shaves, he makes facial hair look effortless.',
    image: './images/barber-team-3.jpg',
  },
  {
    name: 'Firdaus Lee',
    role: 'All-Rounder',
    speciality: 'Kids Cuts, Groom Packages',
    description: 'Firdaus is great with kids and adults alike. Patient, friendly, and skilled — he is the perfect choice for family visits.',
    image: './images/barber-team-4.jpg',
  },
];

export default function Team() {
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
        header.querySelectorAll('.team-header-reveal'),
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
        cards.querySelectorAll('.team-card'),
        { y: 60, opacity: 0 },
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
      id="team"
      className="relative w-full bg-espresso py-24 md:py-32 lg:py-40"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="copper-line" />
            <p
              className="team-header-reveal font-body text-xs tracking-[0.12em] uppercase text-copper-bright"
              style={{ opacity: 0 }}
            >
              The Crew
            </p>
            <div className="copper-line" />
          </div>
          <h2
            className="team-header-reveal font-display text-4xl md:text-5xl lg:text-[3.5rem] font-semibold leading-[1.05] tracking-[-0.02em] text-white mb-6"
            style={{ opacity: 0 }}
          >
            Meet Our Barbers
          </h2>
          <p
            className="team-header-reveal font-body text-base md:text-lg text-warm-muted max-w-2xl mx-auto"
            style={{ opacity: 0 }}
          >
            Skilled, friendly, and passionate about their craft. Each barber brings their own style 
            and expertise to the chair.
          </p>
        </div>

        {/* Team Cards */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {barbers.map((barber) => (
            <div
              key={barber.name}
              className="team-card group"
              style={{ opacity: 0 }}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden mb-6">
                <img
                  src={barber.image}
                  alt={barber.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="font-body text-sm text-white/90">{barber.description}</p>
                </div>
              </div>

              {/* Info */}
              <h3 className="font-display text-xl font-medium text-white mb-1 group-hover:text-copper-bright transition-colors">
                {barber.name}
              </h3>
              <p className="font-body text-sm text-copper-bright mb-2">{barber.role}</p>
              <p className="font-body text-xs text-warm-muted uppercase tracking-wider">
                {barber.speciality}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
