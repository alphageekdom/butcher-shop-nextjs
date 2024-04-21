'use client';

import { useState } from 'react';
import { FaMapMarker, FaStar, FaDollarSign } from 'react-icons/fa';
import { GiMeatCleaver } from 'react-icons/gi';
import ProductImages from './ProductImages';

const ProductDetails = ({ product }) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product._id,
        }),
      });
      if (response.ok) {
        alert('Product added to cart successfully');
      } else {
        throw new Error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert(error.message);
    }
    setIsAddingToCart(false);
  };
  return (
    <main>
      <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
        <div className='text-gray-500 mb-4'>{product.category}</div>
        <div className='text-3xl font-bold mb-4 flex justify-between'>
          <span>{product.type}</span>
          <span className='flex items-center'>
            <FaStar className='ml-1 text-yellow-500' />
            {product.rating}
          </span>
        </div>
        <div className='flex flex-col md:flex-row mb-4'>
          <div className='w-1/2'>
            <div className='bg-white p-6 rounded-lg mt-6 custom-shadow'>
              <div>
                <h3 className='flex items-center text-lg font-bold mb-2'>
                  <GiMeatCleaver className='mr-2 text-2xl' />
                  {product.title}
                </h3>
                <div className='flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9'></div>
                <p className='text-gray-500 mb-4 text-left'>
                  {product.description}
                </p>
              </div>
            </div>
            <div className='bg-white p-6 rounded-lg mt-6 custom-shadow'>
              <div>
                <h3 className='flex items-center text-lg font-bold mb-2 text-red-500'>
                  Current Stock: {product.inStock}
                </h3>
                <div className='flex justify-between items-center gap-4  mb-4 text-xl space-x-9'>
                  <p className='flex flex-row items-center mb-4 text-left'>
                    <FaDollarSign className='mr-2 text-1xl ' />
                    {product.price} / lbs
                  </p>
                  <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='md:ml-auto w-[50%]'>
            <ProductImages images={product.images} />
          </div>
        </div>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
        {/* <ProductMap product={product} /> */}
      </div>
    </main>
  );
};

export default ProductDetails;
