    'use client';

    import React, { useState } from 'react';
    import Image from 'next/image';
    import { Box, Card, Inset, Text, Strong } from '@radix-ui/themes';
    import PixelSidebar from '@/app/component/Pixelslidebar';

    export default function CertificatePage() {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <div className="flex w-full min-h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 font-sans transition-colors duration-300">
    

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden transition-all duration-300">
            <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-6">
            <Box maxWidth="240px">
                <Card size="2">
                <Inset clip="padding-box" side="top" pb="current">
                    <Image
                    src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                    alt="Bold typography"
                    width={600}
                    height={140}
                    unoptimized
                    style={{
                        display: 'block',
                        objectFit: 'cover',
                        width: '100%',
                        height: 140,
                        backgroundColor: 'var(--gray-5)',
                    }}
                    />
                </Inset>
                <Text as="p" size="3">
                    <Strong>Typography</Strong> is the art and technique of arranging
                    type to make written language legible, readable and appealing when
                    displayed.
                </Text>
                </Card>
            </Box>
            </main>
        </div>
        </div>
    );
    }