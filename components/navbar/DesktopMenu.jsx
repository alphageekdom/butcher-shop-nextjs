import Link from 'next/link';

const DesktopMenu = ({ isAdmin }) => {
  return (
    <div className='hidden md:ml-6 md:block'>
      <div className='flex space-x-2'>
        <Link
          href='/'
          className='text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
        >
          Home
        </Link>
        <Link
          href='/products'
          className='text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
        >
          Products
        </Link>
        {isAdmin && (
          <Link
            href='/dashboard'
            className='text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
          >
            Dashboard
          </Link>
        )}
      </div>
    </div>
  );
};

export default DesktopMenu;
