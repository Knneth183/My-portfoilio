'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

const slides = [
  {
    title: 'YumYum Kitchen - 2x6 banner',
    label: 'FOOD BRANDING',
    image: '/freelance/yumyum-tarp.jpg',
    alt: 'Wide YumYum Kitchen food banner featuring menu items and prices',
    tone: 'from-sky-300 via-blue-400 to-indigo-500',
  },
  {
    title: 'YumYum Kitchen - menu board',
    label: 'MENU DESIGN',
    image: '/freelance/yumyum-menu.jpg',
    alt: 'Square YumYum Kitchen menu board with food items and prices',
    tone: 'from-emerald-300 via-teal-400 to-cyan-500',
  },
  {
    title: 'YumYum Kitchen - logo',
    label: 'BRAND IDENTITY',
    image: '/freelance/yumyum-logo.png',
    alt: 'YumYum Kitchen Grill and Fry illustrated logo',
    tone: 'from-amber-200 via-orange-300 to-rose-400',
  },
  {
    title: 'School year infographic',
    label: 'INFOGRAPHIC',
    image: '/freelance/school-infographic.jpg',
    alt: 'Colorful school year infographic with Rio characters and a welcome message',
    tone: 'from-fuchsia-300 via-pink-400 to-rose-500',
  },
  {
    title: 'Mental health awareness poster',
    label: 'POSTER DESIGN',
    image: '/freelance/mental-health-poster.jpg',
    alt: 'Mental health awareness poster with the message Nurture Your Mind, Nourish Your Life',
    tone: 'from-cyan-300 via-blue-400 to-violet-500',
  },
  {
    title: 'The Original Dagupan Boneless Bangus - banner',
    label: 'FOOD BRANDING',
    image: '/freelance/todbb-3x6-banner-blurred.jpg',
    alt: 'The Original Dagupan Boneless Bangus San Fernando branch banner with featured products and menu',
    tone: 'from-amber-100 via-orange-100 to-yellow-200',
  },
  {
    title: 'Feet Walk Fashion Boutique - banner',
    label: 'RETAIL BRANDING',
    image: '/freelance/feet-walk-banner-blurred.jpg',
    alt: 'Feet Walk Fashion Boutique banner with shoe branding and location details',
    tone: 'from-yellow-300 via-yellow-400 to-amber-300',
  },
];

export default function LayoutWorkGallery() {
  const [active, setActive] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const go = useCallback((step: number) => {
    setActive((current) => (current + step + slides.length) % slides.length);
  }, []);

  const current = slides[active];

  const renderArtwork = (slide: (typeof slides)[number]) => (
    <div className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${slide.tone}`}>
      {slide.image ? (
        <Image
          src={slide.image}
          alt={slide.alt}
          fill
          sizes="(max-width: 768px) 90vw, 680px"
          className="bg-white object-contain transition-transform duration-700 group-hover:scale-[1.025]"
          priority={active === slides.indexOf(slide)}
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 border border-white/10" />
    </div>
  );

  return (
    <section className="space-y-5" aria-label="Freelance layout design work">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[.2em] text-neutral-400 dark:text-zinc-500">05 / freelance work</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">Layout design</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-600 dark:text-zinc-400">Selected freelance designs, from food branding and menus to school infographics and awareness posters.</p>
        </div>
      </div>

      <div
        className="relative isolate h-[220px] overflow-hidden sm:h-[260px] lg:h-[290px]"
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label="Freelance layout gallery. Use the arrow keys to change slides."
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') go(-1);
          if (event.key === 'ArrowRight') go(1);
        }}
        onTouchStart={(event) => setTouchStart(event.touches[0]?.clientX ?? null)}
        onTouchEnd={(event) => {
          if (touchStart === null) return;
          const distance = event.changedTouches[0].clientX - touchStart;
          if (Math.abs(distance) > 45) go(distance < 0 ? 1 : -1);
          setTouchStart(null);
        }}
      >
        <div className="absolute bottom-7 left-[8%] right-[8%] h-8 rounded-[50%] bg-neutral-500/10 blur-xl dark:bg-black/25" />

        {[-2, -1, 0, 1, 2].map((position) => {
          const index = (active + position + slides.length) % slides.length;
          const slide = slides[index];
          const selected = position === 0;
          const left = `${50 + position * 17}%`;
          return (
            <button
              key={`${position}-${slide.label}`}
              type="button"
              onClick={() => setActive(index)}
              aria-label={selected ? `Selected: ${slide.title}` : `Show ${slide.title}`}
              aria-current={selected ? 'true' : undefined}
              style={{ left, zIndex: 10 - Math.abs(position), transform: `translate(-50%, -50%) rotate(${position * 4}deg) scale(${selected ? 1.06 : 1})` }}
              className="group absolute top-[45%] block h-[53%] w-[36%] overflow-hidden rounded-lg border border-white/80 shadow-[0_14px_28px_rgba(15,23,42,.16)] transition-all duration-700 ease-[cubic-bezier(.2,.75,.25,1)] dark:border-white/20 sm:h-[58%] sm:w-[29%] sm:rounded-xl"
            >
              {renderArtwork(slide)}
            </button>
          );
        })}

        <button type="button" onClick={() => go(-1)} aria-label="Previous layout" className="absolute left-1 top-1/2 z-30 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-neutral-300/80 bg-white/90 text-neutral-800 shadow-md backdrop-blur transition hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-white dark:hover:bg-zinc-800 sm:left-3 sm:size-11">
          <ArrowLeft size={18} />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next layout" className="absolute right-1 top-1/2 z-30 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-neutral-300/80 bg-white/90 text-neutral-800 shadow-md backdrop-blur transition hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-white dark:hover:bg-zinc-800 sm:right-3 sm:size-11">
          <ArrowRight size={18} />
        </button>

        {current.image && (
          <a href={current.image} target="_blank" rel="noreferrer" aria-label="Open full layout image" className="absolute right-[36%] top-[63%] z-30 grid size-8 place-items-center rounded-full border border-white/70 bg-black/35 text-white backdrop-blur transition hover:bg-black/55">
            <ExternalLink size={14} />
          </a>
        )}

        <div className="absolute bottom-1 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-neutral-200/70 bg-white/75 px-3 py-2 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/70">
          {slides.map((slide, index) => (
            <button key={slide.image} type="button" onClick={() => setActive(index)} aria-label={`Show ${slide.title}`} aria-current={index === active ? 'true' : undefined} className={`h-2.5 rounded-full transition-all ${index === active ? 'w-7 bg-slate-800 dark:bg-white' : 'w-2.5 bg-slate-500/55 hover:bg-slate-700 dark:bg-white/35 dark:hover:bg-white/70'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
