'use client';

import React, { useState } from 'react';
import { FaMapMarker, FaStar } from 'react-icons/fa';
import { IoMdBusiness } from 'react-icons/io';
import { GiMeatCleaver } from 'react-icons/gi';
// Import any additional components or utilities you need

const Dashboard = () => {
  // Sample data for demonstration
  const [users] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
  ]);

  const [products] = useState([
    { id: 1, name: 'Product 1', inStock: true },
    { id: 2, name: 'Product 2', inStock: false },
    { id: 3, name: 'Product 3', inStock: true },
  ]);

  const deleteUser = (userId) => {
    // Implement deletion logic here
    console.log(`Deleting user with ID ${userId}`);
  };

  const addProduct = () => {
    // Implement adding product logic here
    console.log('Adding new product');
  };

  return (
    <div className='p-4'>
      {/* Product Details */}
      <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left mt-6'>
        <div className='text-gray-500 mb-4'>Product Type</div>
        <div className='text-3xl font-bold mb-4 flex justify-between'>
          <span>Product Name</span>
          <span className='flex items-center'>
            <FaStar className='ml-1 text-yellow-500' />
            Product Rating
          </span>
        </div>
        <div className='flex items-center mb-2 md:mb-0'>
          <FaMapMarker className='text-lg text-sky-700 mr-2' />
          <p className='text-sky-700'>
            Location Street, Location City, Location State Location Zipcode
          </p>
        </div>
        <div className='flex flex-col md:flex-row mb-4'>
          <div className='w-1/2'>
            <div className='bg-white p-6 rounded-lg shadow-md mt-6 custom-shadow'>
              <div>
                <h3 className='flex items-center text-lg font-bold mb-2'>
                  <GiMeatCleaver className='mr-2 text-2xl ' />
                  Highlight Cut
                </h3>
                <div className='flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9'></div>
                <p className=' text-gray-500 mb-4 text-left'>
                  Product Highlight
                </p>
              </div>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-md mt-6 custom-shadow'>
              <div>
                <h3 className='flex items-center text-lg font-bold mb-2'>
                  <IoMdBusiness className='mr-2 text-2xl' />
                  Business Description & Details
                </h3>
                <div className='flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9'></div>
                <p className='text-gray-500 mb-4 text-left'>
                  Product Description
                </p>
              </div>
            </div>
          </div>
          <div className='md:ml-auto w-[50%]'>
            {/* ProductImages component goes here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
