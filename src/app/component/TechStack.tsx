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
  const renderTechCard = (tech: Language, isDuplicate = false) => {
    const Icon = tech.icon;
    return (
      <div
        key={`${tech.name}${isDuplicate ? '-duplicate' : ''}`}
        /* FIXED SIZE: w-[220px] on mobile, w-[240px] on desktop, p-5 padding */
        className={`
          w-[220px] sm:w-[240px] shrink-0 group/card cursor-pointer
          rounded-2xl p-5 transition-all duration-300 ease-out
          bg-slate-900/80 backdrop-blur-md border border-slate-800/80
          hover:bg-slate-900/95 hover:border-slate-700
          hover:-translate-y-2 hover:shadow-xl
          ring-1 ring-white/5 ${tech.hoverColor}
        `}
      >
        <div className="mb-3">
          <span className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center group-hover/card:scale-110 transition-transform">
            <Icon className={`w-5 h-5 ${tech.iconColor}`} />
          </span>
        </div>
        <h3 className="text-lg font-bold text-white transition-colors">
          {tech.name}
        </h3>
        <p className="text-[11px] font-mono text-slate-400 mt-0.5 uppercase tracking-wider">
          {tech.category}
        </p>
      </div>
    );
  };

  return (
    <section id="skills" className="relative py-12 scroll-mt-20 overflow-hidden">
      {/* Background Video Layer */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/your-video-bg.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 mb-10">
          <h2 className="md:text-center text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Languages & <span className="text-sky-400">Technologies</span>
          </h2>
          <p className="mt-2 text-slate-400 text-base max-w-xl text-left md:text-center md:mx-auto">
            Core languages and technologies I work with daily.
          </p>
        </div>

        {/* Marquee Track Container */}
        <div className="relative w-full flex overflow-hidden group py-6">
          {/* Fade Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none" />

          {/* Track 1 */}
          <div className="flex gap-5 pr-5 shrink-0 animate-marquee group-hover:[animation-play-state:paused] items-center">
            {languages.map((tech) => renderTechCard(tech))}
          </div>

          {/* Track 2 (Duplicate for Seamless Loop) */}
          <div
            aria-hidden="true"
            className="flex gap-5 pr-5 shrink-0 animate-marquee group-hover:[animation-play-state:paused] items-center"
          >
            {languages.map((tech) => renderTechCard(tech, true))}
          </div>
        </div>
      </div>
    </section>
  );
}