import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import Services from '@/components/home/Services';
import WhyCorcel from '@/components/home/WhyCorcel';
import Offices from '@/components/home/Offices';
import Calculator from '@/components/home/Calculator';
import BlogPreview from '@/components/home/BlogPreview';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <WhyCorcel />
        <Offices />
        <Calculator />
        <BlogPreview />
      </main>
      <Footer />
    </>
  );
}
