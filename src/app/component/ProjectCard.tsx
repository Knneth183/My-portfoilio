    'use client';

    import React, { useRef, useState, useEffect } from 'react';
    import Image from 'next/image';
    import { FiExternalLink, FiGithub, FiX, FiGlobe, FiFigma, FiCheckCircle } from 'react-icons/fi';

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
        setActiveImage(project.imageUrl);
    }, [project.imageUrl]);

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
            className="group relative w-full cursor-pointer rounded-2xl bg-white border border-gray-200 p-4 transition-all duration-300 ease-out hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10"
            style={{
            transformStyle: 'preserve-3d',
            transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            }}
        >
            <div
            className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-10"
            style={{
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(0,0,0,0.06) 0%, transparent 60%)`,
                opacity: glare.opacity,
            }}
            />

            <div
            className="relative h-48 w-full overflow-hidden rounded-xl bg-gray-100 border border-gray-200"
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
            <h3 className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-cyan-600 transition-colors flex items-center justify-between">
                <span>{project.title}</span>
                <span className="text-xs font-normal text-gray-400 group-hover:text-cyan-600 transition-colors shrink-0">
                Details →
                </span>
            </h3>

            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
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
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                    }`}
                    >
                    {tech}
                    </span>
                );
                })}
            </div>
            </div>
        </div>

        {/* LIGHT SCROLLABLE POPUP MODAL */}
        {isOpen && (
            <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-md transition-all duration-300"
            onClick={() => setIsOpen(false)}
            >
            <div
                className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-white border border-gray-200 shadow-2xl overflow-hidden text-left"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Sticky Header */}
                <div className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-100 bg-white/90 px-6 py-4 backdrop-blur-md">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight truncate pr-4">
                    {project.title}
                </h2>
                <button
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-colors shrink-0"
                    aria-label="Close modal"
                >
                    <FiX className="w-5 h-5" />
                </button>
                </div>

                {/* Scrollable Body Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {/* Media Gallery Section */}
                <div className="space-y-3">
                    <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden rounded-xl bg-gray-50 border border-gray-200">
                    <Image
                        src={activeImage}
                        alt={project.title}
                        fill
                        className="object-cover transition-all duration-300"
                        priority
                    />
                    </div>

                    {/* Gallery Thumbnails */}
                    {galleryImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-200">
                        {galleryImages.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveImage(img)}
                            className={`relative w-20 h-14 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                            activeImage === img
                                ? 'border-cyan-500 opacity-100 scale-95 ring-2 ring-cyan-500/20'
                                : 'border-gray-200 opacity-60 hover:opacity-100'
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
                <div className="flex flex-wrap items-center gap-3 pt-2">
                    {project.liveUrl && (
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-sm shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-95"
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
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium text-sm transition-all border border-gray-200 hover:border-purple-400 hover:text-purple-700"
                    >
                        <FiFigma className="w-4 h-4 text-purple-600" />
                        Figma Design
                    </a>
                    )}

                    {project.githubUrl && (
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium text-sm transition-all border border-gray-200"
                    >
                        <FiGithub className="w-4 h-4" />
                        Repository
                    </a>
                    )}
                </div>

                {/* Information Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
                    {/* Main Content (2 Columns) */}
                    <div className="md:col-span-2 space-y-6">
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                        Overview
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                        {project.longDescription || project.description}
                        </p>
                    </div>

                    {project.features && project.features.length > 0 && (
                        <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                            Key Features
                        </h3>
                        <ul className="space-y-2">
                            {project.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700">
                                <FiCheckCircle className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                                <span>{feature}</span>
                            </li>
                            ))}
                        </ul>
                        </div>
                    )}
                    </div>

                    {/* Sidebar Meta (1 Column) */}
                    <div className="space-y-6 bg-gray-50 p-4 rounded-xl border border-gray-200/80 h-fit">
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                        Technologies
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                            <span
                            key={tech}
                            className="rounded-md bg-white border border-gray-200 px-2.5 py-1 text-xs font-medium text-cyan-700 shadow-sm"
                            >
                            {tech}
                            </span>
                        ))}
                        </div>
                    </div>

                    {project.links && project.links.length > 0 && (
                        <div className="pt-4 border-t border-gray-200">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                            Resource Links
                        </h3>
                        <div className="space-y-2">
                            {project.links.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-gray-600 hover:text-cyan-600 transition-colors flex items-center gap-1.5 font-medium"
                            >
                                <FiExternalLink className="w-3.5 h-3.5 text-cyan-600" />
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