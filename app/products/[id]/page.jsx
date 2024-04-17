'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchProduct } from '@/utils/request';
// import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import Spinner from '@/components/Spinner';
import ProductDetails from '@/components/ProductDetails';
import ProductImages from '@/components/ProductImages';
// import BookmarkButton from '@/components/BookmarkButton';
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

          <section>
            <div className='container m-auto py-6 px-6'>
              <Link
                href='/products'
                className='text-sky-500 hover:text-sky-600 flex items-center'
              >
                <FaArrowLeft className='mr-2' /> Back to Cuts
              </Link>
            </div>
          </section>

          <section className='bg-blue-50'>
            <div className='container m-auto py-10 px-6'>
              <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
                <ProductDetails product={product} />
                {/* <!-- Sidebar --> */}
                <aside className='space-y-4'>
                  {/* <BookmarkButton product={product} /> */}
                  {/* <ShareButtons product={product} /> */}
                  {/* <!-- Contact Form --> */}
                  {/* <PropertyContactForm product={product} /> */}
                </aside>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default PropertyPage;
