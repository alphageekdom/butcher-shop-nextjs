import About from '@/components/About';
import FeaturedProducts from '@/components/FeaturedProducts';
import Hero from '@/components/Hero';

const HomePage = async () => {
  return (
    <>
      <Hero />
      <About />
      <FeaturedProducts />
    </>
  );
};

export default HomePage;
