'use client';

import { useState, useEffect } from 'react';
import { GiSteak } from 'react-icons/gi';

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

import profileDefault from '@/public/images/user-default.png';
import { signIn, signOut, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import CartCount from './cart/CartCount';
import CartModal from './cart/CartModal';
import ProductSearchForm from './ProductSearchForm';

const Navbar = () => {
  const { data: session } = useSession();

  const isAdmin = session?.user?.isAdmin;

  const profileImage = session?.user?.image;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [hasItemsInCart, setHasItemsInCart] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const handleSignIn = async () => {
    if (!session || !session.user) {
      router.replace('/');
      return;
    }
    try {
      const res = await signIn('credentials', {
        email: session.user.email,
        password,
        redirect: false,
      });

      if (res.error) {
        toast.error('Invalid Credentials');
        return;
      }

      router.replace('/');
    } catch (error) {
      console.log(error);
      toast.error('Something Went Wrong');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      toast.success('Signed Out Successfully');
      router.replace('/');
    } catch (error) {
      console.error(error);
      toast.error('Failed To Sign Out');
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const fetchCartData = async () => {
    if (!session || !session.user) {
      return;
    }
    try {
      const response = await fetch('/api/cart');

      if (response.ok) {
        const data = await response.json();
        const cartItemsData = data.items || [];

        setHasItemsInCart(cartItemsData.length > 0);
      } else if (response.status === 401) {
        console.error('Unauthorized access to fetch cart data');
        // Set hasItemsInCart to false
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

  const openModal = (e) => {
    e.preventDefault();
    if (hasItemsInCart) {
      setIsModalOpen(true);
    } else {
      router.push('/cart');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    fetchCartData();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [fetchCartData]);

  const isCartPage = pathname === '/cart';
  const isCheckoutPage = pathname === '/checkout';

  return (
    <nav className='bg-red-700 custom-shadow'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-20 items-center justify-between'>
          <div className='absolute inset-y-0 left-0 flex items-center md:hidden'>
            {/* <!-- Mobile menu button--> */}
            <button
              type='button'
              id='mobile-dropdown-button'
              className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              aria-controls='mobile-menu'
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <span className='absolute -inset-0.5'></span>
              <span className='sr-only'>Open main menu</span>
              <svg
                className='block h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                />
              </svg>
            </button>
          </div>

          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            {/* <!-- Desktop Menu Hidden below md screens --> */}
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
            {/* <!-- Logo --> */}
            <div className='flex justify-center items-center flex-1'>
              <a className='flex flex-shrink-0 items-center' href='/'>
                <GiSteak className='text-5xl text-white' />
                <span className='hidden md:block text-white text-2xl font-bold ml-2'>
                  EliteCuts
                </span>
              </a>
            </div>
          </div>

          {/* <!-- Right Side Menu (Logged Out) --> */}
          <div className='hidden md:block md:ml-6'>
            {!session && (
              <div className='flex items-center gap-4'>
                <Link
                  onClick={handleSignIn}
                  href={'/login'}
                  className='flex items-center justify-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
                >
                  <i className='fa-brands fa-google text-white'></i>
                  <span>Login</span>
                </Link>
                <Link
                  onClick={handleSignIn}
                  href={'/register'}
                  className='flex items-center justify-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
                >
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>

          {/* <!-- Right Side Menu (Logged In) --> */}
          {session && (
            <div className='absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0'>
              {/* <!-- Profile dropdown button --> */}
              <div className='relative ml-3'>
                <div>
                  <button
                    type='button'
                    className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 '
                    id='user-menu-button'
                    aria-expanded='false'
                    aria-haspopup='true'
                    onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                  >
                    <span className='absolute -inset-1.5'></span>
                    <span className='sr-only'>Open user menu</span>
                    <Image
                      className='h-8 w-8 rounded-full'
                      src={profileImage || profileDefault}
                      alt=''
                      width={40}
                      height={40}
                      priority={true}
                    />
                  </button>
                </div>
                {/* <!-- Profile dropdown --> */}

                {isProfileMenuOpen && (
                  <div
                    id='user-menu'
                    className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='user-menu-button'
                    tabIndex='-1'
                  >
                    <Link
                      href='/profile'
                      className='block px-4 py-2 text-sm text-gray-700'
                      role='menuitem'
                      tabIndex='-1'
                      id='user-menu-item-0'
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                      }}
                    >
                      Your Profile
                    </Link>
                    <Link
                      href='saved-properties.html'
                      className='block px-4 py-2 text-sm text-gray-700'
                      role='menuitem'
                      tabIndex='-1'
                      id='user-menu-item-2'
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                      }}
                    >
                      Saved Cuts
                    </Link>
                    <Link
                      href='#'
                      className='block px-4 py-2 text-sm text-gray-700'
                      role='menuitem'
                      tabIndex='-1'
                      id='user-menu-item-2'
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        handleSignOut();
                      }}
                    >
                      Sign Out
                    </Link>
                  </div>
                )}
              </div>

              <div
                className='flex items-center text-white cursor-pointer'
                onClick={openModal}
              >
                <CartCount className='flex items-center text-white' />
              </div>

              {/* Render the CartModal only if not on the cart page and modal is open */}
              {!isCartPage && !isCheckoutPage && isModalOpen && (
                <CartModal isOpen={isModalOpen} onClose={closeModal} />
              )}
            </div>
          )}
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      {isMobileMenuOpen && (
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
            <button className='flex items-center text-white hover:text-white rounded-md px-3 py-2 my-4 gap-4'>
              {!session && (
                <>
                  {' '}
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
                </>
              )}
            </button>
            <ProductSearchForm />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
