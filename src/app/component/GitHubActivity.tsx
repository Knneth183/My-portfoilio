'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const githubProfile = 'https://github.com/Knneth183';
type Contribution = { date: string; count: number };
type ContributionData = { contributions: Contribution[]; total: number };

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function buildWeeks(contributions: Contribution[]) {
  if (!contributions.length) return [];

  const byDate = new Map(contributions.map((day) => [day.date, day.count]));
  const sortedDates = contributions.map((day) => day.date).sort();
  const first = new Date(`${sortedDates[0]}T00:00:00Z`);
  const last = new Date(`${sortedDates[sortedDates.length - 1]}T00:00:00Z`);
  first.setUTCDate(first.getUTCDate() - first.getUTCDay());
  last.setUTCDate(last.getUTCDate() + (6 - last.getUTCDay()));

  const weeks: Array<Array<{ date: string; count: number }>> = [];
  for (let cursor = new Date(first); cursor <= last; cursor.setUTCDate(cursor.getUTCDate() + 1)) {
    const date = dateKey(cursor);
    const weekIndex = Math.floor((cursor.getTime() - first.getTime()) / (7 * 24 * 60 * 60 * 1000));
    weeks[weekIndex] ??= [];
    weeks[weekIndex].push({ date, count: byDate.get(date) ?? 0 });
  }
  return weeks;
}

function intensity(count: number, dark: boolean) {
  if (count === 0) return dark ? '#27272a' : '#e5e5e5';
  if (count < 3) return dark ? '#52525b' : '#c4c4c4';
  if (count < 6) return dark ? '#a1a1aa' : '#737373';
  return dark ? '#f4f4f5' : '#171717';
}

export default function GitHubActivity() {
  const [activity, setActivity] = useState<ContributionData | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const weeks = useMemo(() => buildWeeks(activity?.contributions ?? []), [activity]);

  useEffect(() => {
    const updateTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const controller = new AbortController();
    fetch('/api/github-contributions', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Contribution data unavailable');
        return response.json() as Promise<ContributionData>;
      })
      .then((data) => setActivity(data))
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === 'AbortError') return;
        setUnavailable(true);
      });

    return () => {
      observer.disconnect();
      controller.abort();
    };
  }, []);

  return (
    <section aria-labelledby="github-heading" className="space-y-5 py-8">
      <header className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs uppercase tracking-widest">
        <h2 id="github-heading" className="text-neutral-400 dark:text-zinc-500">07 — github</h2>
        <Link href={githubProfile} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-neutral-500 transition-colors hover:text-neutral-950 dark:text-zinc-400 dark:hover:text-white">
          @KNNETH183 <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
        </Link>
      </header>

      {weeks.length > 0 ? (
        <Link href={githubProfile} target="_blank" rel="noopener noreferrer" aria-label="View Kenneth Lim's GitHub profile" className="block overflow-x-auto rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-zinc-500">
          <svg viewBox={`0 0 ${weeks.length * 15 + 4} 104`} role="img" aria-label="GitHub contributions by day over the last year" className="h-auto min-w-[680px] w-full">
            {weeks.flatMap((week, weekIndex) => week.map((day, dayIndex) => (
              <circle
                key={day.date}
                cx={weekIndex * 15 + 5}
                cy={dayIndex * 14 + 6}
                r={day.count === 0 ? 1.7 : Math.min(4.8, 2.2 + Math.log2(day.count + 1) * 0.65)}
                fill={intensity(day.count, isDark)}
              >
                <title>{`${day.count} ${day.count === 1 ? 'contribution' : 'contributions'} on ${day.date}`}</title>
              </circle>
            ))) }
          </svg>
        </Link>
      ) : (
        <Link href={githubProfile} target="_blank" rel="noopener noreferrer" className="flex min-h-24 items-center justify-center rounded-xl border border-dashed border-neutral-200 font-mono text-xs text-neutral-500 transition-colors hover:border-neutral-400 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600">
          {unavailable ? 'View contribution activity on GitHub' : 'Loading GitHub activity…'} <ArrowUpRight aria-hidden="true" className="ml-1 h-3.5 w-3.5" />
        </Link>
      )}
      <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 dark:text-zinc-500">
        {activity ? `${activity.total.toLocaleString()} contributions in the last year` : unavailable ? 'Contribution activity unavailable' : 'Loading contributions'}
      </p>
    </section>
  );
}
