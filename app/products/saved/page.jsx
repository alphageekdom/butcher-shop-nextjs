'use client';
import { useState, useEffect, useCallback } from 'react';
import SavedProducts from '@/components/SavedProducts';

const SavedProductsPage = () => {
  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = useCallback(async () => {
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
        console.error('Failed to fetch new bookmarks');
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  }, []);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  console.log(bookmarks);

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <h1 className='text-2xl mb-4'>Saved Cuts</h1>
        <SavedProducts bookmarks={bookmarks} />
      </div>
    </section>
  );
};

export default SavedProductsPage;
