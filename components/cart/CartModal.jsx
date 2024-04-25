'use client';

import { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaShoppingCart } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import CartContainer from './CartContainer';
import {
  calculateSubtotal,
  calculateTaxesTotal,
  calculateGrandTotal,
} from '@/utils/cart';

const CartModal = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [taxRate, setTaxRate] = useState(0.1);
  const [taxesTotal, setTaxesTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const handleRemoveItem = async (itemId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this item?'
    );

    if (confirmed) {
      try {
        const response = await fetch('/api/cart', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ itemId }),
        });

        if (response.ok) {
          setCartItems(cartItems.filter((item) => item._id !== itemId));
        } else {
          throw new Error('Failed to remove item from cart');
        }
      } catch (error) {
        console.error('Error removing item:', error);
      }
    }
  };

  const handleQuantityChange = async (itemId, change) => {
    const updatedCartItems = [...cartItems];

    const index = updatedCartItems.findIndex((item) => item._id === itemId);

    if (index !== -1) {
      updatedCartItems[index].quantity += change;

      if (updatedCartItems[index].quantity <= 0) {
        handleRemoveItem(itemId);
        return;
      }

      try {
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
          setCartItems(updatedCartItems);
        }
      } catch (error) {
        console.error('Error updating cart item quantity:', error);
      }
    }
  };

  const fetchCartData = async () => {
    try {
      const response = await fetch('/api/cart');

      if (response.ok) {
        const data = await response.json();
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

  useEffect(() => {
    if (isOpen) {
      fetchCartData();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    setIsModalOpen(isOpen);
  }, [isOpen, handleQuantityChange]);

  const closeModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  return (
    isModalOpen && (
      <>
        <div className='fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-75 flex justify-center items-center z-30 '>
          <div className='bg-white p-8 rounded-lg relative w-[90%] md:[50%] h-[90%]'>
            <button
              className='absolute top-2 right-2 text-gray-600 hover:text-gray-800'
              onClick={closeModal}
            >
              <AiOutlineClose className='h-6 w-6' />
            </button>
            <div className='flex justify-center mt-4'>
              <div className='w-full'>
                <div className='flex flex-row justify-start items-center p-5 gap-3 text-gray-600'>
                  <FaShoppingCart className='text-2xl' />
                  <h1 className='text-2xl'>Cart</h1>
                </div>
                <CartContainer
                  cartItems={cartItems}
                  loading={loading}
                  handleRemoveItem={handleRemoveItem}
                  handleQuantityChange={handleQuantityChange}
                  subtotal={subtotal}
                  taxesTotal={taxesTotal}
                  grandTotal={grandTotal}
                  isInModal={true}
                  onClose={closeModal}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default CartModal;
