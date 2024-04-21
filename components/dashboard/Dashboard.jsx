'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Spinner from '@/components/Spinner';
import Link from 'next/link';

const Dashboard = () => {
  const { data: session, status } = useSession();

  const [productsCount, setProductsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (status === 'authenticated' && session?.user?.isAdmin) {
        try {
          const res = await fetch(`/api/dashboard`);
          if (!res.ok) {
            throw new Error('Failed To Fetch Data');
          }
          const data = await res.json();
          setProductsCount(data.products);
          setUsersCount(data.users);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      } else if (status === 'loading') {
      } else {
        router.push('/login');
      }
    };

    fetchData();
  }, [session, status, router]);

  return loading ? (
    <Spinner />
  ) : (
    <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left mt-6'>
      <div className='text-3xl font-bold mb-4 flex justify-between'>
        <span className='flex items-center'>Current Stats</span>
      </div>
      <div className='mb-4 flex flex-col md:flex-row justify-between'>
        {/* Left Card */}
        <div className='md:w-[45%] w-full p-1'>
          <div className='bg-white p-6 rounded-lg shadow-md mt-6 custom-shadow'>
            <div>
              <div className='flex flex-col gap-4 mb-4 text-lg space-x-9'>
                <div className='flex gap-2'>
                  <p className='text-left'>Products:</p>
                  <p className='text-gray-500'>{productsCount}</p>
                </div>
                <div className='flex flex-col md:flex-row gap-2 '>
                  <Link
                    href={'/products/list'}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  >
                    Edit Products
                  </Link>
                  <Link
                    href={'/products/add'}
                    className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4'
                  >
                    Add Product
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right Card */}
        <div className='md:w-[45%] w-full p-1'>
          <div className='bg-white p-6 rounded-lg shadow-md mt-6 custom-shadow'>
            <div>
              <div className='flex justify-between gap-4  mb-4 text-lg space-x-9'>
                <div className='flex gap-2'>
                  <p className='text-left'>Users:</p>
                  <p className='text-gray-500'>{usersCount}</p>
                </div>
                <Link
                  href={'/users'}
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >
                  Edit Users
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
