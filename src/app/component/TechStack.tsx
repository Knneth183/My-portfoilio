import React from 'react';

interface Language {
  name: string;
  category: string;
  description: string;
  level: string;
  icon: string; // Hex color code for the glow accent
  accentColor: string;
}

const languages: Language[] = [
  {
    name: 'TypeScript',
    category: 'Language',
    description: 'Typed JavaScript for scalable application architecture.',
    level: 'Advanced',
    icon: 'TS',
    accentColor: 'hover:border-blue-500/50 hover:shadow-blue-500/10',
  },
  {
    name: 'JavaScript',
    category: 'Language',
    description: 'Core web scripting language for interactive interfaces.',
    level: 'Advanced',
    icon: 'JS',
    accentColor: 'hover:border-yellow-500/50 hover:shadow-yellow-500/10',
  },
  {
    name: 'Python',
    category: 'Language / Security',
    description: 'Used for automation scripts, exploit analysis, and tooling.',
    level: 'Intermediate',
    icon: 'PY',
    accentColor: 'hover:border-emerald-500/50 hover:shadow-emerald-500/10',
  },
  {
    name: 'C / C++',
    category: 'Systems / Security',
    description: 'Low-level memory management and security analysis.',
    level: 'Intermediate',
    icon: 'C++',
    accentColor: 'hover:border-sky-500/50 hover:shadow-sky-500/10',
  },
  {
    name: 'HTML5 & CSS3',
    category: 'Markup & Style',
    description: 'Semantic page structure and responsive CSS layouts.',
    level: 'Advanced',
    icon: 'WEB',
    accentColor: 'hover:border-orange-500/50 hover:shadow-orange-500/10',
  },
  {
    name: 'SQL',
    category: 'Database',
    description: 'Relational data querying, indexing, and management.',
    level: 'Intermediate',
    icon: 'SQL',
    accentColor: 'hover:border-purple-500/50 hover:shadow-purple-500/10',
  },
];

export default function TechStack() {
  return (
    <section id="skills" className="py-12 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Languages & <span className="text-sky-400">Core Technologies</span>
          </h2>
          <p className="mt-2 text-slate-400 text-base max-w-xl">
            Key tools, languages, and technical frameworks I utilize for development and security research.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {languages.map((tech) => (
            <div
              key={tech.name}
              className={`bg-slate-900/80 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${tech.accentColor} group flex flex-col justify-between`}
            >
              <div>
                {/* Header Row: Badge & Level */}
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center font-mono text-xs font-bold text-sky-400 group-hover:bg-slate-800/80 transition-colors">
                    {tech.icon}
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
                    {tech.level}
                  </span>
                </div>

                {/* Title & Category */}
                <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors">
                  {tech.name}
                </h3>
                <p className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-wider">
                  {tech.category}
                </p>

                {/* Description */}
                <p className="mt-4 text-slate-400 text-sm leading-relaxed">
                  {tech.description}
                </p>
              </div>

              {/* Decorative Accent Line */}
              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-end">
                <span className="text-xs font-mono text-slate-600 group-hover:text-sky-400/80 transition-colors">
                   Stack Module &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}