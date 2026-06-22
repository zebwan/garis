import { useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Preloader from './components/Preloader';
import Navigation from './components/Navigation';
import Marquee from './components/Marquee';

import Hero from './sections/Hero';
import Philosophy from './sections/Philosophy';
import Services from './sections/Services';
import WhyChooseUs from './sections/WhyChooseUs';
import Team from './sections/Team';
import Gallery from './sections/Gallery';
import Booking from './sections/Booking';
import Testimonials from './sections/Testimonials';
import Location from './sections/Location';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  useEffect(() => {
    if (!preloaderDone) return;

    // Refresh ScrollTrigger after preloader is done
    ScrollTrigger.refresh();

    // Setup smooth-ish scroll behavior
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        ScrollTrigger.update();
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Section background color transitions
    const sections = document.querySelectorAll('[data-bg]');
    sections.forEach((section) => {
      const bg = section.getAttribute('data-bg');
      if (bg) {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          onEnter: () => {
            gsap.to(document.body, {
              backgroundColor: bg,
              duration: 0.6,
              ease: 'power2.inOut',
            });
          },
          onEnterBack: () => {
            gsap.to(document.body, {
              backgroundColor: bg,
              duration: 0.6,
              ease: 'power2.inOut',
            });
          },
        });
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [preloaderDone]);

  return (
    <div className="relative">
      <Preloader onComplete={handlePreloaderComplete} />

      {preloaderDone && (
        <>
          <Navigation />

          <main>
            <div data-bg="#2b2825">
              <Hero />
            </div>

            <Marquee />

            <div data-bg="#f5efe6">
              <Philosophy />
            </div>

            <div data-bg="#3d3632">
              <Services />
            </div>

            <div data-bg="#2b2825">
              <WhyChooseUs />
            </div>

            <div data-bg="#3d3632">
              <Team />
            </div>

            <div data-bg="#2b2825">
              <Gallery />
            </div>

            <div data-bg="#8b6239">
              <Booking />
            </div>

            <div data-bg="#2b2825">
              <Testimonials />
            </div>

            <div data-bg="#3d3632">
              <Location />
            </div>
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
