import Image from 'next/image';

const SponsorInfo = ({
  heading,
  backgroundColor = 'bg-gray-100',
  textColor = 'text-gray-800',
  buttonInfo,
  imageSrc,
  children,
}) => {
  return (
    <div
      className={`${backgroundColor} p-6 rounded-lg custom-shadow flex items-center justify-center flex-col sm:flex-row`}
    >
      <div className='flex-none mb-4 sm:mb-0 sm:mr-6'>
        <Image
          src={imageSrc}
          alt={heading}
          width={100}
          height={100}
          className='w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover'
        />
      </div>
      <div className='text-center sm:text-left'>
        <h2 className={`${textColor} text-2xl font-bold mb-2`}>{heading}</h2>
        <p className={`${textColor} mb-4`}>{children}</p>
        <a
          href={buttonInfo.link}
          className={`inline-block ${buttonInfo.backgroundColor} text-white rounded-lg px-4 py-2 hover:opacity-80`}
        >
          {buttonInfo.text}
        </a>
      </div>
    </div>
  );
};
export default SponsorInfo;
