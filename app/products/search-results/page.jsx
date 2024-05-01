'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Spinner from '@/components/Spinner';
import ProductCard from '@/components/product/ProductCard';
import ProductSearchForm from '@/components/ProductSearchForm';
import BackButton from '@/components/uielements/BackButton';

const SearchResultsPage = () => {
  const searchParams = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const product = searchParams.get('product');
  const productType = searchParams.get('productType');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/products/search?product=${product}&productType=${productType}`
        );

        if (res.status === 200) {
          const data = await res.json();
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [product, productType]);

  return (
    <>
      <section className='bg-[#B91C1B] py-4'>
        <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
          <ProductSearchForm />
        </div>
      </section>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className='px-4 py-6'>
          <div className='container-xl lg:container m-auto px-4 py-6'>
            <BackButton href={'/products'} />
            <h1 className='text-2xl mb-4'>Search Results</h1>
            {products.length === 0 ? (
              <p>No Search Results Found</p>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default SearchResultsPage;
