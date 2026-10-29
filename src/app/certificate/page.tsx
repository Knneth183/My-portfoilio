import { certificates } from '@/lib/certificates';
import CertificateCard from '@/app/component/CertificateCard';

export default function CertificatePage() {
  return (
    <main className="min-h-[65vh] px-6 py-12 sm:px-10 sm:py-16 lg:relative lg:left-1/2 lg:w-[166.6667%] lg:-translate-x-1/2">
      <section aria-labelledby="certifications-heading" className="mx-auto w-full max-w-6xl">
        <header className="mb-8 flex items-center justify-between gap-4">
          <h1 id="certifications-heading" className="font-mono text-sm tracking-tight text-neutral-400 dark:text-zinc-400">
            04 — certifications
          </h1>
          <a
            href="#certification-list"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-neutral-500 transition-colors hover:text-neutral-950 dark:text-zinc-400 dark:hover:text-white"
          >
            All certifications
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </header>

        <div
          id="certification-list"
          className="grid scroll-mt-8 grid-cols-1 gap-x-4 gap-y-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {certificates.map((certificate, index) => (
            <div
              key={certificate.title}
              className={`relative transition-transform duration-300 hover:z-10 hover:rotate-0 ${index % 4 === 0 ? 'sm:-rotate-2' : index % 4 === 1 ? 'sm:rotate-[1.5deg]' : index % 4 === 2 ? 'sm:-rotate-[1deg]' : 'sm:rotate-2'}`}
            >
              <CertificateCard certificate={certificate} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
