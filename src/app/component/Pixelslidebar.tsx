'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { ArrowRight, Award, BookOpen, Briefcase, ChevronLeft, ChevronRight, Home, Laptop, Layers, Moon, Sun, Users } from 'lucide-react';
import ViewerPresence from './ViewerPresence';

interface PixelSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const groups = [
  [{ label: 'Education', href: '/education', Icon: BookOpen }, { label: 'Home', href: '/', Icon: Home }],
  [{ label: 'Projects', href: '/projects', Icon: Users }, { label: 'Certification', href: '/certificate', Icon: Briefcase }],
  [{ label: 'Experience', href: '/experience', Icon: Award }, { label: 'Stack', href: '/stack', Icon: Layers }],
];

export default function PixelSidebar({ isCollapsed, onToggleCollapse }: PixelSidebarProps) {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  useEffect(() => { setMounted(true); }, []);
  const isDark = resolvedTheme === 'dark';

  return (
    <div className={`flex h-full w-full flex-col border-r border-neutral-200 bg-white font-mono text-sm text-neutral-700 transition-colors dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 ${isCollapsed ? 'items-center p-1.5' : 'px-7 py-6'}`}>
      <div className={`${isCollapsed ? 'w-full' : 'flex min-h-0 flex-1 flex-col'}`}>
        <div className={`flex min-h-7 items-center ${isCollapsed ? 'justify-center' : 'px-1'}`}>
          {!isCollapsed && <h1 className="truncate text-lg font-normal tracking-wide text-neutral-950 dark:text-white"><Link href="/">Kenneth Lim</Link></h1>}
        </div>
        <nav aria-label="Portfolio navigation" className={`mt-5 overflow-y-auto overscroll-contain ${isCollapsed ? 'space-y-3' : 'max-h-[min(62vh,34rem)] space-y-3 pr-1 [scrollbar-color:#c4c4c4_#f4f4f5] [scrollbar-width:thin]'}`}>
          {groups.map((group, index) => <div key={index} className={`space-y-0 ${index ? 'border-t border-neutral-100 pt-2.5 dark:border-zinc-800' : ''}`}>
            {group.map(({ label, href, Icon }) => {
              const active = pathname === href;
              return <Link key={href} href={href} title={label} aria-current={active ? 'page' : undefined} className={`flex items-center gap-2.5 rounded-md px-1 py-1 transition-colors ${active ? 'text-neutral-950 dark:text-white' : 'text-neutral-600 hover:text-neutral-950 dark:text-zinc-400 dark:hover:text-white'} ${isCollapsed ? 'justify-center' : ''}`}>
                {active && !isCollapsed && <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />}
                <Icon className="h-3.5 w-3.5 shrink-0" />{!isCollapsed && <span className="truncate">{label}</span>}
              </Link>;
            })}
          </div>)}
        </nav>
        <div className={`mt-auto ${isCollapsed ? 'pt-3' : 'pt-5'}`}>
          <ViewerPresence isCollapsed={isCollapsed} />
        </div>
      </div>
      <div className={`mt-auto border-t border-neutral-200 pt-4 dark:border-zinc-800 ${isCollapsed ? 'w-full' : ''}`}>
        <div className={`flex items-center ${isCollapsed ? 'flex-col gap-2' : 'justify-between gap-2'}`}>
          {!isCollapsed && <div className="inline-flex items-center gap-0.5 rounded-full border border-neutral-200 p-1 dark:border-zinc-700" aria-label="Color theme">
            <button type="button" onClick={() => setTheme('system')} className={`rounded-full p-2 transition-colors ${mounted && theme === 'system' ? 'bg-neutral-100 text-neutral-950 dark:bg-zinc-800 dark:text-white' : 'text-neutral-400 hover:text-neutral-800 dark:hover:text-zinc-200'}`} aria-label="System theme" title="System theme"><Laptop className="h-4 w-4" /></button>
            <button type="button" onClick={() => setTheme('light')} className={`rounded-full p-2 transition-colors ${mounted && resolvedTheme === 'light' ? 'bg-neutral-100 text-neutral-950 dark:bg-zinc-800 dark:text-white' : 'text-neutral-400 hover:text-neutral-800 dark:hover:text-zinc-200'}`} aria-label="Light theme" title="Light theme"><Sun className="h-4 w-4" /></button>
            <button type="button" onClick={() => setTheme('dark')} className={`rounded-full p-2 transition-colors ${mounted && isDark ? 'bg-neutral-100 text-neutral-950 dark:bg-zinc-800 dark:text-white' : 'text-neutral-400 hover:text-neutral-800 dark:hover:text-zinc-200'}`} aria-label="Dark theme" title="Dark theme"><Moon className="h-4 w-4" /></button>
          </div>}
          <button type="button" onClick={onToggleCollapse} className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white" aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
        {!isCollapsed && <p className="mt-3 px-1 text-[11px] leading-4 text-neutral-400 dark:text-zinc-500">Portfolio · Cybersecurity &amp; development</p>}
      </div>
    </div>
  );
}
