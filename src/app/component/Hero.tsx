import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden flex items-center justify-center">

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center w-full">

        <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left">

          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-red-200 px-4 py-1.5 text-xs font-mono text-red-700 mb-8 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Available for new opportunities
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">Kenneth</span>.
            <br />
            I&apos;m a CyberSecurity Student.
          </h1>

          {/* Description */}
          <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
            Cybersecurity student specializing in <span className="text-blue-600 font-semibold">Python</span>, <span className="text-amber-600 font-semibold">TypeScript</span>, and development. Actively refining threat analysis and problem-solving skills through CTF challenges and sharpening hands-on <span className="text-red-600 font-semibold">offensive</span> and <span className="text-emerald-600 font-semibold">defensive</span> technical skills.
          </p>

          {/* Action Buttons */}
        
        </div>

        {/* Right Column: Profile Image with Hover Swap */}
        <div className="md:col-span-5 flex justify-center items-center">
          <div className="group relative w-full max-w-[320px] sm:max-w-[360px] aspect-[3/4] rounded-2xl overflow-hidden border border-gray-200 shadow-xl cursor-pointer bg-gray-100">
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