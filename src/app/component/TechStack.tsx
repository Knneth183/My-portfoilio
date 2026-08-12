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
    hoverColor: 'hover:border-blue-500/60 hover:shadow-blue-500/10 hover:text-blue-600',
    iconColor: 'text-[#3178C6]',
    projects: ['Nova Fintech Dashboard', 'Portfolio v2', 'E-Commerce Store'],
  },
  {
    name: 'JavaScript',
    category: 'Backend Language',
    icon: SiJavascript,
    hoverColor: 'hover:border-amber-500/60 hover:shadow-amber-500/10 hover:text-amber-600',
    iconColor: 'text-[#F7DF1E]',
    projects: ['Text1', 'Text2', 'Text3'],
  },
  {
    name: 'Python',
    category: 'Scripting',
    icon: SiPython,
    hoverColor: 'hover:border-emerald-500/60 hover:shadow-emerald-500/10 hover:text-emerald-600',
    iconColor: 'text-[#3776AB]',
    projects: ['Text1', 'Text2', 'Text3'],
  },
  {
    name: 'HTML5 & CSS3',
    category: 'Markup & Style',
    icon: SiHtml5,
    hoverColor: 'hover:border-orange-500/60 hover:shadow-orange-500/10 hover:text-orange-600',
    iconColor: 'text-[#E34F26]',
    projects: ['Text1', 'Text2', 'Text3'],
  },
  {
    name: 'SQL',
    category: 'Database',
    icon: SiPostgresql,
    hoverColor: 'hover:border-purple-500/60 hover:shadow-purple-500/10 hover:text-purple-600',
    iconColor: 'text-[#4169E1]',
    projects: ['Text1', 'Text2', 'Text3'],
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
        className="w-[220px] sm:w-[240px] h-[160px] shrink-0 cursor-pointer [perspective:1000px] group/card"
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
              absolute inset-0 w-full h-full rounded-2xl p-5 flex flex-col justify-between
              bg-white border border-gray-200
              group-hover/card:bg-gray-50 group-hover/card:border-gray-300
              group-hover/card:shadow-xl transition-all
              [backface-visibility:hidden] ${tech.hoverColor}
            `}
          >
            <div>
              <div className="mb-3 flex justify-between items-center">
                <span className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center group-hover/card:scale-110 transition-transform">
                  <Icon className={`w-5 h-5 ${tech.iconColor}`} />
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">{tech.name}</h3>
              <p className="text-[11px] font-mono text-gray-500 mt-0.5 uppercase tracking-wider">
                {tech.category}
              </p>
            </div>
          </div>

          {/* BACK SIDE */}
          <div
            className="absolute inset-0 w-full h-full rounded-2xl p-4 flex flex-col justify-between bg-gray-900 border border-sky-500/50 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] text-left"
          >
            <div>
              <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-2">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  {tech.name} Projects
                </span>
              </div>
              <ul className="space-y-1.5">
                {tech.projects.map((proj, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-gray-300 flex items-center gap-1.5 line-clamp-1"
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
    <section id="skills" className="relative py-12 scroll-mt-20 overflow-hidden bg-white">
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 mb-10">
          <h2 className="md:text-center text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Languages & <span className="text-sky-600">Frameworks</span>
          </h2>
          <p className="mt-2 text-gray-600 text-base max-w-xl text-left md:text-center md:mx-auto">
            Languages and Frameworks I work with
          </p>
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