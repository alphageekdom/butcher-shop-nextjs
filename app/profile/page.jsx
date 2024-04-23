'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import profileDefault from '@/assets/images/user-default.png';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserBookmarks = async () => {
      if (!session?.user?.id) {
        return;
      }

      try {
        const res = await fetch(`api/bookmarks`);

        if (res.status === 200) {
          const data = await res.json();
          setBookmarks(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch user properties when session is available
    fetchUserBookmarks();
  }, [session]);

  const handleDeleteBookmark = async (productId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this bookmark?'
    );

    if (!confirmed) {
      return;
    }

    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      if (res.status === 200) {
        // Refetch bookmarks after successful deletion
        setBookmarks(
          bookmarks.filter((bookmark) => bookmark._id !== productId)
        );
        toast.success('Bookmark Removed');
      } else {
        toast.error('Failed To Remove Bookmark');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed To Remove Bookmark');
    }
  };

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Profile</h1>
          <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/4 mx-20 mt-10'>
              <div className='mb-4'>
                <Image
                  className='h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0'
                  src={profileImage || profileDefault}
                  width={200}
                  height={200}
                  alt='User'
                />
              </div>
              <h2 className='text-2xl mb-4'>
                <span className='font-bold block'>Name: </span> {profileName}
              </h2>
              <h2 className='text-2xl'>
                <span className='font-bold block'>Email: </span> {profileEmail}
              </h2>
            </div>

            <div className='md:w-3/4 md:pl-4'>
              <h2 className='text-xl font-semibold mb-4'>Your Listings</h2>
              {!loading && bookmarks.length === 0 && (
                <p>You Have No Bookmarks</p>
              )}

              {loading ? (
                <Spinner loading={loading} />
              ) : (
                bookmarks.map((bookmark) => (
                  <div key={bookmark?._id} className='mb-10'>
                    <Link href={`/products/${bookmark._id}`}>
                      <Image
                        className='h-32 w-full rounded-md object-cover'
                        src={`/images/products/${bookmark?.images[0]}`}
                        alt=''
                        width={500}
                        height={100}
                        priority={true}
                      />
                    </Link>
                    <div className='mt-2'>
                      <p className='text-lg font-semibold'>{bookmark.name}</p>
                    </div>
                    <div className='mt-2'>
                      <button
                        className='bg-red-500 text-white px-4 py-2 rounded-md'
                        onClick={() => handleDeleteBookmark(bookmark._id)}
                      >
                        Unbookmark
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
