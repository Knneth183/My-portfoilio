    interface TechCategory {
    title: string;
    items: string[];
    }

    const techStackData: TechCategory[] = [
    {
        title: 'FRONTEND',
        items: [
        'JavaScript',
        'TypeScript',
        'React',
        'Next.js',
        'Python',
        'Tailwind CSS',
        ],
    },
    {
        title: 'BACKEND',
        items: [
        'Node.js',
        'Python',
        'Java',
        'PHP',
        'PostgreSQL',
        'MySQL',
        ],
    },
    ];

    export default function TechStack() {
    return (
        <section className="w-full max-w-5xl mx-auto px-6 py-12 font-sans antialiased text-neutral-800 dark:text-zinc-200">
        {/* Title Header */}
        <div className="mb-10 space-y-4">
            <h2 className="text-2xl md:text-3xl font-mono font-medium tracking-tight text-neutral-900 dark:text-white">
            tech stack
            </h2>
            <p className="text-neutral-500 dark:text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed">
            The tools, frameworks, and platforms I reach for — across the front end, back end, infrastructure, and AI.
            </p>
        </div>

        {/* Categorized Tech Stack List */}
        <div className="space-y-8">
            {techStackData.map((category) => (
            <div key={category.title} className="space-y-3">
                {/* Category Subtitle */}
                <h3 className="font-mono text-xs font-semibold text-neutral-400 dark:text-zinc-500 tracking-wider uppercase">
                {category.title}
                </h3>

                {/* Badges Container */}
                <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                    <span
                    key={item}
                    className="inline-flex items-center px-3 py-1.5 rounded-md border border-neutral-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 font-mono text-xs text-neutral-700 dark:text-zinc-300 hover:border-neutral-400 dark:hover:border-zinc-600 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-default shadow-sm"
                    >
                    {item}
                    </span>
                ))}
                </div>
            </div>
            ))}
        </div>
        </section>
    );
    }