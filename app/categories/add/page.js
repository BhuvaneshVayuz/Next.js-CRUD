"use client";

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { createCategory } from '@/lib/store/actions/categoriesActions';

export default function AddCategory() {
  const dispatch = useDispatch();

  // Get loading and error states from Redux
  const { loading, error } = useSelector((state) => state.categories);

  const [name, setName] = useState('');
  const [localError, setLocalError] = useState('');
  const router = useRouter()

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setName(''); // Reset the name field

    try {
      // Dispatch the addCategory action
      await dispatch(createCategory({ title:name }));

      // Redirect to categories page after successful addition
      router.push('/categories');
    } catch (err) {
      setLocalError(err.message || 'Failed to add category');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 text-black bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Category</h2>
      {localError && <p className="text-red-500 text-sm mb-4">{localError}</p>}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Category Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded ${loading ? 'opacity-50' : 'hover:bg-blue-700'}`}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Category'}
        </button>
      </form>
    </div>
  );
}
