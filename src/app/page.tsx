'use client';

import Link from 'next/link';
import Hero from "./component/Hero";
import TechStack from "./component/TechStack";
import '@radix-ui/themes/styles.css';
import LayoutWorkGallery from './component/LayoutWorkGallery';
import GitHubActivity from './component/GitHubActivity';
import FeaturedProjects from './component/FeaturedProjects';
import HomeCertificates from './component/HomeCertificates';

const technologies = [
  "Python",
  "JavaScript",
  "React",
  "PHP",
  "Kotlin",
  "TypeScript",
  "Tailwind CSS",
];

export default function Home() {
  return (
    <main className="max-w-6xl w-full mx-auto px-6 sm:px-10 md:px-16 lg:px-20 space-y-5 flex-1 py-8">
          <Hero />
          
          {/* Header Row */}
          <div className="flex items-center justify-between text-xs tracking-widest uppercase font-mono">
            <span className="text-neutral-400 dark:text-zinc-500 font-medium">01 — stack</span>
            <Link href="/stack" 
              className="hover:text-neutral-900 dark:hover:text-white dark:text-zinc-400 transition-colors flex items-center gap-1"
            >
              VIEW ALL <span className="text-sm">→</span>
            </Link>
          </div>

          {/* Tech Badges Container */}
          <div className="flex flex-wrap gap-2.5 font-mono">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-3.5 py-1.5 rounded-lg border border-neutral-200 dark:border-zinc-800 text-sm text-neutral-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:border-neutral-400 dark:hover:border-zinc-700 transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}

            <Link href="/stack" className="inline-flex items-center px-3.5 py-1.5 rounded-lg border border-dashed border-neutral-300 dark:border-zinc-700 text-sm text-neutral-600 dark:text-zinc-400 bg-transparent hover:border-neutral-500 dark:hover:border-zinc-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
              + more
            </Link>
          </div>

          <FeaturedProjects />

          <HomeCertificates />
          
          <LayoutWorkGallery />

          <TechStack />

          <GitHubActivity />

          
    </main>
  );
}
