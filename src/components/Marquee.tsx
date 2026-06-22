export default function Marquee() {
  const items = [
    'Clean Fades',
    'Hot Towel Shaves',
    'Beard Trims',
    'Classic Cuts',
    'Hair Styling',
    'Groom Packages',
    'Walk-ins Welcome',
    'WhatsApp Booking',
  ];

  return (
    <div className="w-full bg-charcoal py-6 overflow-hidden border-y border-subtle">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <span
            key={index}
            className="font-display text-sm md:text-base tracking-[0.15em] uppercase text-warm-muted/40 mx-8 flex-shrink-0"
          >
            {item}
            <span className="mx-8 text-copper-bright/30">&bull;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
