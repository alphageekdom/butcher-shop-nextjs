'use client';

import React from 'react';
import Link from 'next/link';

const Register = () => {
  return (
    <form>
      <h2 className='text-3xl text-center font-semibold mb-6'>
        Create An Account
      </h2>

      {/* <!-- Name --> */}
      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>Name</label>
        <input
          type='text'
          id='name'
          name='name'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='Full name'
          required
        />
      </div>

      {/* <!-- Email --> */}
      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='Email address'
          required
        />
      </div>

      {/* <!-- Password --> */}
      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='Password'
          required
        />
      </div>

      {/* <!-- Password --> */}
      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>
          Confirm Password
        </label>
        <input
          type='password'
          id='password2'
          name='password2'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='Confirm Password'
          required
        />
      </div>

      {/* <!-- Submit Button --> */}
      <div>
        <button
          className='bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
          type='submit'
        >
          Register
        </button>
      </div>
      <div className='text-center mt-3'>
        <p>
          Do You Have An Account?{' '}
          <Link href={'/auth/login'} className='underline text-cyan-600'>
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
