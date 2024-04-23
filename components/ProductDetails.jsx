'use client';

import { FaStar, FaDollarSign } from 'react-icons/fa';
import { GiMeatCleaver } from 'react-icons/gi';
import ProductImages from './ProductImages';
import CommentSection from './CommentSection';
import BookmarkButton from '@/components/uielements/BookmarkButton';
import ShareButtons from './uielements/ShareButton';

const ProductDetails = ({ product }) => {
  return (
    <main className='container mx-auto px-4'>
      <div className='bg-white p-6 rounded-lg custom-shadow text-center md:text-left'>
        <div className='text-gray-500 mb-4 text-left'>{product.type}</div>
        <div className='text-3xl font-bold mb-4 flex justify-between items-center'>
          {product.name}
          <span className='ml-2 flex'>
            <FaStar className='text-yellow-500' />
            {product.rating}
          </span>
        </div>
        <div className='flex flex-col md:flex-row mb-4'>
          <div className='md:w-1/2'>
            <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
              <h3 className='flex items-center text-lg font-bold mb-2'>
                <GiMeatCleaver className='mr-2 text-2xl' />
                {product.title}
              </h3>
              <p className='text-gray-500 mb-4 text-left'>
                {product.description}
              </p>
              <div className='flex justify-between items-center gap-4 mb-4 text-xl'>
                <p className='flex items-center text-left'>
                  <FaDollarSign className='mr-2 text-1xl' />
                  {product.price} / lbs
                </p>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                  Add to Cart
                </button>
              </div>
              <p className='text-red-500 mb-9'>
                Current Stock: {product.inStock}
              </p>
              <div className='border-t border-gray-500 my-4'></div>
              <BookmarkButton product={product} />
              <ShareButtons product={product} />
            </div>
          </div>
          <div className='md:w-1/2 md:pl-4 mt-4 md:mt-0'>
            <ProductImages images={product.images} />
          </div>
        </div>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
        <CommentSection product={product} />
      </div>
    </main>
  );
};

export default ProductDetails;
