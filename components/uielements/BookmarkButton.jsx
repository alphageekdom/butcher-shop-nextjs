'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { FaBookmark } from 'react-icons/fa';

const BookmarkButton = ({ product }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const checkBookmarkStatus = async () => {
      try {
        if (!userId) return setLoading(false);
        const res = await fetch('/api/bookmarks/check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: product?._id,
          }),
        });

        if (res.status === 200) {
          const data = await res.json();
          setIsBookmarked(data.isBookmarked);
        } else {
          throw new Error('Failed to fetch bookmark status');
        }
      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch bookmark status');
      } finally {
        setLoading(false);
      }
    };

    checkBookmarkStatus();
  }, [product?._id, userId]);

  const handleBookmarkToggle = async () => {
    if (!userId) {
      toast.error('You Need To Sign In To Bookmark A Product');
      return;
    }

    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product?._id,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        setIsBookmarked(data.isBookmarked);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something Went Wrong');
    }
  };

  if (loading) return <p className='text-center'>Loading...</p>;

  return (
    <button
      onClick={handleBookmarkToggle}
      className={`${
        isBookmarked
          ? 'bg-[#B91C1B] hover:bg-red-600'
          : 'bg-blue-500 hover:bg-blue-600'
      } text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}
    >
      <FaBookmark className='mr-2' /> {isBookmarked ? 'Remove' : 'Bookmark'}
    </button>
  );
};

export default BookmarkButton;
