'use client';

import { useState, useEffect } from 'react';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import {
  calculateSubtotal,
  calculateTaxesTotal,
  calculateGrandTotal,
} from '@/utils/cart';
import Spinner from './Spinner';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [taxRate, setTaxRate] = useState(0.1);
  const [taxesTotal, setTaxesTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch('/api/cart');

        if (response.ok) {
          const data = await response.json();

          // console.log(data.items);

          // Assuming `orderItems` is an array within the data object
          const cartItemsData = data.items || [];
          setCartItems(cartItemsData);

          const subtotal = calculateSubtotal(cartItemsData);
          const taxesTotal = calculateTaxesTotal(subtotal, taxRate);
          const grandTotal = calculateGrandTotal(subtotal, taxesTotal);

          setSubtotal(subtotal);
          setTaxesTotal(taxesTotal);
          setGrandTotal(grandTotal);
        } else {
          throw new Error('Failed to fetch cart data');
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }),
      });

      if (response.ok) {
        // Remove item from local state after successful removal from database
        setCartItems(cartItems.filter((item) => item._id !== itemId));
      } else {
        throw new Error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleQuantityChange = async (itemId, change) => {
    const updatedCartItems = [...cartItems];

    const index = updatedCartItems.findIndex((item) => item._id === itemId);

    if (index !== -1) {
      updatedCartItems[index].quantity += change;

      if (updatedCartItems[index].quantity <= 0) {
        handleRemoveItem(itemId); // Remove item if quantity becomes zero
        return;
      }

      try {
        // Update cart items in the database
        const response = await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: cartItems[index].product?._id,
            itemId,
            quantity: updatedCartItems[index].quantity,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update cart item quantity');
        } else {
          // Update cart items in the local state
          setCartItems(updatedCartItems);
        }
      } catch (error) {
        console.error('Error updating cart item quantity:', error);
      }
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 px-5 bg-white'>
      <div className='md:col-span-2'>
        <ul className='divide-y divide-gray-200'>
          {cartItems.map((item, index) => (
            <li key={index} className='py-4 flex'>
              <div className='flex-shrink-0 w-24 h-24'>
                <img
                  src={`/images/products/${item['product']['images'][0]}`}
                  alt={item['product']['name']}
                  className='object-contain w-full h-full'
                />
              </div>
              <div className='flex-1 ml-4'>
                <h2 className='text-lg font-semibold'>
                  {item['product']['name']}
                </h2>
                <p className='text-gray-600'>${item['product']['price']}</p>
                <div className='flex flex-items mt-2'>
                  <button
                    type='button'
                    className='text-gray-500 focus:outline-none'
                    onClick={() => handleQuantityChange(item._id, -1)} // Decrement quantity
                  >
                    <FaMinus />
                  </button>
                  <span className='mx-2'>{item.quantity}</span>
                  <button
                    type='button'
                    className='text-gray-500 focus:outline-none'
                    onClick={() => handleQuantityChange(item._id, 1)} // Increment quantity
                  >
                    <FaPlus />
                  </button>
                </div>
                <button
                  type='button'
                  className='mt-2 text-red-500 focus:outline-none hover:text-red-700'
                  onClick={() => handleRemoveItem(item._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className='bg-white p-4 rounded-lg'>
          <h2 className='text-xl font-semibold'>Subtotal</h2>
          <p className='text-gray-600'>${subtotal.toFixed(2)}</p>
          <h2 className='text-xl font-semibold'>Taxes</h2>
          <p className='text-gray-600'>${taxesTotal.toFixed(2)}</p>
          <h2 className='text-xl font-semibold'>Grand Total</h2>
          <p className='text-gray-600'>${grandTotal.toFixed(2)}</p>
          <button
            type='button'
            className='w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
