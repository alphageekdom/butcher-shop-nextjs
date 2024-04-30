'use client';

import { useState, useEffect } from 'react';
import {
  calculateSubtotal,
  calculateTaxesTotal,
  calculateGrandTotal,
} from '@/utils/cart';
import CartContainer from './CartContainer';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [taxRate, setTaxRate] = useState(0.1);
  const [taxesTotal, setTaxesTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const fetchCartData = async () => {
    try {
      const response = await fetch('/api/cart');

      if (response.ok) {
        const data = await response.json();

        setCartItems(data.items || []);
      } else {
        throw new Error('Failed to fetch cart data');
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
      toast.error('Failed to fetch cart data');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this item?'
    );

    if (!confirmed) return;

    try {
      const res = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }),
      });

      if (res.ok) {
        setCartItems(cartItems.filter((item) => item._id !== itemId));
        toast.success('Item removed from cart');
      } else {
        throw new Error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  const handleQuantityChange = async (itemId, change) => {
    const updatedCartItems = [...cartItems];

    const index = updatedCartItems.findIndex((item) => item._id === itemId);

    if (index === -1) return;

    updatedCartItems[index].quantity += change;

    if (updatedCartItems[index].quantity <= 0) {
      handleRemoveItem(itemId); // Remove item if quantity becomes zero
      return;
    }

    try {
      // Update cart items in the database
      const res = await fetch('/api/cart', {
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

      if (!res.ok) throw new Error('Failed to update cart item quantity');

      // Update cart items in the local state
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      toast.error('Failed to update cart item quantity');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';

    router.push('/');
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {
    const subtotal = calculateSubtotal(cartItems);
    const taxesTotal = calculateTaxesTotal(subtotal, taxRate);
    const grandTotal = calculateGrandTotal(subtotal, taxesTotal);
    setSubtotal(subtotal);
  }, [cartItems, taxRate]);

  return (
    <CartContainer
      cartItems={cartItems}
      loading={loading}
      handleRemoveItem={handleRemoveItem}
      handleQuantityChange={handleQuantityChange}
      subtotal={subtotal}
      taxesTotal={calculateTaxesTotal(subtotal, taxRate)}
      grandTotal={calculateGrandTotal(subtotal, taxesTotal)}
      onClose={closeModal}
    />
  );
};

export default Cart;
