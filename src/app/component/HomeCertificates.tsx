import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { certificates } from '@/lib/certificates';
import CertificateCard from '@/app/component/CertificateCard';

export default function HomeCertificates() {
  return (
    <section aria-label="Certifications" className="space-y-8 px-5 py-8 sm:px-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-700 dark:text-zinc-300">04 — certifications</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 dark:text-white">Certificates</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-700 dark:text-zinc-300">
            Credentials in cybersecurity and technology, with certificates available to view.
          </p>
        </div>
        <Link href="/certificate" className="mt-2 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-neutral-700 transition-colors hover:text-neutral-950 dark:text-zinc-300 dark:hover:text-white">
          All certificates <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
        </Link>
      </header>

      <div>
        <div className={`grid gap-4 ${certificates.length === 1 ? 'grid-cols-1 justify-items-center' : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'}`}>
          {certificates.map((certificate) => (
            <CertificateCard key={certificate.title} certificate={certificate} />
          ))}
        </div>
      </div>
    </section>
  );
}
