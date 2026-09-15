    'use client';

    import React, { useEffect, useState } from 'react';
    import {
    BookOpen,
    Home,
    Users,
    Briefcase,
    ChevronLeft,
    ChevronRight,
    Folder,
    Award,
    Layers,
    Sun,
    Moon,
    } from 'lucide-react';
    import Link from 'next/link';
    import { useTheme } from 'next-themes'; 

    interface PixelSidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
    }

    export default function PixelSidebar({ isCollapsed, setIsCollapsed }: PixelSidebarProps) {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const isDark = resolvedTheme === 'dark';
    return (
        <div
        className={`w-full h-full bg-white dark:bg-zinc-950 border-r border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-zinc-200 flex flex-col justify-between font-mono text-xs select-none overflow-x-hidden transition-colors duration-300 ${
            isCollapsed ? 'p-3' : 'p-5'
        }`}
        >
        {/* Top Navigation Content */}
        <div className="space-y-6">
            {/* Sidebar Header & Toggle */}
            <div className="flex items-center justify-between min-h-8">
            {!isCollapsed && (
                <h1 className="text-base font-bold tracking-wider text-black dark:text-white truncate">
                <Link href="/">Kenneth Lim</Link>
                </h1>
            )}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors mx-auto"
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
                href="#education"
                className="flex items-center gap-3 text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-800/60 p-1.5 rounded-md transition-colors"
                title="Resources"
            >
                <BookOpen className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span className="truncate">Education</span>}
            </a>

            <Link
            href="/"
            className="flex items-center gap-3 text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-800/60 p-1.5 rounded-md transition-colors"
            title="Home"
            >
            <Home className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span className="truncate">Home</span>}
            </Link>
            </nav>

            {/* Secondary Group */}
            <div className="pt-2 border-t border-gray-100 dark:border-zinc-800/80 space-y-2.5">
            <a
                href="#projects"
                className="flex items-center gap-3 text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-800/60 p-1.5 rounded-md transition-colors"
                title="Projects"
            >
                <Users className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span className="truncate">Projects</span>}
            </a>

            <a
                href="/certificate"
                className="flex items-center gap-3 text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-800/60 p-1.5 rounded-md transition-colors"
                title="Certification"
            >
                <Briefcase className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span className="truncate">Certification</span>}
            </a>
            </div>

            {/* Sections */}
            <div className="pt-2 border-t border-gray-100 dark:border-zinc-800/80 space-y-2.5">
            <a
                href="#projects"
                className="flex items-center gap-3 text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-800/60 p-1.5 rounded-md transition-colors"
                title="Projects"
            >
                <Folder className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span className="truncate">Scripts</span>}
            </a>

            <a
                href="#experience"
                className="flex items-center gap-3 text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-800/60 p-1.5 rounded-md transition-colors"
                title="Experience"
            >
                <Award className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span className="truncate">Experience</span>}
            </a>

            <a
                href="/stack"
                className="flex items-center gap-3 text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-800/60 p-1.5 rounded-md transition-colors"
                title="Stack"
            >
                <Layers className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span className="truncate">Stack</span>}
            </a>
            </div>
        </div>

        {/* Dark / Light Mode Toggle */}
        <div className="pt-4 mt-auto border-t border-gray-100 dark:border-zinc-800/80">
        <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="w-full flex items-center gap-3 text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800/60 p-1.5 rounded-md transition-colors"
            title={
            mounted
                ? isDark
                ? 'Switch to Light Mode'
                : 'Switch to Dark Mode'
                : 'Toggle Theme'
            }
            aria-label="Toggle Theme"
            suppressHydrationWarning
        >
            {mounted ? (
            isDark ? (
                <Sun className="w-4 h-4 shrink-0 text-amber-400" />
            ) : (
                <Moon className="w-4 h-4 shrink-0 text-slate-700 dark:text-zinc-300" />
            )
            ) : (
            <Moon className="w-4 h-4 shrink-0 opacity-50" />
            )}

            {!isCollapsed && (
            <span className="truncate">
                {mounted ? (isDark ? 'Light Mode' : 'Dark Mode') : 'Theme'}
            </span>
            )}
                </button>
        </div>
    </div>
    );
    }