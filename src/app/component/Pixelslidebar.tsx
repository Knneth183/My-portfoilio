    'use client';

    import React from 'react';
    import {
    BookOpen,
    Users,
    Briefcase,
    ChevronLeft,
    ChevronRight,
    Folder,
    Award,
    Layers,
    } from 'lucide-react';

    interface PixelSidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
    }

    export default function PixelSidebar({ isCollapsed, setIsCollapsed }: PixelSidebarProps) {
    return (
        <div
        className={`w-full h-full bg-white border-r border-gray-200 text-gray-800 flex flex-col justify-between font-mono text-xs select-none overflow-x-hidden transition-all duration-300 ease-in-out ${
            isCollapsed ? 'p-3' : 'p-5'
        }`}
        >
        <div className="space-y-6">
            {/* Sidebar Header & Toggle */}
            <div className="flex items-center justify-between min-h-[32px]">
            {!isCollapsed && (
                <h1 className="text-base font-bold tracking-wider text-black truncate">
                Kenneth Lim
                </h1>
            )}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black transition-colors mx-auto"
                title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
                {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
                ) : (
                <ChevronLeft className="w-4 h-4" />
                )}
            </button>
            </div>

            {/* Navigation Items */}
            <nav className="space-y-2.5">
            <a
                href="#resources"
                className="flex items-center gap-3 text-gray-600 hover:text-black hover:bg-gray-50 p-1.5 rounded-md transition-colors"
                title="Resources"
            >
                <BookOpen className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span className="truncate">Education</span>}
            </a>
            </nav>

            {/* Secondary Group */}
            <div className="pt-2 border-t border-gray-100 space-y-2.5">
            <a
                href="#collabs"
                className="flex items-center gap-3 text-gray-600 hover:text-black hover:bg-gray-50 p-1.5 rounded-md transition-colors"
                title="Collabs"
            >
                <Users className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span className="truncate">Projects</span>}
            </a>

            <a
                href="#consulting"
                className="flex items-center gap-3 text-gray-600 hover:text-black hover:bg-gray-50 p-1.5 rounded-md transition-colors"
                title="Consulting"
            >
                <Briefcase className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span className="truncate">Certification</span>}
            </a>
            </div>

            {/* Sections */}
            <div className="pt-2 border-t border-gray-100 space-y-2.5">
            <a
                href="#projects"
                className="flex items-center gap-3 text-gray-600 hover:text-black hover:bg-gray-50 p-1.5 rounded-md transition-colors"
                title="Projects"
            >
                <Folder className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span className="truncate">Scripts</span>}
            </a>

            <a
                href="#experience"
                className="flex items-center gap-3 text-gray-600 hover:text-black hover:bg-gray-50 p-1.5 rounded-md transition-colors"
                title="Experience"
            >
                <Award className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span className="truncate">Experience</span>}
            </a>

            <a
                href="#stack"
                className="flex items-center gap-3 text-gray-600 hover:text-black hover:bg-gray-50 p-1.5 rounded-md transition-colors"
                title="Stack"
            >
                <Layers className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span className="truncate">Stack</span>}
            </a>
            </div>
        </div>
        </div>
    );
    }