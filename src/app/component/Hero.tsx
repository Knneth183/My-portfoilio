import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background Accent Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-87.5 bg-sky-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Grid Container for Side-by-Side Layout */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Hero Text & Buttons */}
        <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 border border-slate-800 px-4 py-1.5 text-xs font-mono text-sky-400 mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            Available for new opportunities
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            Hi, I&apos;m <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-blue-500">Kenenth</span>.
            <br />
            i'm a CyberSecurity Student.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            I build high-performance web applications with <span className="text-slate-200 font-medium">Next.js</span>, <span className="text-slate-200 font-medium">TypeScript</span>, and <span className="text-slate-200 font-medium">Tailwind CSS</span>. Focused on clean code, seamless UX, and modern web architectures.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="#projects"
              className="w-full sm:w-auto px-8 py-3.5 bg-sky-500 text-slate-950 font-semibold rounded-full hover:bg-sky-400 transition-all duration-200 shadow-lg shadow-sky-500/20 text-center"
            >
              View Projects
            </Link>
            <Link
              href="#contact"
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-slate-200 border border-slate-800 font-semibold rounded-full hover:bg-slate-800 hover:text-white transition-all duration-200 text-center"
            >
              Let&apos;s Connect
            </Link>
            <Link
              href="#resume"
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-slate-200 border border-slate-800 font-semibold rounded-full hover:bg-slate-800 hover:text-white transition-all duration-200 text-center"
            >
              Download Resume
            </Link>
          </div>
        </div>
        <div className="md:col-span-5 flex justify-center items-center">
          <div className="relative w-64 h-128 sm:w-80 sm:h-80 md:w-full md:h-126">
            <Image
              src="/profile.jpg" 
              alt="Kenneth's Profile Picture"
              fill
              priority
              className="object-cover rounded-2xl border border-slate-800/80 shadow-2xl shadow-sky-500/10"
            />
          </div>
        </div>

      </div>
    </section>
  );
}