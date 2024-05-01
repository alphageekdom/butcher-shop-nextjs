'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/product/ProductCard';
import { useSession } from 'next-auth/react';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';

const SavedProductsPage = () => {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProducts = async () => {
      if (!session?.user?.id) {
        return;
      }

      try {
        const res = await fetch(`/api/bookmarks`);

        if (res.status === 200) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch user properties when session is available
    fetchSavedProducts();
  }, [session]);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <h1 className='text-2xl mb-4'>Saved Products</h1>
        {products.length === 0 ? (
          <p>No saved products</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default SavedProductsPage;
