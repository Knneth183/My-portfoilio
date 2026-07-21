import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* 1. Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-screen h-screen object-cover z-0 pointer-events-none"
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-[2px] z-0 pointer-events-none" />

      <div className="relative z-20 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center w-full">

        <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left">

          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/90 border border-green-800 px-4 py-1.5 text-xs font-mono text-sky-400 mb-8 shadow-sm backdrop-blur-md">

            <span className="relative flex h-2 w-2">

              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>

            </span>
            Available for new opportunities
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Kenneth</span>.
            <br />
            i&apos;m a CyberSecurity Student.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Cybersecurity student specializing in <span className="text-blue-400 font-medium">Python</span>, <span className="text-yellow-400 font-medium">TypeScript</span>, and development. Actively refining threat analysis and problem-solving skills through CTF challenges and sharpening hands-on <span className="text-red-500 font-medium">offensive</span> and <span className="text-green-400 font-medium">defensive</span> technical skills.
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
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900/80 text-slate-200 border border-slate-800 font-semibold rounded-full hover:bg-slate-800 hover:text-white transition-all duration-200 text-center backdrop-blur-md"
            >
              Let&apos;s Connect
            </Link>
          </div>
        </div>

        {/* Right Column: Profile Image with Hover Swap */}
        <div className="md:col-span-5 flex justify-center items-center">
          <div className="group relative w-full max-w-[320px] sm:max-w-[360px] aspect-[3/4] rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl shadow-sky-500/10 cursor-pointer">
            {/* Default Image */}
            <Image
              src="/zerotwo.jpg" 
              alt="Kenneth's Profile Picture"
              fill
              priority
              className="object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0"
            />

            {/* Hover Image */}
            <Image
              src="/pick.jpg" 
              alt="Kenneth's Profile Picture Hover"
              fill
              className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
            />
          </div>
        </div>

      </div>
    </section>
  );
}