'use client';

import { ProjectCard } from '@/app/component/ProjectCard';

const projects = [
  {
    id: 'serve',
    title: 'Project SERVE',
    description: 'A barangay infrastructure monitoring system for Barangay II & III Nueva, with an Android app and web administration dashboard.',
    longDescription: 'Project SERVE supports community governance and infrastructure management by bringing project monitoring, resident records, and service requests into one system.',
    imageUrl: '/project_card/project2.jpg',
    cardImageUrl: '/project_card/project-serve-logo.png',
    techStack: ['Kotlin', 'XML', 'Supabase', 'PostgreSQL'],
    figmaUrl: 'https://www.figma.com/design/NEBhHeq7d3dK06aIG6JKti/Project-SERVE--The-Barangay-2-3-Nueva--Dagupan-City-Integrated-Infrastructure-Monitoring-System-APP?node-id=0-1&t=OjhbfnTLH4dpHyX2-1',
    features: ['Android mobile application', 'Web-based administration dashboard', 'Infrastructure and service request monitoring'],
  },
  {
    id: 'shelflife',
    title: 'ShelfLife-AI',
    description: 'An intelligent inventory, expiry, and demand forecasting system for food-service teams, built to help reduce food waste.',
    longDescription: 'ShelfLife AI brings ingredient inventory, batch expiry tracking, usage and waste records, and demand forecasting into one workspace. Its dashboard helps teams spot low stock and at-risk batches, review forecasts, and make informed purchasing decisions. Forecasts and operational recommendations support staff decisions; they do not change inventory automatically.',
    imageUrl: '/project_card/shelflife-ai-logo.png',
    additionalImages: [
      '/project_card/shelflife-login.png',
      '/project_card/shelflife-admin-dashboard.png',
      '/project_card/shelflife-manager-dashboard.png',
      '/project_card/shelflife-team.jpg',
    ],
    githubUrl: 'https://github.com/heizevg08/ShelfLife-AI.git',
    figmaUrl: 'https://www.figma.com/design/wBNCte4BSI2KKKvEnQsrkF/UI-UX?node-id=33-2&t=KirYndBkKt5RZcd7-1',
    techStack: ['React', 'TypeScript', 'Vite', 'Express', 'MongoDB', 'Python', 'Machine Learning'],
    features: ['Ingredient and batch inventory tracking', 'Expiry alerts, stock status, and audit records', 'Usage and waste monitoring', 'Demand forecasting and shortage risk insights', 'Change requests for controlled inventory updates', 'Reports and analytics for food-service operations'],
  },
  {
    id: 'staysavvy',
    title: 'StaySavvy Hotel Tracking System',
    description: 'A centralized web system for hotel reservations, guest and staff records, and feedback tracking.',
    longDescription: 'StaySavvy brings hotel reservation management, guest and staff records, and customer feedback tracking together in one web-based system.',
    imageUrl: '/project_card/staysavvy-logo.png',
    techStack: ['PHP', 'HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
    features: ['Hotel reservation management', 'Guest and staff record management', 'Customer feedback tracking'],
  },
];

export default function ProjectsPage() {
  return (
    <main id="projects" className="mx-auto w-full max-w-6xl space-y-8 px-6 py-12 sm:px-10">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">Projects</h1>
        <p className="max-w-2xl text-neutral-500 dark:text-zinc-400">Projects from my studies and development work.</p>
      </header>
      <div className="grid grid-cols-1 gap-4 sm:gap-5">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  );
}
