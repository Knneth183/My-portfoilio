'use client';

import { useEffect, useState } from 'react';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

function ViewerAvatar({ variant }: { variant: number }) {
  const hairStyles = [
    <path key="hair" d="M8 11c0-4 2.8-6.5 6-6.5s6 2.5 6 6.5v2h-2l-1-3-3 2-4-1-1 2H8z" />,
    <path key="hair" d="M8 12c-.5-4.5 2.5-7.5 6-7.5s6.5 3 6 7.5l-1 4h-2v-5l-3-2-3 2v5h-2z" />,
    <path key="hair" d="M8 12c0-4.5 2.5-7 6-7s6 2.5 6 7l-2-1-1-3-3 2-4 1z" />,
    <path key="hair" d="M8 11c0-4 2.5-6.5 6-6.5s6 2.5 6 6.5l-2 2-1-4-3 1-4-1-1 3z" />,
  ];

  return <span className="relative -ml-2 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-stone-100 first:ml-0 dark:border-zinc-950 dark:bg-zinc-800" aria-hidden="true">
    <svg viewBox="0 0 28 28" className="h-full w-full" role="presentation">
      <rect width="28" height="28" fill={variant % 2 === 0 ? '#f1f1ef' : '#e8e8e6'} />
      <path d="M4 28c.5-6 4-9 10-9s9.5 3 10 9" fill={variant % 2 === 0 ? '#555' : '#777'} />
      <path d="M10 18v-3h8v3l-4 3z" fill="#c8c8c6" />
      <ellipse cx="14" cy="12" rx="5" ry="6" fill="#d6d5d2" />
      <g fill="#292929">{hairStyles[variant % hairStyles.length]}</g>
      <path d="M11.7 13h.2m4.2 0h.2" stroke="#555" strokeWidth=".7" strokeLinecap="round" />
    </svg>
  </span>;
}

export default function ViewerPresence({ isCollapsed }: { isCollapsed: boolean }) {
  const [viewers, setViewers] = useState<number | null>(null);
  const configured = Boolean(supabaseUrl && supabasePublishableKey);

  useEffect(() => {
    if (!supabaseUrl || !supabasePublishableKey) return;

    let client: SupabaseClient;
    try {
      client = createClient(supabaseUrl, supabasePublishableKey);
    } catch {
      setViewers(null);
      return;
    }

    let viewerId = localStorage.getItem('portfolio-presence-id');
    if (!viewerId) {
      viewerId = crypto.randomUUID();
      localStorage.setItem('portfolio-presence-id', viewerId);
    }

    const channel = client.channel('portfolio-viewers', {
      config: { presence: { key: viewerId }, private: true },
    });
    const updateCount = () => setViewers(Object.keys(channel.presenceState()).length);

    channel
      .on('presence', { event: 'sync' }, updateCount)
      .on('presence', { event: 'join' }, updateCount)
      .on('presence', { event: 'leave' }, updateCount)
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          void channel.track({ online_at: new Date().toISOString() });
          updateCount();
        } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
          setViewers(null);
        }
      });

    return () => {
      void client.removeChannel(channel);
    };
  }, []);

  if (isCollapsed) return null;

  return <section aria-live="polite" className="mx-1 border-t border-neutral-200 px-1 pt-3 dark:border-zinc-800">
    {configured && viewers !== null ? <>
      <div className="flex items-center" aria-hidden="true">
        {Array.from({ length: Math.min(viewers, 4) }, (_, index) => <ViewerAvatar key={index} variant={index} />)}
        {viewers > 4 && <span className="-ml-1.5 flex h-7 min-w-7 items-center justify-center rounded-full border-2 border-white bg-neutral-100 px-1 font-sans text-[10px] font-semibold text-neutral-600 dark:border-zinc-950 dark:bg-zinc-800 dark:text-zinc-300">+{viewers - 4}</span>}
      </div>
      <p className="mt-2 text-xs text-neutral-500 dark:text-zinc-400"><strong className="font-sans text-neutral-900 dark:text-zinc-100">{viewers}</strong> {viewers === 1 ? 'person' : 'people'} viewing now</p>
    </> : <p className="text-xs leading-5 text-neutral-400 dark:text-zinc-500">Live visitor count needs setup</p>}
  </section>;
}
