import { certificates } from '@/lib/certificates';
import CertificateCard from '@/app/component/CertificateCard';

export default function CertificatePage() {
  return (
    <main className="min-h-screen px-6 py-12 sm:px-10">
      <section aria-labelledby="certifications-heading" className="mx-auto w-full max-w-6xl space-y-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-neutral-700 dark:text-zinc-300">04 — certifications</p>
            <h1 id="certifications-heading" className="mt-3 text-4xl font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-5xl">Certificates</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-700 dark:text-zinc-300 sm:text-base">
              Credentials earned through focused learning in cybersecurity and technology.
            </p>
          </div>
          <p className="rounded-full border border-neutral-950/10 bg-white/40 px-4 py-2 font-mono text-xs uppercase tracking-widest text-neutral-800 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
            {certificates.length} {certificates.length === 1 ? 'certificate' : 'certificates'}
          </p>
        </header>

        <div className={`grid gap-5 ${certificates.length === 1 ? 'grid-cols-1 justify-items-center' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
          {certificates.map((certificate) => (
            <CertificateCard key={certificate.title} certificate={certificate} />
          ))}
        </div>
      </section>
    </main>
  );
}
