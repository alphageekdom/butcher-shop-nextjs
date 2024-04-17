import Products from '@/components/Products';

const ProductsPage = async () => {
  return (
    <>
      <section className='py-4'>
        <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'></div>
      </section>

      <Products />
    </>
  );
};

export default ProductsPage;
