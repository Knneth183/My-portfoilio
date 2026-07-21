import Header from "./component/Header";
import Hero from "./component/Hero";
import TechStack from "./component/TechStack";
import Footer from "./component/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 space-y-20">
        <Hero />

        <TechStack />

        <section id="projects" className="scroll-mt-20">
          {/* Your Projects component goes here */}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}