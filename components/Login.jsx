'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    // Logic for handling login goes here
    console.log('Logging in...');
  };

  const handleRegisterClick = () => {
    router.push('/register');
  };

  return (
    <form>
      <h2 className='text-3xl text-center font-semibold mb-6'>Login</h2>

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

      {/* <!-- Submit Button --> */}
      <div>
        <button
          className='bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
          type='submit'
        >
          Login
        </button>
      </div>
      <div className='text-center mt-3'>
        <p>
          Don't Have An Account?{' '}
          <Link href={'/auth/register'} className='underline text-cyan-600'>
            Register
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
