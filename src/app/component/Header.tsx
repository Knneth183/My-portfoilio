import Link from "next/link"; 
import Image from "next/image";

export default function Header() {
  const navLinks = [
    { name: '//Projects', href: '#projects' },
    { name: '//Links', href: '#contact' },
    { name: '//Contacts', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <Link href="/" className="inline-flex items-center gap-3 text-2xl font-black text-white tracking-tight hover:text-red-500 transition-colors">
        <div className="relative w-8 h-8 rounded-lg overflow-hidden  group-hover:border-sky-400/50 transition-colors">
            <Image
              src="/side.png" 
              alt="KenDev Logo"
              fill
              className="object-cover"/>
        </div>
          Lim&apos;s DevFolio
        </Link>

        <div className="flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-slate-300 hover:text-red-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          <Link 
            href="#contact" 
            className="text-sm px-4 py-2 bg-red-500 text-slate-950 font-semibold rounded-full hover:bg-white transition-colors hover:text-red-500">
            Hire Me
          </Link>
        </div>
      </nav>
    </header>
  );
}