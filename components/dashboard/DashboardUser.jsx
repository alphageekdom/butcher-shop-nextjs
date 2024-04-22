'use client';

import { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Pagination from '../Pagination';
import Spinner from '../Spinner';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalItems, setTotalItems] = useState(0);

  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `/api/users?page=${page}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`
        );

        if (!res.ok) {
          throw new Error('Failed To Fetch Data');
        }

        const data = await res.json();
        setUsers(data.users);
        setTotalItems(data.total);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, pageSize, sortField, sortOrder]);

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

  return loading ? (
    <Spinner />
  ) : (
    <div className='custom-shadow pb-4 bg-white'>
      {users.length === 0 ? (
        <p>No Users Found</p>
      ) : (
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
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
                  onClick={() => handleSort('email')}
                >
                  Email
                  {sortField === 'email' && (
                    <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                  )}
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer'
                  onClick={() => handleSort('isAdmin')}
                >
                  Admin
                  {sortField === 'isAdmin' && (
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
              {users.map((user) => (
                <tr key={user._id}>
                  <td className='px-6 py-4 whitespace-nowrap'>{user.name}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{user.email}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {user.isAdmin ? (
                      <FaCheck className='text-green-500' />
                    ) : (
                      <FaTimes className='text-red-500' />
                    )}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <Link
                      href={`/product?id=${user.id}`}
                      className='text-blue-600 hover:text-blue-900 mr-4'
                    >
                      Edit
                    </Link>
                    <button
                      className='text-red-600 hover:text-red-900'
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

export default UsersList;
