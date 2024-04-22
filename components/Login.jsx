'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useSession, signIn } from 'next-auth/react';

const Login = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      router.replace('/'); // Redirect to home if already logged in
    }
  }, [session, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
        isAdmin: formData.isAdmin,
      });

      setLoading(false);

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success('Login Successful');
      }
    } catch (error) {
      console.log('Error during login:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
          value={formData.email}
          onChange={handleChange}
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
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      {/* <!-- Submit Button --> */}
      <div>
        <button
          className='bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
          type='submit'
          disabled={loading}
        >
          Login
        </button>
      </div>
      <div className='text-center mt-3'>
        <p>
          Don't Have An Account?{' '}
          <Link href={'/register'} className='underline text-cyan-600'>
            Register
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
