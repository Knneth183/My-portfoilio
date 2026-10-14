const skills = [
  { category: 'Development', items: ['Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'PHP', 'Kotlin', 'HTML', 'CSS', 'Tailwind CSS'] },
  { category: 'Data & platforms', items: ['MongoDB', 'Supabase', 'PostgreSQL', 'MySQL', 'XAMPP', 'Apache', 'phpMyAdmin'] },
  { category: 'Design & productivity', items: ['Figma', 'Adobe tools', 'Microsoft Office'] },
];

export default function ScriptsPage() {
  return <main className="mx-auto w-full max-w-6xl space-y-8 px-6 py-12 sm:px-10"><header className="space-y-3"><p className="font-mono text-sm uppercase tracking-widest text-neutral-400">Tools &amp; technologies</p><h1 className="text-4xl font-semibold tracking-tight">Scripts &amp; Technical Skills</h1><p className="max-w-2xl text-neutral-500 dark:text-zinc-400">Technical skills from my studies and project work. Standalone script projects weren’t included in my CV.</p></header><div className="space-y-6">{skills.map(group => <section key={group.category} className="rounded-2xl border border-neutral-200 p-6 dark:border-zinc-800"><h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-neutral-400">{group.category}</h2><div className="mt-4 flex flex-wrap gap-2">{group.items.map(item => <span key={item} className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-900">{item}</span>)}</div></section>)}</div></main>;
}
