'use client';

import { useState } from 'react';
import { ProjectCard } from '@/app/component/ProjectCard';

const projects = [
  { id: 'serve', title: 'Project SERVE', description: 'A barangay infrastructure monitoring system for Barangay II & III Nueva, with an Android app and web administration dashboard.', longDescription: 'Project SERVE supports community governance and infrastructure management by bringing project monitoring, resident records, and service requests into one system.', imageUrl: '/project_card/project2.jpg', techStack: ['Kotlin', 'XML', 'Supabase', 'PostgreSQL'], figmaUrl: 'https://www.figma.com/design/NEBhHeq7d3dK06aIG6JKti/Project-SERVE--The-Barangay-2-3-Nueva--Dagupan-City-Integrated-Infrastructure-Monitoring-System-APP?node-id=0-1&t=OjhbfnTLH4dpHyX2-1', features: ['Android mobile application', 'Web-based administration dashboard', 'Infrastructure and service request monitoring'] },
  { id: 'shelflife', title: 'ShelfLife-AI', description: 'An AI-powered inventory and expiration tracking system designed to reduce perishable goods waste.', longDescription: 'Combines a web administration dashboard with inventory intelligence for expiration alerts, restocking, and near-expiry pricing recommendations.', imageUrl: '/project_card/image5.jpg', techStack: ['TypeScript', 'Node.js', 'Express', 'React', 'MongoDB', 'LLM integration'], features: ['Expiration alerts and audit logging', 'Restocking and waste prediction', 'Near-expiry discount recommendations'] },
  { id: 'staysavvy', title: 'StaySavvy Hotel Tracking System', description: 'A centralized web system for hotel reservations, guest and staff records, and feedback tracking.', imageUrl: '/project_card/image3.jpg', techStack: ['PHP', 'HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'MySQL', 'XAMPP'] },
  { id: 'fureverpets', title: 'FurEverPets Shop', description: 'An e-commerce website concept for pet products, adoption information, and helpful pet care content.', imageUrl: '/project_card/image2.jpg', techStack: ['HTML', 'CSS'] },
  { id: 'finwise', title: 'FinWise Financial Advising App', description: 'A Python application concept for approachable financial guidance and personal finance management.', imageUrl: '/project_card/image1.jpg', techStack: ['Python'] },
];

export default function ProjectsPage() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  return <main id="projects" className="mx-auto w-full max-w-6xl space-y-8 px-6 py-12 sm:px-10"><header className="space-y-3"><p className="font-mono text-sm uppercase tracking-widest text-neutral-400">Selected work</p><h1 className="text-4xl font-semibold tracking-tight">Projects</h1><p className="max-w-2xl text-neutral-500 dark:text-zinc-400">Projects from my studies and development work.</p></header><div className="grid grid-cols-1 gap-4 md:grid-cols-2">{projects.map((project) => <ProjectCard key={project.id} project={project} hoveredTech={hoveredTech} onTechHover={setHoveredTech} />)}</div></main>;
}
