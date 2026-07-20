import Link from "next/link"; 

export default function Header() {
  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Links', href: '#contact' },
    { name: 'Contacts', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <Link href="/" className="text-xl font-bold text-green-400 tracking-tight hover:text-sky-300 transition-colors">
          Lim&apos;s DevFolio
        </Link>
        
        <div className="flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          <Link 
            href="#contact" 
            className="text-sm px-4 py-2 bg-sky-500 text-slate-950 font-semibold rounded-full hover:bg-sky-400 transition-colors"
          >
            Hire Me
          </Link>
        </div>
      </nav>
    </header>
  );
}