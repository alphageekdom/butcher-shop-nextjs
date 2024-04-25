import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
// import Spinner from '../Spinner';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Spinner from '../Spinner';

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
  const router = useRouter();

  const redirectToCart = () => {
    router.push('/cart');
    onClose();
  };

  const redirectToCheckout = () => {
    router.push('/checkout');
    onClose();
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-5 bg-white'>
      <div className='md:col-span-2 flex items-center justify-center'>
        <ul className='divide-y divide-gray-200'>
          {cartItems.length === 0 ? (
            <h1 className='text-6xl text-gray-300'>Cart is Empty</h1>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className='py-4 grid grid-cols-5 justify-items-start items-center'
                >
                  <div className='flex-shrink-0 w-24 h-24 mr-4'>
                    <Image
                      src={`/images/products/${item['product']['images'][0]}`}
                      alt={item['product']['name']}
                      className='object-cover w-24 h-24 rounded-full'
                      width={300}
                      height={300}
                    />
                  </div>
                  <div className='flex flex-row justify-between mx-4 '>
                    <h2 className='text-lg text-left font-semibold '>
                      {item['product']['name']}
                    </h2>
                  </div>
                  <div className='mx-8'>
                    <p className='text-gray-600'>${item['product']['price']}</p>
                  </div>
                  <div className='flex items-center pt-2 px-8'>
                    <button
                      type='button'
                      className='text-gray-500 focus:outline-none'
                      onClick={() => handleQuantityChange(item._id, -1)} // Decrement quantity
                    >
                      <FaMinus />
                    </button>
                    <span className='mx-8'>{item.quantity}</span>
                    <button
                      type='button'
                      className='text-gray-500 focus:outline-none z-10'
                      onClick={() => handleQuantityChange(item._id, 1)} // Increment quantity
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <div>
                    <button
                      type='button'
                      className='mt-2 text-red-500 focus:outline-none hover:text-red-700 mx-20'
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>

      <div>
        <div className='border-t border-gray-500 my-4 lg:border-none'></div>
        <div className='bg-white p-4 rounded-lg'>
          <h2 className='text-xl font-semibold'>Subtotal</h2>

          <p className='text-gray-600'>${subtotal.toFixed(2)}</p>
          <h2 className='text-xl font-semibold'>Taxes</h2>

          <p className='text-gray-600'>${taxesTotal.toFixed(2)}</p>
          <h2 className='text-xl font-semibold'>Grand Total</h2>
          <p className='text-gray-600'>${grandTotal.toFixed(2)}</p>
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
