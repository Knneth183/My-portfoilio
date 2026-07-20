'use client';

import React from 'react';
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
}

const languages: Language[] = [
  {
    name: 'TypeScript',
    category: 'Frontend Language',
    icon: SiTypescript,
    hoverColor: 'hover:border-blue-500/60 hover:shadow-blue-500/20 hover:text-blue-400',
    iconColor: 'text-[#3178C6]',
  },
  {
    name: 'JavaScript',
    category: 'Backend Language',
    icon: SiJavascript,
    hoverColor: 'hover:border-yellow-500/60 hover:shadow-yellow-500/20 hover:text-yellow-400',
    iconColor: 'text-[#F7DF1E]',
  },
  {
    name: 'Python',
    category: 'Scripting',
    icon: SiPython,
    hoverColor: 'hover:border-emerald-500/60 hover:shadow-emerald-500/20 hover:text-emerald-400',
    iconColor: 'text-[#3776AB]',
  },
  {
    name: 'HTML5 & CSS3',
    category: 'Markup & Style',
    icon: SiHtml5,
    hoverColor: 'hover:border-orange-500/60 hover:shadow-orange-500/20 hover:text-orange-400',
    iconColor: 'text-[#E34F26]',
  },
  {
    name: 'SQL',
    category: 'Database',
    icon: SiPostgresql,
    hoverColor: 'hover:border-purple-500/60 hover:shadow-purple-500/20 hover:text-purple-400',
    iconColor: 'text-[#4169E1]',
  },
];

export default function TechStack() {
  const marqueeItems = [...languages, ...languages];

  return (
    <section id="skills" className="py-12 scroll-mt-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-10">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Languages & <span className="text-sky-400">Technologies</span>
        </h2>
        <p className="mt-2 text-slate-400 text-base max-w-xl">
          Core languages and technologies I work with daily.
        </p>
      </div>

      {/* Continuous Moving Carousel Track */}
      <div className="relative w-full flex overflow-x-hidden group mask-linear-fade">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        {/* Moving Container (Pauses when you hover over any card) */}
        <div className="flex gap-6 animate-marquee group-hover:[animation-play-state:paused]">
          {marqueeItems.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div
                key={`${tech.name}-${index}`}
                className={`min-w-70 sm:min-w-75 max-w-[320px] bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl shrink-0 group/card cursor-pointer ${tech.hoverColor}`}
              >
                {/* Header Icon */}
                <div className="mb-4">
                  <span className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center group-hover/card:scale-110 transition-transform">
                    <Icon className={`w-6 h-6 ${tech.iconColor}`} />
                  </span>
                </div>

                {/* Title & Category */}
                <h3 className="text-xl font-bold text-white group-hover/card:text-inherit transition-colors">
                  {tech.name}
                </h3>
                <p className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-wider">
                  {tech.category}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}