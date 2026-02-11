import Navigation from "./components/Navigation";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import Qualifications from "./sections/Qualifications";
import Clinic from "./sections/Clinic";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import MedicalBackground from "./components/MedicalBackground";

export default function Home() {
  return (
    <>
      <MedicalBackground />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Qualifications />
        <Clinic />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
