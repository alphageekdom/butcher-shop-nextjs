'use client';

import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  console.log(cartItems);

  useEffect(() => {
    // Fetch cart data from backend API
    const fetchCartData = async () => {
      try {
        const response = await fetch('/api/cart/add'); // Assuming you have an API endpoint to get the cart data
        if (response.ok) {
          const data = await response.json();
          setCartItems(data.items); // Assuming the cart data has a property 'items' containing the list of cart items
        } else {
          throw new Error('Failed to fetch cart data');
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, []);

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 px-5 custom-shadow'>
      <div className='md:col-span-2'>
        <ul className='divide-y divide-gray-200'>
          <li className='py-4 flex'>
            <div className='flex-shrink-0 w-24 h-24'>
              <img
                src='https://images.unsplash.com/photo-1588347818036-558601350947?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt='Steak'
                className='object-contain w-full h-full'
              />
            </div>
            <div className='flex-1 ml-4'>
              <h2 className='text-lg font-semibold'>Name</h2>
              <p className='text-gray-600'>$Price</p>
              <select className='block w-1/2 py-1 px-2 mt-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'></select>
              <button
                type='button'
                className='mt-2 text-red-500 focus:outline-none hover:text-red-700'
              >
                <FaTrash />
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <div className='bg-white p-4 rounded-lg'>
          <h2 className='text-xl font-semibold'>Subtotal</h2>
          <p className='text-gray-600'>$</p>
          <button
            type='button'
            className='w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
