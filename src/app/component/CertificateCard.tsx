import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import { SiCisco } from 'react-icons/si';
import type { certificates } from '@/lib/certificates';

type Certificate = (typeof certificates)[number];

export default function CertificateCard({ certificate }: { certificate: Certificate }) {
  return (
    <Link
      href={certificate.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${certificate.title} certificate from ${certificate.issuer} (opens in a new tab)`}
      className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-zinc-950"
    >
      <article className="flex min-h-[205px] h-full flex-col items-center rounded-[1.15rem] border border-neutral-200/90 bg-white px-4 py-5 text-center font-[Arial,Helvetica,sans-serif] shadow-[0_12px_28px_-20px_rgba(0,0,0,0.3)] transition duration-300 group-hover:-translate-y-1 group-hover:border-neutral-300 group-hover:shadow-[0_18px_36px_-18px_rgba(0,0,0,0.2)] dark:border-zinc-800 dark:bg-zinc-900/70 dark:shadow-black/30">
        <span className={`relative mb-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-800 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 ${certificate.mark === 'appkademiya' ? 'overflow-hidden border-0 bg-transparent dark:border-0 dark:bg-transparent' : ''}`}>
          {certificate.mark === 'appkademiya' ? (
            <Image
              src="/project_card/appkademiya.png"
              alt="Appkademiya"
              width={447}
              height={447}
              className="h-full w-full object-contain"
            />
          ) : certificate.mark === 'cisco' ? (
            <SiCisco aria-hidden="true" className="h-6 w-6 text-[#049fd9]" />
          ) : (
            <ShieldCheck aria-hidden="true" className="h-6 w-6 text-[#1261a0]" />
          )}
        </span>
        <h2 className="min-h-10 px-1 text-[15px] font-semibold leading-5 tracking-tight text-neutral-950 dark:text-white">
          {certificate.title}
        </h2>
        <p className="mt-1 line-clamp-1 text-xs font-medium uppercase tracking-wider text-neutral-400 dark:text-zinc-400">
          {certificate.issuer}
        </p>
        <span className="mt-auto flex items-center gap-2 pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-400 transition-colors group-hover:text-neutral-800 dark:text-zinc-500 dark:group-hover:text-zinc-100">
          <span aria-hidden="true">‹</span>
          Verify
          <span aria-hidden="true">›</span>
        </span>
      </article>
    </Link>
  );
}
