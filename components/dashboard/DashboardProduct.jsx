'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Pagination from '../Pagination';
import Spinner from '../Spinner';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [totalItems, setTotalItems] = useState(0);

  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `/api/products?page=${page}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`
        );

        if (!res.ok) {
          throw new Error('Failed To Fetch Data');
        }

        const data = await res.json();
        setProducts(data.products);
        setTotalItems(data.total);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, pageSize, sortField, sortOrder, deleting]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const deleteProduct = async (id) => {
    console.log('Product ID:', id);

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?'
    );
    if (confirmDelete) {
      setDeleting(true);
      try {
        if (typeof id !== 'string' && typeof id !== 'number') {
          throw new Error('Invalid product ID');
        }

        const res = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(res);

        if (!res.ok) {
          throw new Error('Failed to delete product');
        }

        // Refresh products after deletion
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
        setProducts(updatedProducts);
      } catch (error) {
        console.error(error);
      } finally {
        setDeleting(false);
      }
    }
  };

  return (
    <div className='custom-shadow pb-4'>
      {loading || deleting ? (
        <Spinner />
      ) : (
        <>
          {products.length === 0 ? (
            <div className='flex items-center justify-center h-96'>
              <p className='text-gray-600 text-3xl'>No Products Found</p>
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer'
                    >
                      Image
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer'
                      onClick={() => handleSort('name')}
                    >
                      Name
                      {sortField === 'name' && (
                        <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                      )}
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer'
                      onClick={() => handleSort('price')}
                    >
                      Price
                      {sortField === 'price' && (
                        <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                      )}
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer'
                      onClick={() => handleSort('type')}
                    >
                      Type
                      {sortField === 'type' && (
                        <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                      )}
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <div className='flex-shrink-0 h-12 w-12'>
                            <Image
                              src={`/images/products/${product.images[0]}`}
                              alt={product.name}
                              width={48}
                              height={48}
                              className='w-12 h-12 rounded-full'
                            />
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {product.name}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {product.price}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {product.type}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <Link
                          href={`/product?id=${product.id}`}
                          className='text-blue-600 hover:text-blue-900 mr-4'
                        >
                          Edit
                        </Link>
                        <button
                          className='text-red-600 hover:text-red-900'
                          onClick={() => product && deleteProduct(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    //   <ListTable product={product} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
      <Pagination
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductsList;
