'use client';

import { useState, useEffect } from 'react';

const ProductAddForm = () => {
  const [mounted, setMounted] = useState(false);
  const [fields, setFields] = useState({
    type: '',
    category: '',
    name: '',
    description: '',
    highlight: '',
    location: {
      street: '',
      city: '',
      state: '',
      zipcode: '',
    },
    seller_info: {
      name: '',
      email: '',
      phone: '',
    },
    images: [],
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if nested property
    if (name.includes('.')) {
      const [outerKey, innerKey] = name.split('.');

      setFields((prevFields) => ({
        ...prevFields,
        [outerKey]: {
          ...prevFields[outerKey],
          [innerKey]: value,
        },
      }));
    } else {
      // Not nested property
      setFields((prevFields) => ({
        ...prevFields,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const { files } = e.target;

    // Clone images array
    const updatedImages = [...fields.images];

    // Add new files to the array
    for (const file of files) {
      updatedImages.push(file);
    }

    // Update state with array of images
    setFields((prevFields) => ({
      ...prevFields,
      images: updatedImages,
    }));
  };

  return (
    mounted && (
      <form action='/api/products' method='POST' encType='multipart/form-data'>
        <h2 className='text-3xl text-center font-semibold mb-6'>
          Add Property
        </h2>

        <div className='mb-4'>
          <label htmlFor='type' className='block text-gray-700 font-bold mb-2'>
            Property Type
          </label>
          <select
            id='category'
            name='category'
            className='border rounded w-full py-2 px-3'
            required
            value={fields.category}
            onChange={handleChange}
          >
            <option value='Beef'>Beef</option>
            <option value='Pork'>Pork</option>
            <option value='Chicken'>Chicken</option>
          </select>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 font-bold mb-2'>
            Product Name
          </label>
          <input
            type='text'
            id='type'
            name='type'
            className='border rounded w-full py-2 px-3 mb-2'
            placeholder='eg. Beautiful Apartment In Miami'
            required
            value={fields.type}
            onChange={handleChange}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='description'
            className='block text-gray-700 font-bold mb-2'
          >
            Business Description
          </label>
          <textarea
            id='description'
            name='description'
            className='border rounded w-full py-2 px-3'
            rows='4'
            placeholder='Add an optional description of your property'
            value={fields.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className='mb-4'>
          <label
            htmlFor='highlight'
            className='block text-gray-700 font-bold mb-2'
          >
            Highlight
          </label>
          <textarea
            id='highlight'
            name='highlight'
            className='border rounded w-full py-2 px-3'
            rows='4'
            placeholder='Add an optional highlight of your property'
            value={fields.highlight}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className='mb-4 bg-blue-50 p-4'>
          <label className='block text-gray-700 font-bold mb-2'>Location</label>
          <input
            type='text'
            id='street'
            name='location.street'
            className='border rounded w-full py-2 px-3 mb-2'
            placeholder='Street'
            value={fields.location.street}
            onChange={handleChange}
          />
          <input
            type='text'
            id='city'
            name='location.city'
            className='border rounded w-full py-2 px-3 mb-2'
            placeholder='City'
            required
            value={fields.location.city}
            onChange={handleChange}
          />
          <input
            type='text'
            id='state'
            name='location.state'
            className='border rounded w-full py-2 px-3 mb-2'
            placeholder='State'
            required
            value={fields.location.state}
            onChange={handleChange}
          />
          <input
            type='text'
            id='zipcode'
            name='location.zipcode'
            className='border rounded w-full py-2 px-3 mb-2'
            placeholder='Zipcode'
            value={fields.location.zipcode}
            onChange={handleChange}
          />
        </div>

        <div className='mb-4 flex flex-wrap'>
          <div className='w-full sm:w-1/3 pr-2'>
            <label
              htmlFor='price'
              className='block text-gray-700 font-bold mb-2'
            >
              Price
            </label>
            <input
              type='number'
              id='price'
              name='price'
              className='border rounded w-full py-2 px-3'
              required
              value={fields.price}
              onChange={handleChange}
            />
          </div>

          <div className='w-full sm:w-1/3 pl-2'>
            <label
              htmlFor='rating'
              className='block text-gray-700 font-bold mb-2'
            >
              Rating
            </label>
            <input
              type='number'
              id='rating'
              name='rating'
              className='border rounded w-full py-2 px-3'
              value={fields.rating}
              onChange={handleChange}
              min={0}
              max={5}
              required
            />
          </div>
        </div>

        <div className='mb-4'>
          <label
            htmlFor='seller_name'
            className='block text-gray-700 font-bold mb-2'
          >
            Seller Name
          </label>
          <input
            type='text'
            id='seller_name'
            name='seller_info.name'
            className='border rounded w-full py-2 px-3'
            placeholder='Name'
            value={fields.seller_info.name}
            onChange={handleChange}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='seller_email'
            className='block text-gray-700 font-bold mb-2'
          >
            Seller Email
          </label>
          <input
            type='email'
            id='seller_email'
            name='seller_info.email'
            className='border rounded w-full py-2 px-3'
            placeholder='Email address'
            required
            value={fields.seller_info.email}
            onChange={handleChange}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='seller_phone'
            className='block text-gray-700 font-bold mb-2'
          >
            Seller Phone
          </label>
          <input
            type='tel'
            id='seller_phone'
            name='seller_info.phone'
            className='border rounded w-full py-2 px-3'
            placeholder='Phone'
            value={fields.seller_info.phone}
            onChange={handleChange}
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='images'
            className='block text-gray-700 font-bold mb-2'
          >
            Images (Select up to 4 images)
          </label>
          <input
            type='file'
            id='images'
            name='images'
            className='border rounded w-full py-2 px-3'
            accept='image/*'
            multiple
            onChange={handleImageChange}
            required
          />
        </div>

        <div>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Add Product
          </button>
        </div>
      </form>
    )
  );
};

export default ProductAddForm;
