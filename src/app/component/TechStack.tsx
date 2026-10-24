'use client';

import React, { useState, useRef } from 'react';
import { IconType } from 'react-icons';
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiHtml5,
  SiPostgresql,
} from 'react-icons/si';

interface Language {
  name: string;
  category: string;
  icon: IconType;
  hoverColor: string;
  iconColor: string;
  projects: string[];
}

const languages: Language[] = [
  {
    name: 'TypeScript',
    category: 'Frontend Language',
    icon: SiTypescript,
    hoverColor: 'hover:border-blue-500/60 hover:shadow-blue-500/10 hover:text-blue-600 dark:hover:border-blue-400/60',
    iconColor: 'text-[#3178C6]',
    projects: ['ShelfLife-AI'],
  },
  {
    name: 'JavaScript',
    category: 'Programming Language',
    icon: SiJavascript,
    hoverColor: 'hover:border-amber-500/60 hover:shadow-amber-500/10 hover:text-amber-600 dark:hover:border-amber-400/60',
    iconColor: 'text-[#F7DF1E]',
    projects: ['StaySavvy Hotel Tracking System'],
  },
  {
    name: 'Python',
    category: 'Scripting',
    icon: SiPython,
    hoverColor: 'hover:border-emerald-500/60 hover:shadow-emerald-500/10 hover:text-emerald-600 dark:hover:border-emerald-400/60',
    iconColor: 'text-[#3776AB]',
    projects: ['FinWise Financial Advising App'],
  },
  {
    name: 'HTML5 & CSS3',
    category: 'Markup & Style',
    icon: SiHtml5,
    hoverColor: 'hover:border-orange-500/60 hover:shadow-orange-500/10 hover:text-orange-600 dark:hover:border-orange-400/60',
    iconColor: 'text-[#E34F26]',
    projects: ['FurEverPets Shop', 'StaySavvy Hotel Tracking System'],
  },
  {
    name: 'SQL',
    category: 'Database',
    icon: SiPostgresql,
    hoverColor: 'hover:border-purple-500/60 hover:shadow-purple-500/10 hover:text-purple-600 dark:hover:border-purple-400/60',
    iconColor: 'text-[#4169E1]',
    projects: ['StaySavvy Hotel Tracking System', 'Project SERVE'],
  },
];

export default function TechStack() {
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const toggleFlip = (cardId: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (flippedCardId === cardId) {
      setFlippedCardId(null);
    } else {
      setFlippedCardId(cardId);
      timerRef.current = setTimeout(() => {
        setFlippedCardId(null);
      }, 2000);
    }
  };

  const renderTechCard = (tech: Language, isDuplicate = false) => {
    const Icon = tech.icon;
    const cardId = `${tech.name}${isDuplicate ? '-duplicate' : ''}`;
    const isFlipped = flippedCardId === cardId;

    return (
      <div
        key={cardId}
        onClick={() => toggleFlip(cardId)}
        className="w-[180px] sm:w-[200px] h-[136px] shrink-0 cursor-pointer [perspective:1000px] group/card"
      >
        <div
          className={`
            relative w-full h-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d]
            ${isFlipped ? '[transform:rotateY(180deg)]' : ''}
          `}
        >
          {/* FRONT SIDE */}
          <div
            className={`
              absolute inset-0 w-full h-full rounded-2xl p-4 flex flex-col justify-between
              bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800
              group-hover/card:bg-gray-50 dark:group-hover/card:bg-zinc-800/80 group-hover/card:border-gray-300 dark:group-hover/card:border-zinc-700
              group-hover/card:shadow-xl transition-all
              [backface-visibility:hidden] ${tech.hoverColor}
            `}
          >
            <div>
                <div className="mb-2 flex justify-between items-center">
                <span className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 flex items-center justify-center group-hover/card:scale-110 transition-transform">
                  <Icon className={`w-4 h-4 ${tech.iconColor}`} />
                </span>
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-zinc-100">{tech.name}</h3>
              <p className="text-[11px] font-mono text-gray-500 dark:text-zinc-400 mt-0.5 uppercase tracking-wider">
                {tech.category}
              </p>
            </div>
          </div>

          {/* BACK SIDE */}
          <div
            className="absolute inset-0 w-full h-full rounded-2xl p-4 flex flex-col justify-between bg-gray-900 dark:bg-zinc-950 border border-sky-500/50 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] text-left"
          >
            <div>
              <div className="flex items-center justify-between border-b border-gray-800 dark:border-zinc-800 pb-2 mb-2">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  {tech.name} Projects
                </span>
              </div>
              <ul className="space-y-1.5">
                {tech.projects.map((proj, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-gray-300 dark:text-zinc-300 flex items-center gap-1.5 line-clamp-1"
                  >
                    <span className="w-1 h-1 rounded-full bg-sky-400 shrink-0" />
                    {proj}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className="relative py-9 scroll-mt-20 overflow-hidden bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 mb-7">
          <p className="mb-2 text-center font-mono text-xs uppercase tracking-widest text-neutral-400 dark:text-zinc-500">06 — languages &amp; frameworks</p>
        </div>

        <div className="relative w-full flex overflow-hidden group py-6">
          {/* Track 1 */}
          <div className="flex gap-5 pr-5 shrink-0 items-center animate-marquee group-hover:[animation-play-state:paused]">
            {languages.map((tech) => renderTechCard(tech))}
          </div>

          {/* Track 2 */}
          <div
            aria-hidden="true"
            className="flex gap-5 pr-5 shrink-0 items-center animate-marquee group-hover:[animation-play-state:paused]"
          >
            {languages.map((tech) => renderTechCard(tech, true))}
          </div>
        </div>
      </div>
    </section>
  );
}
