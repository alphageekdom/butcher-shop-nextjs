import Image from 'next/image';
import Link from 'next/link';

const ReviewCard = ({ name, date, review, imageSrc, favoriteMeatCut }) => {
  return (
    <div className='relative flex flex-col md:flex-row rounded-xl cursor-pointer bg-white custom-shadow'>
      <div className='relative w-full h-full rounded-xl'>
        <Image
          src={imageSrc}
          alt={name}
          width={300}
          height={300}
          sizes='100vw'
          className='object-cover  rounded-t-xl md:rounded-tr-none md:rounded-l-xl h-72 md:h-full w-full md:w-72'
        />
      </div>
      <div className='p-4 w-full'>
        <p className='font-semibold text-lg text-black'>{name}</p>
        <p className='text-sm text-gray-600'>{date}</p>
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
    </div>
  );
};

export default ReviewCard;
