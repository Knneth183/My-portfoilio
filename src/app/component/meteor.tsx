    'use client';

    import React, { useRef } from "react";
    import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
    import { Meteors } from "@/components/ui/meteors";

    interface MeteorCardProps {
    title: string;
    description: string;
    buttonText?: string;
    meteorCount?: number;
    index?: number;
    }

    const MeteorCard = ({
    title,
    description,
    buttonText = "Explore",
    meteorCount = 20,
    index = 0,
    }: MeteorCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(0, { stiffness: 150, damping: 20 });
    const rotateY = useSpring(0, { stiffness: 150, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();

        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const offsetX = e.clientX - rect.left - centerX;
        const offsetY = e.clientY - rect.top - centerY;

        rotateX.set((offsetY / centerY) * -10);
        rotateY.set((offsetX / centerX) * 10);
    };

    const handleMouseLeave = () => {
        rotateX.set(0);
        rotateY.set(0);
    };

    // Cursor spotlight color variables
    const spotlightBg = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(45, 212, 191, 0.12), transparent 80%)`;
    const spotlightBorder = useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, rgba(45, 212, 191, 0.5), transparent 80%)`;

    return (
        <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{ 
            y: -12, 
            scale: 1.02,
            transition: { type: "spring", stiffness: 300, damping: 20 } 
        }}
        style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-xl mx-auto group cursor-pointer perspective-1000"
        >
        {/* Dynamic Cursor Spotlight Border */}
        <motion.div
            className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
            style={{ background: spotlightBorder }}
        />

        {/* Ambient Glow Background - Adaptive Opacity */}
        <motion.div
            animate={{ scale: [0.8, 0.85, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full rounded-full bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-500 blur-3xl opacity-20 dark:opacity-30 transition-all duration-500 group-hover:opacity-60 dark:group-hover:opacity-75 group-hover:blur-2xl"
        />

        {/* Card Body with Light/Dark Support */}
        <div className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-2xl border border-neutral-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/90 backdrop-blur-md px-6 py-8 shadow-lg dark:shadow-xl transition-all duration-500 group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] dark:group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] group-hover:border-teal-400/50 dark:group-hover:border-zinc-700">
            
            {/* Dynamic Interactive Spotlight Highlight */}
            <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ background: spotlightBg }}
            />

            {/* Top Icon Badge */}
            <div 
            style={{ transform: "translateZ(20px)" }}
            className="mb-4 flex h-7 w-7 items-center justify-center rounded-full border border-neutral-300 dark:border-zinc-700 bg-neutral-100 dark:bg-zinc-900 transition-colors duration-300 group-hover:border-teal-500 group-hover:bg-teal-500/10"
            >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-3.5 w-3.5 text-neutral-600 dark:text-zinc-300 transition-transform duration-300 group-hover:rotate-45 group-hover:text-teal-600 dark:group-hover:text-teal-300"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                />
            </svg>
            </div>

            {/* Title */}
            <h3 
            style={{ transform: "translateZ(30px)" }}
            className="relative z-50 mb-3 text-xl font-bold text-neutral-900 dark:text-white transition-colors duration-300 group-hover:text-teal-700 dark:group-hover:text-teal-200"
            >
            {title}
            </h3>

            {/* Description */}
            <p 
            style={{ transform: "translateZ(20px)" }}
            className="relative z-50 mb-6 text-base font-normal text-neutral-600 dark:text-zinc-400 leading-relaxed"
            >
            {description}
            </p>

            {/* Interactive Button */}
            <motion.button
            style={{ transform: "translateZ(25px)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-50 rounded-lg border border-neutral-300 dark:border-zinc-700 bg-neutral-100 dark:bg-zinc-900 px-4 py-1.5 text-sm font-medium text-neutral-800 dark:text-zinc-300 hover:bg-teal-500/10 hover:border-teal-500 hover:text-teal-700 dark:hover:text-white transition-all duration-300 shadow-xs"
            >
            {buttonText}
            </motion.button>

            {/* Meteor Effect Layer */}
            <Meteors number={meteorCount} />
        </div>
        </motion.div>
    );
    };

    export function MeteorsDemo() {
    return (
        <section className="w-full py-12 bg-transparent">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
            <MeteorCard
            index={0}
            title="Meteors because they're cool"
            description="I don't know what to write so I'll just paste something cool here. One more sentence because lorem ipsum is just unacceptable."
            buttonText="Explore"
            meteorCount={20}
            />
            <MeteorCard
            index={1}
            title="Interactive Components"
            description="Aceternity UI components offer modern, motion-rich visual cards tailored for high-impact landing pages and portfolio web apps."
            buttonText="View Details"
            meteorCount={20}
            />
        </div>
        </section>
    );
    }