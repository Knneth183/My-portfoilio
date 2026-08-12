import Link from "next/link"; 
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-3 text-2xl font-black text-gray-900 tracking-tight hover:text-red-500 transition-colors group"
        >
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-gray-200 group-hover:border-red-500 transition-colors">
            <Image
              src="/side.png" 
              alt="KenDev Logo"
              fill
              className="object-cover"
            />
          </div>
          Kenneth Lim
        </Link>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <Link 
            href="#contact" 
            className="text-sm px-4 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-gray-900 hover:text-white transition-colors"
          >
            Hire Me
          </Link>
        </div>

      </nav>
    </header>
  );
}