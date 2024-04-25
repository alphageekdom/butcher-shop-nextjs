'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchProduct } from '@/utils/request';
// import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import Spinner from '@/components/Spinner';
import ProductDetails from '@/components/product/ProductDetails';
import ProductImages from '@/components/product/ProductImages';
import BackButton from '@/components/uielements/BackButton';
import BookmarkButton from '@/components/uielements/BookmarkButton';
// import ShareButtons from '@/components/ShareButtons';
// import PropertyContactForm from '@/components/PropertyContactForm';

const PropertyPage = () => {
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
          {/* <PropertyHeaderImage image={product.images[0]} /> */}

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

export default PropertyPage;
