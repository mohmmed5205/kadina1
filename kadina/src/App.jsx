import Navbar from "./componetts/Navbar";
import Hero from "./componetts/Hero";
import About from "./componetts/About";
import Services from "./componetts/Services";
import WhyUs from "./componetts/WhyUs";
import Stats from "./componetts/Stats";
import Gallery from "./componetts/Gallery";
import BeforeAfter from "./componetts/BeforAfter";
import Reviews from "./componetts/Reviews";

export default function App() {
  return (
    <>
      <Navbar />

      <Hero />
      <About />
      <Services />
      <WhyUs />
      <Stats />
      <Gallery />
      <BeforeAfter />
      <Reviews />

    </>
  );
}