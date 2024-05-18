'use client';

import { useState, useEffect } from 'react';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';
import ProductCard from '@/components/product/ProductCard';

const SavedProductsPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarkedProducts = async () => {
      try {
        const res = await fetch('/api/bookmarks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          const data = await res.json();
          setBookmarks(data);
        } else {
          console.error(res.status);
          toast.error('Failed to fetch new bookmarks');
        }
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
        toast.error('Error fetching bookmarks');
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedProducts();
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {bookmarks.length === 0 ? (
          <p>No cuts found.</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {bookmarks.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default SavedProductsPage;
