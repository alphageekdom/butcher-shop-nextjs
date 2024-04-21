import { useState } from 'react';
import Image from 'next/image';
import { FaDollarSign, FaStar, FaHeart } from 'react-icons/fa';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleCardClick = () => {
    // Redirect to the product page when the card is clicked
    window.location.href = `/products/${product._id}`;
  };

  const handleHeartClick = (event) => {
    // Prevent the card click event from propagating when the heart is clicked
    event.stopPropagation();
    // Toggle the like status of the product
    setIsLiked(!isLiked);
  };
  return (
    <div className='relative cursor-pointer' onClick={handleCardClick}>
      <div className='relative'>
        <Image
          src={`/images/products/${product.images[0]}`}
          alt=''
          height={300}
          width={300}
          sizes='100vw'
          className='w-[500px] h-[300px] rounded-t-xl object-cover rounded-2xl'
        />
        <div className='p-4'>
          <div className='flex justify-between'>
            <div className='text-left md:text-center lg:text-left mb-1'>
              <h3 className='font-bold'>{product.name}</h3>
              <p className='text-gray-600'>{product.type}</p>
            </div>
            <div className='flex items-center text-left md:text-center lg:text-left mb-1'>
              <FaStar className='text-yellow-500' />
              <p>{product.rating}</p>
            </div>
          </div>
          <h3
            className='absolute top-[10px] right-[10px] px-4 py-2 rounded-lg text-grey-500 font-bold text-right md:text-center lg:text-right text-3xl'
            onClick={handleHeartClick}
          >
            <FaHeart
              className={`border border-white rounded-full p-1 hover:scale-110 transition-transform duration-300 ${
                isLiked ? 'text-rose-500' : 'text-white'
              }`}
            />
          </h3>

          <div className='border border-gray-100 mb-5'></div>

          <div className='flex flex-col lg:flex-row justify-between mb-2'>
            <div className='flex justify-center items-center  gap-2 mb-4 lg:mb-0'>
              <FaDollarSign className='text-grey-500 mr-1' />
              <span className='text-black'>{product.price}</span>
            </div>
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

export default ProductCard;
