import ProductSearchForm from './ProductSearchForm';

const Hero = () => {
  return (
    <>
      <section className='py-4'>
        <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'></div>
      </section>

      <section className='bg-[#B91C1B] py-20 mb-4'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center'>
          <div className='text-center'>
            <h1 className='text-4xl font-extrabold text-white sm:text-5xl md:text-6xl'>
              Find The Perfect Cut
            </h1>
            <p className='my-4 text-xl text-white'>
              Discover the perfect cut that suits your needs.
            </p>
          </div>
          <div className='search-form'>
            <ProductSearchForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
