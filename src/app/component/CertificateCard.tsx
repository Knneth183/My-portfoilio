import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { certificates } from '@/lib/certificates';

type Certificate = (typeof certificates)[number];

export default function CertificateCard({ certificate }: { certificate: Certificate }) {
  return (
    <Link
      href={certificate.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${certificate.title} certificate`}
      className="group block w-full max-w-[230px] rounded-[2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-4"
    >
      <article className="relative isolate aspect-[0.76] w-full transition duration-300 group-hover:-translate-y-1">
        <div aria-hidden="true" className="absolute inset-x-0 top-[9%] h-[91%] rounded-[1.8rem] border border-neutral-200 bg-white shadow-[0_20px_48px_-28px_rgba(0,0,0,0.2)] dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-black/40" />
        <div aria-hidden="true" className="absolute right-0 top-0 h-[19%] w-[64%] rounded-t-[1.8rem] bg-neutral-50 dark:bg-zinc-900" />

        <p className="absolute right-[5%] top-[3%] z-10 max-w-[60%] truncate text-right text-[clamp(0.5rem,2.1vw,0.68rem)] text-neutral-800 dark:text-zinc-300" title={certificate.issuer}>
          — {certificate.issuer}
        </p>

        <div
          aria-hidden="true"
          className="absolute left-[6%] right-[6%] top-[14%] z-10 h-[44%] overflow-hidden rounded-xl bg-[#05051d]"
          style={{ backgroundImage: 'radial-gradient(ellipse 120% 100% at 0% 110%, rgba(0,113,255,.72), transparent 58%), repeating-radial-gradient(ellipse 100% 135% at 0% 110%, transparent 0 15px, rgba(66,165,255,.34) 16px 21px, transparent 22px 38px), linear-gradient(125deg, #04122e, #080727 72%)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <p className="absolute bottom-[9%] left-[7%] max-w-[85%] text-[clamp(0.8rem,3.1vw,1.12rem)] font-medium leading-tight tracking-tight text-white">
            {certificate.category} certification.
          </p>
        </div>

        <h2 className="absolute left-[9%] right-[7%] top-[61%] z-10 line-clamp-2 text-[clamp(1.25rem,3.4vw,1.65rem)] font-extralight leading-[1.02] tracking-[-0.05em] text-neutral-950 dark:text-white">
          {certificate.title}
        </h2>
        <p className="absolute bottom-[13%] left-[9%] z-10 font-mono text-[clamp(0.55rem,2vw,0.7rem)] uppercase tracking-[0.16em] text-neutral-500 dark:text-zinc-400">
          {certificate.date}
        </p>

        <ArrowUpRight aria-hidden="true" className="absolute bottom-[13%] right-[8%] z-10 h-4 w-4 text-neutral-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-950 dark:text-zinc-400 dark:group-hover:text-white" />
      </article>
    </Link>
  );
}
