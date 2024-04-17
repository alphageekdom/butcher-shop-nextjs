import { FaMapMarker, FaStar } from 'react-icons/fa';
import { IoMdBusiness } from 'react-icons/io';
import { GiMeatCleaver } from 'react-icons/gi';
import ProductImages from './ProductImages';

const ProductDetails = ({ product }) => {
  return (
    <main>
      <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
        <div className='text-gray-500 mb-4'>{product.type}</div>
        <div className='text-3xl font-bold mb-4 flex justify-between'>
          <span>{product.name}</span>
          <span className='flex items-center'>
            <FaStar className='ml-1 text-yellow-500' />
            {product.rating}
          </span>
        </div>
        <div className='flex items-center mb-2 md:mb-0'>
          <FaMapMarker className='text-lg text-sky-700 mr-2' />
          <p className='text-sky-700'>
            {product.location.street} {product.location.city},{' '}
            {product.location.state} {product.location.zipcode}
          </p>
        </div>
        <div className='flex flex-col md:flex-row mb-4'>
          <div className='w-1/2'>
            <div className='bg-white p-6 rounded-lg shadow-md mt-6 custom-shadow'>
              <div>
                <h3 className='flex items-center text-lg font-bold mb-2'>
                  <GiMeatCleaver className='mr-2 text-2xl ' />
                  Highlight Cut
                </h3>
                <div className='flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9'></div>
                <p className=' text-gray-500 mb-4 text-left'>
                  {product.highlight}
                </p>
              </div>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-md mt-6 custom-shadow'>
              <div>
                <h3 className='flex items-center text-lg font-bold mb-2'>
                  <IoMdBusiness className='mr-2 text-2xl' />
                  Business Description & Details
                </h3>
                <div className='flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9'></div>
                <p className='text-gray-500 mb-4 text-left'>
                  {product.description}
                </p>
              </div>
            </div>
          </div>
          <div className='md:ml-auto w-[50%]'>
            <ProductImages images={product.images} />
          </div>
        </div>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
        {/* <ProductMap product={product} /> */}
      </div>
    </main>
  );
};

export default ProductDetails;
