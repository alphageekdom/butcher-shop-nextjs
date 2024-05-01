import { fetchProducts } from '@/utils/request';
import FeaturedProductCard from './FeaturedProductCard';

const FeaturedProducts = async () => {
  try {
    const products = await fetchProducts({
      showFeatured: true,
    });

    return (
      <>
        {products.length > 0 && (
          <section className='bg-blue-50 px-4 pt-6 pb-10'>
            <div className='container-xl lg:container m-auto'>
              <h2 className='text-4xl font-bold text-black mb-6 text-center'>
                Featured Products
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 z-10'>
                {products.map((product) => (
                  <FeaturedProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}
      </>
    );
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return <div>Error fetching featured products. Please try again later.</div>;
  }
};

export default FeaturedProducts;
