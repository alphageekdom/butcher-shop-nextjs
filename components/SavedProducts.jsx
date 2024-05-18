'use client';

import { useState, useCallback } from 'react';
import ProductCard from './product/ProductCard';

const SavedProducts = ({ initialBookmarks }) => {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);

  const handleBookmarkChange = useCallback(async () => {
    try {
      const res = await fetch('/api/bookmarks');
      if (res.ok) {
        const newBookmarks = await res.json();
        setBookmarks(newBookmarks);
      } else {
        console.error('Failed to fetch new bookmarks');
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  }, []);

  if (!bookmarks || bookmarks.length === 0) {
    return <p>No cuts found.</p>;
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      {bookmarks.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onBookmarkChange={handleBookmarkChange}
        />
      ))}
    </div>
  );
};

export default SavedProducts;
