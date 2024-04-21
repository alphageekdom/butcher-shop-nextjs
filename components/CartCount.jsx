import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const CartCount = () => {
  // State variable to keep track of the number of items in the cart
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // useEffect to update the cartItemsCount whenever the cart changes
  useEffect(
    () => {
      // Fetch and update the cartItemsCount from your cart data
      // Replace the following line with your actual logic to get the cart items count
      const fetchCartItemsCount = () => {
        // Example logic to fetch cart items count (replace this with your actual logic)
        const cartCount = getCartItemsCount(); // Function to get cart items count
        setCartItemsCount(cartCount);
      };

      fetchCartItemsCount(); // Call the function to fetch cart items count

      // You might want to clean up this effect if needed
    },
    [
      /* Add dependencies if needed */
    ]
  );

  // Assuming you have a function `getCartItemsCount` to fetch the cart items count
  const getCartItemsCount = () => {
    // Replace this with your actual logic to fetch cart items count
    return /* Logic to get cart items count */;
  };

  return (
    <div className='relative ml-2'>
      <a href='/cart' className='relative group'>
        <button
          type='button'
          className='relative rounded-full p-1 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
        >
          <span className='absolute -inset-1.5'></span>
          <span className='sr-only'>View notifications</span>
          <FaShoppingCart className='text-2xl' />
        </button>
        <span className='absolute bottom-2 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full'>
          {/* {cartItemsCount > 0 && (
            <span className='absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs'>
              {cartItemsCount}
            </span>
          )} */}
          1
        </span>
      </a>
    </div>
  );
};

export default CartCount;
