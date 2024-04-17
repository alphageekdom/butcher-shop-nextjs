import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaMapMarker } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  return (
    <div className='rounded-xl custom-shadow relative'>
      <Image
        src={`/images/products/${product.images[0]}`}
        alt=''
        height={300}
        width={300}
        sizes='100vw'
        className='w-[500px] h-[300px] rounded-t-xl object-cover'
      />
      <div className='p-4'>
        <div className='text-left md:text-center lg:text-left mb-6'>
          <div className='text-gray-600'>{product.type}</div>
          <h3 className='text-xl font-bold'>{product.name}</h3>
        </div>
        <h3 className='absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
          ${product.price}
        </h3>

        <div className='flex justify-center gap-4 text-gray-500 mb-4'></div>

        <div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
          <p>{product.price}</p>
        </div>

        <div className='border border-gray-100 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-between mb-4'>
          <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
            <FaMapMarker className='text-sky-700 mt-1' />
            <span className='text-sky-700'>
              {product.location.city}, {product.location.state}
            </span>
          </div>
          <Link
            href={`/products/${product._id}`}
            className='h-[36px] bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-center text-sm'
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
