'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'ShelfLife-AI',
    image: '/project_card/shelflife-ai-logo.png',
    description: 'Intelligent inventory, expiry tracking, and demand forecasting for food-service teams.',
    categories: ['AI', 'Web app'],
  },
  {
    title: 'Project SERVE',
    image: '/project_card/project-serve-logo.jpg',
    description: 'An Android app and web dashboard for community infrastructure and service requests.',
    categories: ['Android app', 'Web dashboard'],
  },
  {
    title: 'StaySavvy Hotel Tracking System',
    image: '/project_card/staysavvy-logo.png',
    description: 'A web system for hotel reservations, guest and staff records, and feedback.',
    categories: ['Web app'],
  },
];

function ProjectPreview({ project, side = false, onSelect }: { project: (typeof projects)[number]; side?: boolean; onSelect?: () => void }) {
  return (
    <Link
      href="/projects"
      aria-label={`View ${project.title} in projects`}
      onClick={onSelect ? (event) => { event.preventDefault(); onSelect(); } : undefined}
      className={`block rounded-3xl border border-neutral-200 bg-white shadow-xl shadow-neutral-900/10 transition-all duration-300 hover:border-neutral-300 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-500 ${side ? 'h-44 p-4 opacity-70 hover:opacity-100 sm:h-48 sm:p-5' : 'flex min-h-[270px] flex-col p-5 shadow-2xl sm:min-h-[290px] sm:p-6'}`}
    >
      {!side && <div className="mb-5 flex flex-wrap gap-2">
        {project.categories.map((category) => (
          <span key={category} className="rounded-full border border-neutral-200 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-neutral-600 dark:border-zinc-700 dark:text-zinc-300">{category}</span>
        ))}
      </div>}

      <div className="flex items-center gap-4">
        <div className={`${side ? 'h-11 w-11' : 'h-20 w-20 sm:h-24 sm:w-24'} relative shrink-0 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 dark:border-zinc-700 dark:bg-zinc-800`}>
          <Image src={project.image} alt="" fill sizes={side ? '44px' : '(max-width: 640px) 80px, 96px'} className={project.title === 'ShelfLife-AI' || project.title === 'StaySavvy Hotel Tracking System' || project.title === 'Project SERVE' ? 'object-contain p-1' : 'object-cover'} />
        </div>
        <h3 className={`${side ? 'text-base' : 'text-2xl sm:text-3xl'} font-medium leading-snug tracking-tight text-neutral-950 dark:text-zinc-100`}>{project.title}</h3>
      </div>

      <p className={`${side ? 'mt-3 line-clamp-2 text-xs' : 'mt-5 line-clamp-3 text-base sm:text-lg'} leading-relaxed text-neutral-600 dark:text-zinc-300`}>{project.description}</p>

      {!side && <>
        <span className="mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-neutral-200 px-4 py-2.5 pt-2.5 font-mono text-xs uppercase tracking-wider text-neutral-700 transition-colors group-hover:border-neutral-400 group-hover:text-neutral-950 dark:border-zinc-700 dark:text-zinc-200 dark:group-hover:border-zinc-500 dark:group-hover:text-white">View all projects <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></span>
      </>}
    </Link>
  );
}

export default function FeaturedProjects() {
  const [activeIndex, setActiveIndex] = useState(1);
  const pointerStartX = useRef<number | null>(null);
  const dragged = useRef(false);
  const suppressClick = useRef(false);
  const leftIndex = (activeIndex + projects.length - 1) % projects.length;
  const rightIndex = (activeIndex + 1) % projects.length;
  const leftProject = projects[leftIndex];
  const featuredProject = projects[activeIndex];
  const rightProject = projects[rightIndex];

  function handlePointerEnd(endX: number) {
    if (pointerStartX.current === null) return;
    const distance = pointerStartX.current - endX;
    pointerStartX.current = null;
    if (Math.abs(distance) < 40) return;

    suppressClick.current = true;
    window.setTimeout(() => {
      suppressClick.current = false;
      dragged.current = false;
    }, 350);
    setActiveIndex((index) => (index + (distance > 0 ? 1 : projects.length - 1)) % projects.length);
  }

  return (
    <section aria-labelledby="featured-projects-heading" className="space-y-5 py-8">
      <header className="flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest">
        <h2 id="featured-projects-heading" className="text-neutral-400 dark:text-zinc-500">02 — projects</h2>
        <Link href="/projects" className="inline-flex items-center gap-1 text-neutral-500 transition-colors hover:text-neutral-950 dark:text-zinc-400 dark:hover:text-white">All projects <span aria-hidden="true">→</span></Link>
      </header>

      <div
        role="group"
        aria-label="Featured projects carousel"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') setActiveIndex((index) => (index + 1) % projects.length);
          if (event.key === 'ArrowLeft') setActiveIndex((index) => (index + projects.length - 1) % projects.length);
        }}
        onPointerDown={(event) => {
          if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
          pointerStartX.current = event.clientX;
          dragged.current = false;
          if (event.target instanceof HTMLElement) {
            event.target.setPointerCapture(event.pointerId);
          }
        }}
        onPointerMove={(event) => {
          if (pointerStartX.current === null) return;
          if (Math.abs(event.clientX - pointerStartX.current) >= 8) {
            dragged.current = true;
            if (event.pointerType === 'mouse') event.preventDefault();
          }
        }}
        onPointerUp={(event) => {
          handlePointerEnd(event.clientX);
          if (dragged.current) window.setTimeout(() => { dragged.current = false; }, 350);
        }}
        onPointerCancel={() => {
          pointerStartX.current = null;
          dragged.current = false;
        }}
        onClickCapture={(event) => {
          if (dragged.current || suppressClick.current) {
            event.preventDefault();
            event.stopPropagation();
            dragged.current = false;
            suppressClick.current = false;
          }
        }}
        className="relative mx-auto flex h-[320px] max-w-4xl cursor-grab touch-pan-y select-none items-center justify-center rounded-[2rem] outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-cyan-500 sm:h-[350px] lg:h-[370px]"
      >
        <div className="absolute left-0 top-1/2 hidden w-[44%] -translate-y-1/2 -rotate-[8deg] transition-transform duration-500 sm:block">
          <ProjectPreview project={leftProject} side onSelect={() => setActiveIndex(leftIndex)} />
        </div>
        <div className="absolute right-0 top-1/2 hidden w-[44%] -translate-y-1/2 rotate-[8deg] transition-transform duration-500 sm:block">
          <ProjectPreview project={rightProject} side onSelect={() => setActiveIndex(rightIndex)} />
        </div>
        <div key={featuredProject.title} className="relative z-10 w-full max-w-[400px] animate-[featured-card-in_350ms_ease-out] motion-reduce:animate-none sm:w-[76%]">
          <ProjectPreview project={featuredProject} />
        </div>
      </div>
      <div className="flex justify-center gap-2" aria-label="Choose a featured project">
        {projects.map((project, index) => (
          <button
            key={project.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${project.title}`}
            aria-current={activeIndex === index ? 'true' : undefined}
            className={`h-2 rounded-full transition-all ${activeIndex === index ? 'w-6 bg-neutral-700 dark:bg-zinc-200' : 'w-2 bg-neutral-300 hover:bg-neutral-500 dark:bg-zinc-700 dark:hover:bg-zinc-500'}`}
          />
        ))}
      </div>
    </section>
  );
}
