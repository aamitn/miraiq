import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MachineSection from './components/MachineSection';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';

function App() {
  return (
    <div className="relative">
      <Navbar />
      <HeroSection />
      <MachineSection />
      <ServicesSection />
      <ContactSection />
    </div>
  );
}

export default App;
