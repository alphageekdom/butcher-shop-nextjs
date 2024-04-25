'use client';

import { useState, useEffect } from 'react';
import {
  calculateSubtotal,
  calculateTaxesTotal,
  calculateGrandTotal,
} from '@/utils/cart';
import CartContainer from './CartContainer';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [taxRate, setTaxRate] = useState(0.1);
  const [taxesTotal, setTaxesTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [loading, setLoading] = useState(true);

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
          // Remove item from local state after successful removal from database
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

  useEffect(() => {
    fetchCartData();
    const interval = setInterval(fetchCartData, 60000);
    return () => clearInterval(interval);
  }, [handleQuantityChange]);

  return (
    <CartContainer
      cartItems={cartItems}
      loading={loading}
      handleRemoveItem={handleRemoveItem}
      handleQuantityChange={handleQuantityChange}
      subtotal={subtotal}
      taxesTotal={taxesTotal}
      grandTotal={grandTotal}
    />
  );
};

export default Cart;
