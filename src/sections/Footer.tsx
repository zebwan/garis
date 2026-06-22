import { Instagram, MessageCircle, Facebook } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Team', href: '#team' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-charcoal border-t border-subtle">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 items-start">
          {/* Brand */}
          <div>
            <a
              href="#"
              className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white hover:text-copper-bright transition-colors"
            >
              GARIS
            </a>
            <p className="font-body text-sm text-warm-muted mt-4 max-w-xs">
              Clean cuts, local heart. Premium barbering in the heart of SS15 Subang Jaya.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <p className="font-body text-xs tracking-[0.12em] uppercase text-copper-bright mb-2">
              Quick Links
            </p>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-body text-sm text-warm-muted hover:text-white transition-colors w-fit"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social & Contact */}
          <div>
            <p className="font-body text-xs tracking-[0.12em] uppercase text-copper-bright mb-4">
              Connect With Us
            </p>
            <div className="flex gap-4 mb-6">
              <a
                href="https://instagram.com/garisbarber"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-subtle text-warm-muted hover:text-white hover:border-copper-bright transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/60123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-subtle text-warm-muted hover:text-white hover:border-copper-bright transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="https://facebook.com/garisbarber"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-subtle text-warm-muted hover:text-white hover:border-copper-bright transition-all"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
            <button
              onClick={() =>
                window.open(
                  'https://wa.me/60123456789?text=Hi%20GARIS%2C%20I%20want%20to%20book%20an%20appointment',
                  '_blank'
                )
              }
              className="btn-primary text-xs py-3 px-6"
            >
              Book on WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-subtle">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-warm-muted/60">
            &copy; {new Date().getFullYear()} GARIS Barber. All rights reserved.
          </p>
          <p className="font-body text-xs text-warm-muted/60">
            Designed and developed by <span className="text-copper-bright">Shazwan</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
