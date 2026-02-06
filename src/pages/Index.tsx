import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main>
      <Hero />
      <div id="features">
        <Features />
      </div>
      <div id="how">
        <HowItWorks />
      </div>
      <CTA />
    </main>
    <Footer />
  </div>
);

export default Index;
