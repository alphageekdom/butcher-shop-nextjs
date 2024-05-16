import Link from 'next/link';

const AuthLinks = ({ handleSignIn }) => {
  return (
    <div className='hidden md:block md:ml-6'>
      <div className='flex items-center gap-4'>
        <Link
          href='/login'
          className='text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
          onClick={handleSignIn}
        >
          Login
        </Link>
        <Link
          href='/register'
          className='text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
          onClick={handleSignIn}
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default AuthLinks;
