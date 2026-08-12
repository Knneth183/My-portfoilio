'use client';

import React, { useState } from 'react';
import Hero from "./component/Hero";
import TechStack from "./component/TechStack";
import { ProjectCard } from "./component/ProjectCard";
import PixelSidebar from './component/Pixelslidebar';

const PROJECTS_DATA = [
  {
    id: '1',
    title: 'Project 1 under construction',
    imageUrl: '/project_card/image3.jpg',
    description: 'Under construction',
    techStack: ['stack1', 'stack2', 'stack3'],
  },
  {
    id: '2',
    title: 'Project SERVE Infrastructure Monitoring System Android App',
    description: 'Created a complete visual language and dynamic design system for Nova, a Next.js fintech platform. Focused on high-contrast UI assets, custom micro-illustrations, and dark-mode design components to build brand trust and modern appeal',
    imageUrl: '/project_card/project2.jpg',
    techStack: ['Figma', 'XML', 'KOTLIN'],
    liveUrl: "#",
    figmaUrl: "https://www.figma.com/design/NEBhHeq7d3dK06aIG6JKti/Project-SERVE--The-Barangay-2-3-Nueva--Dagupan-City-Integrated-Infrastructure-Monitoring-System-APP?node-id=0-1&t=OjhbfnTLH4dpHyX2-1",
    githubUrl: "#",
  },
  {
    id: '3',
    title: 'Project 3 under construction',
    imageUrl: '/project_card/image 4.jpg',
    description: 'Under construction',
    techStack: ['stack1', 'stack2', 'stack3'],
  },
  {
    id: '4',
    title: 'Project 4 under construction',
    imageUrl: '/project_card/image6.jpg',
    description: 'Under construction',
    techStack: ['stack1', 'stack2', 'stack3'],
  },
  {
    id: '5',
    title: 'Project 5 under construction',
    imageUrl: '/project_card/image5.jpg',
    description: 'Under construction',
    techStack: ['stack1', 'stack2', 'stack3'],
  }
];

export default function Home() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="flex w-full min-h-screen bg-white text-gray-900 font-sans">
      
      {/* Sidebar */}
      <aside 
        className={`sticky top-0 z-50 h-screen shrink-0 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <PixelSidebar 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed} 
        />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden transition-all duration-300"> 
        <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-5 flex-1">
          <Hero />
          
          <section className="space-y-3 py-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Featured Projects</h2>
            
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

          <TechStack />
        </main>
        
        
      </div>
    </div>
  );
}