'use client';

import React, { useState } from 'react';
import PixelSidebar from '@/app/component/Pixelslidebar';
import Stack from '@/app/component/Stack';

export default function StackPage() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    return (
        <div className="flex w-full min-h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 font-sans transition-colors duration-300">
        {/* Sidebar */}
        <aside 
            className={`sticky top-0 z-50 h-screen shrink-0 transition-all duration-300 ease-in-out ${
            isCollapsed ? 'w-16' : 'w-64'
            }`}
        >
            <PixelSidebar 
            isCollapsed={isCollapsed} 
            setIsCollapsed={setIsCollapsed} 
            />
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden transition-all duration-300"> 
            <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
            <Stack />
            </main>
        </div>
        </div>
    );
}