import About from '@/components/About';
import FeaturedProducts from '@/components/FeaturedProducts';
import Hero from '@/components/Hero';
import Sponsor from '@/components/Sponsor';

const HomePage = async () => {
  return (
    <>
      <Hero />
      <Sponsor />
      <About />
      <FeaturedProducts />
    </>
  );
};

export default HomePage;
