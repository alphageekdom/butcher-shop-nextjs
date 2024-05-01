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
      className={`rounded-lg custom-shadow overflow-hidden ${backgroundColor} flex flex-col lg:flex-row items-center justify-center`}
    >
      <div className='relative w-full h-full rounded-xl'>
        <Image
          src={imageSrc}
          alt={heading}
          width={500}
          height={500}
          sizes='100vw'
          className='object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl h-80 w-full md:w-72'
        />
      </div>
      <div className='p-6 lg:w-2/3'>
        <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>{heading}</h2>
        <p className={`${textColor} mb-6`}>{children}</p>
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
