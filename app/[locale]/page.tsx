import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Calculator from '@/components/home/Calculator';
import Stats from '@/components/home/Stats';
import Clients from '@/components/home/Clients';
import Offices from '@/components/home/Offices';
import Routes from '@/components/home/Routes';
import Process from '@/components/home/Process';
import ContactForm from '@/components/home/ContactForm';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Calculator />
        <Stats />
        <Clients />
        <Offices />
        <Routes />
        <Process />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
