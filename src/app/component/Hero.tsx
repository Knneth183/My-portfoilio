import Image from 'next/image';
import Link from 'next/link';

interface StatItem {
  value: string;
  label: string;
  href?: string;
}

const technologies = [
  "Python",
  "BASH",
  "JavaScript",
  "HTML",
  "React Js",
  "Next Js",
  "Tailwind CSS",
];

const socialLinks = [
  { name: 'github', href: 'https://github.com/Knneth183' },
  { name: 'linkedin', href: 'https://www.linkedin.com/in/kenneth-lim-aa6637334/' },
  { name: 'instagram', href: 'https://instagram.com' },
  { name: 'email', href: 'mailto:Kennethlim183@gmail.com' },
];

export default function Hero() {
  return (
    <section className="relative w-full max-w-5xl mx-auto px-6 py-16 font-sans text-neutral-800 antialiased">
      <div 
        className="absolute inset-0 -z-10 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#a1a1aa 1px, transparent 1px)',
          backgroundSize: '16px 16px',
          maskImage: 'linear-gradient(to bottom right, transparent 20%, black 50%, transparent 80%)'
        }}
      />

      {/* Main Grid: Portrait Left, Text Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center mb-16">
        
        {/* Left Column: Portrait */}
        <div className="md:col-span-5 flex justify-center md:justify-start">
          <div className="relative w-full max-w-sm aspect-[4/5] filter grayscale contrast-125">
            <Image
              src="/ken.png" 
              alt="Kenneth Lim"
              fill
              priority
              className="object-cover rounded-sm"
            />
          </div>
        </div>

        {/* Right Column: Bio & Links */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-6">
          <h1 className="dark:text-neutral-100 text-4xl md:text-5xl font-mono tracking-tight font-medium text-neutral-900">
            kenneth Lim
          </h1>

          <div className=" dark:text-neutral-200 space-y-4 text-neutral-600 text-base md:text-lg leading-relaxed max-w-xl">
            <p>
              I&apos;m a <span className="dark:text-amber-200 text-neutral-900">CyberSecurity Student</span>. And I build modern web &amp; mobile apps, 
              and these days I&apos;m focused on Cybersecurity.
            </p>
            <p>
              Right now I&apos;m building cool new stuff every day. I love turning 
              rough ideas into things people actually use.
            </p>
          </div>
          <div className="dark:text-amber-200 pt-2 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-neutral-600">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-black transition-colors dark:hover:text-white"
              >
                <span>{link.name}</span>
                <span className="text-xs text-neutral-400">↗</span>
              </a>
            ))}
          </div>
        </div>

      </div>

      
    </section>
  );
}