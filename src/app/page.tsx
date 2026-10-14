'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Hero from "./component/Hero";
import TechStack from "./component/TechStack";
import { ProjectCard } from "./component/ProjectCard";
import '@radix-ui/themes/styles.css';
import { MeteorsDemo } from './component/meteor';

const technologies = [
  "Python",
  "JavaScript",
  "React",
  "PHP",
  "Kotlin",
  "TypeScript",
  "Tailwind CSS",
];

const PROJECTS_DATA = [
  {
    id: '2',
    title: 'Project SERVE: Barangay Infrastructure Monitoring System',
    description: 'A mobile app and web dashboard for community infrastructure projects, resident records, and service requests.',
    imageUrl: '/project_card/project2.jpg',
    techStack: ['Kotlin', 'XML', 'Supabase'],
    figmaUrl: "https://www.figma.com/design/NEBhHeq7d3dK06aIG6JKti/Project-SERVE--The-Barangay-2-3-Nueva--Dagupan-City-Integrated-Infrastructure-Monitoring-System-APP?node-id=0-1&t=OjhbfnTLH4dpHyX2-1",
    className: 'col-span-1',
  },
  {
    id: '3',
    title: 'ShelfLife-AI',
    imageUrl: '/project_card/image5.jpg',
    description: 'An AI-powered inventory and expiration tracking system with waste prediction and restocking support.',
    techStack: ['TypeScript', 'React', 'Node.js', 'MongoDB'],
    className: 'col-span-1',
  },
];

export default function Home() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  return (
    <main className="max-w-6xl w-full mx-auto px-6 sm:px-10 md:px-16 lg:px-20 space-y-5 flex-1 py-8">
          <Hero />
          
          {/* Header Row */}
          <div className="flex items-center justify-between text-xs tracking-widest uppercase font-mono">
            <span className="text-neutral-400 dark:text-zinc-500 font-medium">STACK</span>
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

          <section className="space-y-3 py-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Featured Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PROJECTS_DATA.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  hoveredTech={hoveredTech}
                  onTechHover={setHoveredTech}
                />
              ))}
            </div>
          </section>
          
          <MeteorsDemo />

          <TechStack />

          
    </main>
  );
}
