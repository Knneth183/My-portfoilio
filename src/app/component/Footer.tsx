    'use client';

    import { Terminal, ArrowUpRight } from 'lucide-react';

    export default function TechyFooter() {

    return (
        <footer className="relative w-full bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-sans overflow-hidden transition-colors duration-300">
        {/* Tech Grid Background Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 dark:opacity-25 pointer-events-none" />

        {/* Top Accent Glowing Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-12">
            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Brand & System Status Column */}
            <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center space-x-2">
                <div className="p-2 bg-slate-200 dark:bg-slate-900 border border-cyan-500/30 rounded-lg text-cyan-600 dark:text-cyan-400">
                    <Terminal className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold font-mono text-slate-900 dark:text-white tracking-wider">
                    Ken<span className="text-cyan-600 dark:text-cyan-400">_Devs</span>
                </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
                A Cybersecurity Enthusiast and Full Stack Developer with a passion for building secure and efficient web applications. Always eager to learn and explore new technologies in the ever-evolving world of software development.
                </p>
            </div>

            {/* Column 2: Tech Stack / Ecosystem */}
            <div className="space-y-3 font-mono">
                <h4 className="text-xs text-cyan-600 dark:text-cyan-400 uppercase tracking-widest font-semibold">
                Ecosystem
                </h4>
                <ul className="space-y-2 text-sm">
                {['Next.js', 'Tailwind CSS', 'TypeScript', 'Python'].map((item) => (
                    <li key={item}>
                    <a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors flex items-center gap-1 group">
                        <span className="text-slate-400 dark:text-slate-600 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">&gt;</span>
                        <span>{item}</span>
                    </a>
                    </li>
                ))}
                </ul>
            </div>

            {/* Column 3: Navigation Links */}
            <div className="space-y-3 font-mono">
                <h4 className="text-xs text-cyan-600 dark:text-cyan-400 uppercase tracking-widest font-semibold">
                Navigation
                </h4>
                <ul className="space-y-2 text-sm">
                {[
                    { name: 'Certifications', href: '#projects' },
                    { name: 'Resume', href: '#' },
                    { name: 'Github', href: '#' },
                    { name: 'LinkedIn', href: '#' },
                ].map((link) => (
                    <li key={link.name}>
                    <a href={link.href} className="group hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <span>{link.name}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-600 dark:text-cyan-400" />
                    </a>
                    </li>
                ))}
                </ul>
            </div>

            </div>

        </div>
        </footer>
    );
    }