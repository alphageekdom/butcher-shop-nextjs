'use client';

import Image from 'next/image';
import { FaDollarSign, FaStar, FaBookmark } from 'react-icons/fa';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const FeaturedProductCard = ({ product }) => {
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
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    checkBookmarkStatus();
  }, [product?._id, userId]);

  const handleBookmarkClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userId) {
      toast.error('You Need To Sign In To Bookmark A Property');
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
        toast.success(data.message);
        setIsBookmarked(data.isBookmarked);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something Went Wrong');
    }
  };

  if (loading) return <p className='text-center'>Loading...</p>;

  const handleCardClick = () => {
    // Redirect to the product page when the card is clicked
    window.location.href = `/products/${product._id}`;
  };
  return (
    <div
      className='cursor-pointer relative flex flex-col md:flex-row custom-shadow rounded-xl'
      onClick={handleCardClick}
    >
      <Image
        src={`/images/products/${product.images[0]}`}
        alt=''
        height={300}
        width={300}
        sizes='100vw'
        className='object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl md:w-[50%] w-full h-[300px]'
      />
      <div className='p-4 w-full'>
        <div className='flex justify-between '>
          <div className='text-left md:text-center lg:text-left mb-1'>
            <h3 className='font-bold'>{product.name}</h3>
            <p className='text-gray-600'>{product.type}</p>
          </div>
          <div className='flex items-center text-left md:text-center lg:text-left mb-1'>
            <FaStar className='text-yellow-500' />
            <p>{product.rating}</p>
          </div>
        </div>
        <h3 className='absolute bottom-[10px] left-[0px] px-4 py-2 rounded-lg text-grey-500 font-bold text-right md:text-center lg:text-right text-3xl'>
          <FaBookmark
            className={`${
              isBookmarked ? 'text-red-500' : 'text-blue-500'
            } cursor-pointer`}
            onClick={handleBookmarkClick}
          />
        </h3>

        <div className='border border-gray-100 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-evenly mb-2'>
          <div className='flex justify-center md:justify-normal items-center flex-grow mb-4 lg:mb-0'>
            <FaDollarSign className='text-grey-500 mr-1' />
            <span className='text-black'>{product.price}</span>
          </div>
          <div className='flex justify-center items-center'>
            <Link
              href={`/products/${product._id}`}
              className='h-[36px] bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-center text-sm'
            >
              Add to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductCard;
