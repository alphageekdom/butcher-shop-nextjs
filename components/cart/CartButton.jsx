'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import CartCount from './CartCount';
import CartModal from './CartModal';

const CartButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasItemsInCart, setHasItemsInCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const isLoggedIn = session && session.user;
  const router = useRouter();

  const handleCartClick = () => {
    if (hasItemsInCart) {
      openModal();
    } else {
      router.push('/cart');
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchCartData = async () => {
    setLoading(true);
    try {
      if (!isLoggedIn) return;

      const response = await fetch('/api/cart');

      if (response.ok) {
        const data = await response.json();
        const cartItemsData = data.items || [];

        setHasItemsInCart(cartItemsData.length > 0);
      } else if (response.status === 401) {
        console.error('Unauthorized access to fetch cart data');
        setHasItemsInCart(false);
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
  }, [isLoggedIn]);

  return (
    <>
      <CartCount onClick={handleCartClick} />
      {isModalOpen && <CartModal isOpen={isModalOpen} onClose={closeModal} />}
    </>
  );
};

export default CartButton;
