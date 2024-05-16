import Link from 'next/link';
import ProductSearchForm from '../ProductSearchForm';

const MobileMenu = ({ closeMobileMenu, isAdmin, isLoggedIn, handleSignIn }) => {
  return (
    <div className='md:hidden' id='mobile-menu'>
      <div className='space-y-1 px-2 pb-3 pt-2'>
        <Link
          href='/'
          className='bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium'
          onClick={closeMobileMenu}
        >
          Home
        </Link>
        <Link
          href='/products'
          className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
          onClick={closeMobileMenu}
        >
          Products
        </Link>
        {isAdmin && (
          <Link
            href='/dashboard'
            className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
            onClick={closeMobileMenu}
          >
            Dashboard
          </Link>
        )}
        {!isLoggedIn && (
          <div className='flex flex-col gap-2'>
            <Link
              onClick={() => {
                handleSignIn();
                closeMobileMenu();
              }}
              href={'/login'}
              className='flex items-center justify-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
            >
              <i className='fa-brands fa-google text-white'></i>
              <span>Login</span>
            </Link>
            <Link
              onClick={() => {
                handleSignIn();
                closeMobileMenu();
              }}
              href={'/register'}
              className='flex items-center justify-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
            >
              <span>Register</span>
            </Link>
          </div>
        )}
        <ProductSearchForm />
      </div>
    </div>
  );
};

export default MobileMenu;
