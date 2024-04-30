import { useRouter } from 'next/navigation';
import Spinner from '../Spinner';
import { useState, useEffect } from 'react';
import CartItem from './CartItem';

const CartContainer = ({
  cartItems,
  handleRemoveItem,
  handleQuantityChange,
  subtotal,
  taxesTotal,
  grandTotal,
  isInModal,
  loading,
  onClose,
}) => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 640);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const router = useRouter();

  const redirectToCart = () => {
    router.push('/cart');
    if (isInModal) {
      onClose();
    }
  };

  const redirectToCheckout = () => {
    router.push('/checkout');
    if (isInModal) {
      onClose();
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-5 bg-white'>
      <div className='md:col-span-2 flex items-center justify-center'>
        <ul
          className='divide-y divide-gray-200 w-full'
          style={
            isMobileView
              ? { maxHeight: '200px', overflowY: 'auto' }
              : { maxHeight: '500px', overflowY: 'auto' }
          }
        >
          {cartItems.length === 0 ? (
            <h1 className='text-6xl text-gray-300'>Cart is Empty</h1>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <CartItem
                  key={index}
                  item={item}
                  handleQuantityChange={handleQuantityChange}
                  handleRemoveItem={handleRemoveItem}
                />
              ))}
            </>
          )}
        </ul>
      </div>

      <div>
        <div className='border-t border-gray-500 my-4 lg:border-none'></div>
        <div
          className='bg-white p-4 rounded-lg text-right'
          style={{ maxHeight: '350px', overflowY: 'auto' }}
        >
          <div className='flex justify-between'>
            <h2 className='text-xl font-semibold'>Subtotal:</h2>
            <p className='text-gray-600'>${subtotal.toFixed(2)}</p>
          </div>
          <div className='flex justify-between'>
            <h2 className='text-xl font-semibold'>Taxes:</h2>
            <p className='text-gray-600'>${taxesTotal.toFixed(2)}</p>
          </div>
          <div className='flex justify-between'>
            <h2 className='text-xl font-semibold'>Grand Total</h2>
            <p className='text-gray-600'>${grandTotal.toFixed(2)}</p>
          </div>
          <button
            type='button'
            className={`w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
              subtotal === 0 && taxesTotal === 0 && grandTotal === 0
                ? 'bg-gray-300 cursor-not-allowed pointer-events-none'
                : 'hover:bg-gray-500'
            }`}
            disabled={subtotal === 0 && taxesTotal === 0 && grandTotal === 0}
            onClick={redirectToCheckout}
          >
            Go To Checkout
          </button>
          {isInModal && (
            <button
              type='button'
              className='w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gray-500 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              onClick={redirectToCart}
            >
              Go To Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartContainer;
