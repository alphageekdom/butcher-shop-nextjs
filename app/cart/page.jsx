import React from 'react';
import BackButton from '@/components/uielements/BackButton';
import Cart from '@/components/Cart';

const CartPage = () => {
  return (
    <>
      <BackButton href={'/dashboard'} />
      <section className='bg-blue-50'>
        <div className='container m-auto py-10 px-6'>
          <h1 className='text-5xl font-bold'>Cart</h1>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6 mt-9'>
            <Cart />
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPage;
