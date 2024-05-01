'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchProduct } from '@/utils/request';
import Spinner from '@/components/Spinner';
import ProductDetails from '@/components/product/ProductDetails';
import BackButton from '@/components/uielements/BackButton';
import ProductSearchForm from '@/components/ProductSearchForm';

const ProductPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) return;

      try {
        const product = await fetchProduct(id);
        setProduct(product);
      } catch (error) {
        console.error('Error Fetching Product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (product === null) {
      fetchProductData();
    }
  }, [id, product]);

  if (!product && !loading) {
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Product Not Found
      </h1>
    );
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && product && (
        <>
          <section className='bg-[#B91C1B] py-4 search-form'>
            <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
              <ProductSearchForm />
            </div>
          </section>

          <BackButton href={'/products'} />

          <section className='bg-blue-50'>
            <div className='container m-auto py-10 px-6'>
              <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
                <ProductDetails product={product} />
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ProductPage;
