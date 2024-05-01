import Image from 'next/image';
import Link from 'next/link';

const ReviewCard = ({ name, date, review, imageSrc, favoriteMeatCut }) => {
  return (
    <div className='relative rounded-lg custom-shadow p-6 bg-gray-100'>
      <div className='flex items-center mb-4'>
        <div className='w-20 h-20 mr-4 overflow-hidden rounded-full'>
          <Image
            src={imageSrc}
            alt={name}
            width={100}
            height={100}
            className='object-cover'
          />
        </div>
        <div>
          <p className='font-semibold text-lg text-black'>{name}</p>
          <p className='text-sm text-gray-600'>{date}</p>
        </div>
      </div>
      <p className='mb-4 text-lg text-black'>{review}</p>
      <div className='flex justify-between'>
        <p className='text-sm text-gray-600'>Customer</p>
        <Link
          href={favoriteMeatCut}
          className='h-[36px] w-30 bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-center text-sm z-20'
        >
          Favorite
        </Link>
      </div>
    </div>
  );
};

export default ReviewCard;
