'use client';

import { useState } from 'react';
import PixelSidebar from './Pixelslidebar';

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="flex min-h-screen bg-white text-gray-900 dark:bg-zinc-950 dark:text-zinc-100">
      <aside className={`sticky top-0 z-50 h-screen shrink-0 transition-[width] duration-300 ${isCollapsed ? 'w-12' : 'w-[280px]'}`}>
        <PixelSidebar isCollapsed={isCollapsed} onToggleCollapse={() => setIsCollapsed(value => !value)} />
      </aside>
      <div className="min-w-0 flex-1 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
