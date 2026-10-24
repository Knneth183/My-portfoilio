    'use client';

    import React, { useRef, useState, useEffect } from 'react';
    import Image from 'next/image';
    import { FiExternalLink, FiGithub, FiX, FiGlobe, FiFigma, FiCheckCircle, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
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
    cardImageUrl?: string;
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
    compact?: boolean;
    }

    export const ProjectCard: React.FC<ProjectCardProps> = ({
    project,
    intensity = 0.6,
    compact = false,
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
    const activeImageIndex = galleryImages.indexOf(activeImage);

    const showImage = (index: number) => {
        const nextIndex = (index + galleryImages.length) % galleryImages.length;
        setActiveImage(galleryImages[nextIndex]);
    };

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
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setIsOpen(true);
                }
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            role="button"
            tabIndex={0}
            aria-haspopup="dialog"
            aria-label={`View details for ${project.title}`}
            className="group relative grid w-full cursor-pointer grid-cols-[6rem_minmax(0,1fr)] gap-x-4 overflow-hidden rounded-3xl border border-neutral-200 bg-white p-4 shadow-[0_16px_48px_-36px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-cyan-500/40 hover:shadow-[0_24px_60px_-36px_rgba(8,145,178,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-cyan-500/50 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-x-6 sm:p-6"
            style={{
            transformStyle: 'preserve-3d',
            transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            }}
        >
            <div
            className="pointer-events-none absolute inset-0 z-10 rounded-3xl transition-opacity duration-300"
            style={{
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
                opacity: glare.opacity,
            }}
            />

            <div
            className={`relative aspect-square ${compact ? 'w-20' : 'w-24 sm:w-28'} self-start overflow-hidden rounded-2xl border border-neutral-200 ${project.id === 'shelflife' || project.id === 'staysavvy' || project.id === 'serve' ? 'bg-white' : 'bg-gray-100 dark:bg-zinc-800'} shadow-sm dark:border-zinc-700`}
            style={{ transform: 'translateZ(20px)' }}
            >
            <Image
                src={project.cardImageUrl ?? project.imageUrl}
                alt={project.title}
                fill
                sizes={compact ? '80px' : '(max-width: 640px) 96px, 112px'}
                className={project.id === 'shelflife' || project.id === 'staysavvy' || project.id === 'serve' ? 'object-contain p-1' : 'object-cover transition-transform duration-500 group-hover:scale-105'}
            />
            </div>

            <div className="flex min-w-0 flex-col justify-center gap-2 sm:gap-3" style={{ transform: 'translateZ(30px)' }}>
            <h3 className={`${compact ? 'text-lg' : 'text-xl sm:text-2xl'} font-semibold leading-snug tracking-tight text-gray-900 transition-colors group-hover:text-cyan-700 dark:text-zinc-100 dark:group-hover:text-cyan-300`}>
                <span className="line-clamp-2">{project.title}</span>
                <span className="hidden">
                Details →
                </span>
            </h3>

            <p className={`${compact ? 'text-[13px]' : 'text-sm'} line-clamp-2 leading-relaxed text-gray-600 dark:text-zinc-400`}>
                {project.description}
            </p>
            <div className="mt-1 flex items-center justify-end border-t border-neutral-200 pt-3 dark:border-zinc-800">
                <span className="ml-auto inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500 transition-colors group-hover:text-cyan-700 dark:text-zinc-400 dark:group-hover:text-cyan-300">View details <FiExternalLink aria-hidden="true" className="h-3.5 w-3.5" /></span>
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
                    <div className={`relative h-[clamp(16rem,48vw,32rem)] w-full overflow-hidden rounded-2xl border border-neutral-200 ${project.id === 'shelflife' ? 'bg-white' : 'bg-neutral-950 dark:border-zinc-800'} shadow-inner`}>
                    <Image
                        src={activeImage}
                        alt={project.title}
                        fill
                        className="object-contain p-2 transition-all duration-300 sm:p-4"
                        priority
                    />
                    {galleryImages.length > 1 && <>
                        <button
                        type="button"
                        onClick={() => showImage(activeImageIndex - 1)}
                        aria-label="Show previous project image"
                        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-neutral-200 bg-white/90 p-2 text-neutral-800 shadow transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                        >
                            <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <button
                        type="button"
                        onClick={() => showImage(activeImageIndex + 1)}
                        aria-label="Show next project image"
                        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-neutral-200 bg-white/90 p-2 text-neutral-800 shadow transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                        >
                            <FiChevronRight className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <span className="absolute bottom-3 right-3 rounded-full bg-neutral-950/70 px-2.5 py-1 font-mono text-xs text-white" aria-live="polite">
                            {activeImageIndex + 1} / {galleryImages.length}
                        </span>
                    </>}
                    </div>

                    {/* Gallery Thumbnails */}
                    {galleryImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-zinc-800">
                        {galleryImages.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => showImage(idx)}
                            aria-label={`Show project image ${idx + 1}`}
                            aria-current={activeImage === img ? 'true' : undefined}
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
