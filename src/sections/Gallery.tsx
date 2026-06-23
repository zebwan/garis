import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: './images/barbershop-hero.jpg', alt: 'Shop interior', span: 'col-span-2 row-span-2' },
  { src: './images/fade-detail.jpg', alt: 'Precision fade', span: 'col-span-1 row-span-1' },
  { src: './images/shave-service.jpg', alt: 'Hot towel shave', span: 'col-span-1 row-span-1' },
  { src: './images/barber-tools.jpg', alt: 'Barber tools', span: 'col-span-1 row-span-2' },
  { src: './images/beard-sculpting.jpg', alt: 'Beard sculpting', span: 'col-span-1 row-span-1' },
  { src: './images/waiting-area.jpg', alt: 'Waiting area', span: 'col-span-2 row-span-1' },
  { src: './images/shoplot-exterior.jpg', alt: 'Shop exterior', span: 'col-span-2 row-span-1' },
  { src: './images/hot-towel.jpg', alt: 'Hot towel treatment', span: 'col-span-1 row-span-1' },
  { src: './images/classic-fade.jpg', alt: 'Classic fade', span: 'col-span-1 row-span-1' },
  { src: './images/hair-styling.jpg', alt: 'Hair styling', span: 'col-span-1 row-span-1' },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;
    if (!section || !header || !grid) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header.querySelectorAll('.gallery-header-reveal'),
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

      // Parallax effect for each image
      const items = grid.querySelectorAll('.gallery-item');
      items.forEach((item, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        gsap.fromTo(
          item,
          { y: 60 * direction, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative w-full bg-charcoal py-24 md:py-32 lg:py-40"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="copper-line" />
            <p
              className="gallery-header-reveal font-body text-xs tracking-[0.12em] uppercase text-copper-bright"
              style={{ opacity: 0 }}
            >
              Inside GARIS
            </p>
            <div className="copper-line" />
          </div>
          <h2
            className="gallery-header-reveal font-display text-4xl md:text-5xl lg:text-[3.5rem] font-semibold leading-[1.05] tracking-[-0.02em] text-white mb-6"
            style={{ opacity: 0 }}
          >
            The Shop
          </h2>
          <p
            className="gallery-header-reveal font-body text-base md:text-lg text-warm-muted max-w-2xl mx-auto"
            style={{ opacity: 0 }}
          >
            Take a look around. Warm lighting, comfortable chairs, and a vibe that makes 
            you want to stay a little longer.
          </p>
        </div>

        {/* Masonry Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]"
        >
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`gallery-item ${image.span} relative overflow-hidden group cursor-pointer`}
              style={{ opacity: 0 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-display text-sm text-white tracking-wider uppercase border border-white/40 px-4 py-2">
                  {image.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
