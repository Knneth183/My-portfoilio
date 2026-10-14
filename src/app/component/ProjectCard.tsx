    'use client';

    import React, { useRef, useState, useEffect } from 'react';
    import Image from 'next/image';
    import { FiExternalLink, FiGithub, FiX, FiGlobe, FiFigma, FiCheckCircle } from 'react-icons/fi';
    //import { Avatar, Box, Card, Flex, Text } from '@radix-ui/themes/dist/cjs/components/index.js';

    export interface ProjectLink {
    label: string;
    url: string;
    }

    export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    imageUrl: string;
    additionalImages?: string[];
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
    figmaUrl?: string;
    links?: ProjectLink[];
    features?: string[];
    }

    interface ProjectCardProps {
    project: Project;
    intensity?: number;
    hoveredTech: string | null;
    onTechHover: (tech: string | null) => void;
    }

    export const ProjectCard: React.FC<ProjectCardProps> = ({
    project,
    intensity = 0.6,
    hoveredTech,
    onTechHover,
    }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
    const [isOpen, setIsOpen] = useState(false);

    const [activeImage, setActiveImage] = useState<string>(project.imageUrl);

    const galleryImages = [
        project.imageUrl,
        ...(project.additionalImages || []),
    ];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
        };
        if (isOpen) {
        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        }
        return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || intensity === 0) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) / width - 0.5;
        const mouseY = (e.clientY - rect.top) / height - 0.5;
        const maxRotation = 12 * intensity;

        setRotate({
        x: -mouseY * maxRotation,
        y: mouseX * maxRotation,
        });

        setGlare({
        x: ((e.clientX - rect.left) / width) * 100,
        y: ((e.clientY - rect.top) / height) * 100,
        opacity: 0.15 * intensity,
        });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
        setGlare((prev) => ({ ...prev, opacity: 0 }));
    };

    return (
        <>
        {/* 3D CARD COMPONENT */}
        <div
            ref={cardRef}
            onClick={() => setIsOpen(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative w-full cursor-pointer rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-4 transition-all duration-300 ease-out hover:border-cyan-500/50 dark:hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10"
            style={{
            transformStyle: 'preserve-3d',
            transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            }}
        >
            <div
            className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-10"
            style={{
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
                opacity: glare.opacity,
            }}
            />

            <div
            className="relative h-48 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700/60"
            style={{ transform: 'translateZ(20px)' }}
            >
            <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            </div>

            <div className="mt-5 space-y-3" style={{ transform: 'translateZ(30px)' }}>
            <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-zinc-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                <span>{project.title}</span>
                <span className="text-xs font-normal text-gray-400 dark:text-zinc-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors shrink-0">
                Details →
                </span>
            </h3>

            <p className="text-sm text-gray-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-2">
                {project.techStack.map((tech) => {
                const isHighlighted = hoveredTech === tech;
                return (
                    <span
                    key={tech}
                    onMouseEnter={(e) => {
                        e.stopPropagation();
                        onTechHover(tech);
                    }}
                    onMouseLeave={(e) => {
                        e.stopPropagation();
                        onTechHover(null);
                    }}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-200 ${
                        isHighlighted
                        ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/30 scale-105'
                        : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700'
                    }`}
                    >
                    {tech}
                    </span>
                );
                })}
            </div>
            </div>
        </div>

        {/* LIGHT / DARK SCROLLABLE POPUP MODAL */}
        {isOpen && (
            <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md transition-all duration-300"
            onClick={() => setIsOpen(false)}
            >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={`project-title-${project.id}`}
                className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/70 bg-white text-left shadow-[0_32px_100px_-24px_rgba(0,0,0,0.5)] dark:border-zinc-700 dark:bg-zinc-950"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Sticky Header */}
                <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-neutral-200/80 bg-white/90 px-5 py-4 backdrop-blur-xl sm:px-8 sm:py-5 dark:border-zinc-800 dark:bg-zinc-950/90">
                <div className="min-w-0"><p className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-400">Project case study</p><h2 id={`project-title-${project.id}`} className="truncate text-lg font-semibold tracking-tight text-gray-900 sm:text-2xl dark:text-white">
                    {project.title}
                </h2></div>
                <button
                    onClick={() => setIsOpen(false)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-neutral-950 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white"
                    aria-label="Close modal"
                >
                    <FiX className="w-5 h-5" />
                </button>
                </div>

                {/* Scrollable Body Content */}
                <div className="flex-1 space-y-7 overflow-y-auto p-5 sm:space-y-8 sm:p-8">
                {/* Media Gallery Section */}
                <div className="space-y-3">
                    <div className="relative h-[clamp(16rem,48vw,32rem)] w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-950 shadow-inner dark:border-zinc-800">
                    <Image
                        src={activeImage}
                        alt={project.title}
                        fill
                        className="object-contain p-2 transition-all duration-300 sm:p-4"
                        priority
                    />
                    </div>

                    {/* Gallery Thumbnails */}
                    {galleryImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-zinc-800">
                        {galleryImages.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveImage(img)}
                            className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border transition-all ${
                            activeImage === img
                                ? 'border-cyan-500 opacity-100 scale-95 ring-2 ring-cyan-500/20'
                                : 'border-gray-200 dark:border-zinc-700 opacity-60 hover:opacity-100'
                            }`}
                        >
                            <Image
                            src={img}
                            alt={`${project.title} thumbnail ${idx + 1}`}
                            fill
                            className="object-cover"
                            />
                        </button>
                        ))}
                    </div>
                    )}
                </div>

                {/* Action Buttons Bar */}
                <div className="flex flex-wrap items-center gap-2.5">
                    {project.liveUrl && (
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-900/15 transition hover:-translate-y-0.5 hover:bg-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
                    >
                        <FiGlobe className="w-4 h-4" />
                        Visit Website
                    </a>
                    )}

                    {project.figmaUrl && (
                    <a
                        href={project.figmaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-700 transition hover:-translate-y-0.5 hover:border-purple-300 hover:text-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-purple-700 dark:hover:text-purple-300"
                    >
                        <FiFigma className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        Figma Design
                    </a>
                    )}

                    {project.githubUrl && (
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-700 transition hover:-translate-y-0.5 hover:border-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                    >
                        <FiGithub className="w-4 h-4" />
                        Repository
                    </a>
                    )}
                </div>

                {/* Information Grid Layout */}
                <div className="grid grid-cols-1 gap-5 border-t border-neutral-200 pt-6 md:grid-cols-3 dark:border-zinc-800">
                    {/* Main Content (2 Columns) */}
                    <div className="space-y-6 rounded-2xl border border-neutral-200 p-5 sm:p-6 md:col-span-2 dark:border-zinc-800">
                    <div>
                        <h3 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400 dark:text-zinc-500">
                        Overview
                        </h3>
                        <p className="text-sm leading-7 text-neutral-600 sm:text-base dark:text-zinc-300">
                        {project.longDescription || project.description}
                        </p>
                    </div>

                    {project.features && project.features.length > 0 && (
                        <div>
                        <h3 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400 dark:text-zinc-500">
                            Key Features
                        </h3>
                        <ul className="space-y-2">
                            {project.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-sm leading-6 text-neutral-600 dark:text-zinc-300">
                                <FiCheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                                <span>{feature}</span>
                            </li>
                            ))}
                        </ul>
                        </div>
                    )}
                    </div>

                    {/* Sidebar Meta (1 Column) */}
                    <div className="h-fit space-y-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
                    <div>
                        <h3 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400 dark:text-zinc-500">
                        Technologies
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                            <span
                            key={tech}
                            className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200"
                            >
                            {tech}
                            </span>
                        ))}
                        </div>
                    </div>

                    {project.links && project.links.length > 0 && (
                        <div className="pt-4 border-t border-gray-200 dark:border-zinc-700">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-zinc-500 mb-2">
                            Resource Links
                        </h3>
                        <div className="space-y-2">
                            {project.links.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-gray-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5 font-medium"
                            >
                                <FiExternalLink className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                                {link.label}
                            </a>
                            ))}
                        </div>
                        </div>
                    )}
                    </div>
                </div>
                </div>
            </div>
            </div>
        )}
        </>
    );
    };
