import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';

// In future steps, you'll import and add:
// import Works from '@/components/Works';
// import Testimonials from '@/components/Testimonials';
// import Contact from '@/components/Contact';
// import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      {/* More sections will be added in the next steps */}
    </main>
  );
}