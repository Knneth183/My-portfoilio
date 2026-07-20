import Header from "./component/Header";
import Hero from "./component/Hero";
import TechStack from "./component/TechStack";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 space-y-20">
        
        <Hero />

        <TechStack />

        <section id="projects" className="scroll-mt-20">
          
        </section>
      </main>
    </div>
  );
}