import { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const CartCount = () => {
  const [cartCount, updateCartCount] = useState(0);

  useEffect(() => {
    const fetchCartItemsCount = async () => {
      try {
        // Fetch cart data from the backend
        const response = await fetch('/api/cart');
        if (response.ok) {
          const cartData = await response.json();
          // Extract the number of items from the cart data
          const itemCount = cartData.items ? cartData.items.length : 0;
          updateCartCount(itemCount);
        } else {
          // Handle error response
          console.error('Failed to fetch cart data');
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    const intervalId = setInterval(fetchCartItemsCount, 3000);

    fetchCartItemsCount();
    return () => clearInterval(intervalId);
    // place updateCartCount in brackets below
  }, []);

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
        {cartCount > 0 && (
          <span className='absolute bottom-2 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full'>
            {cartCount}
          </span>
        )}
      </a>
    </div>
  );
};

export default CartCount;
