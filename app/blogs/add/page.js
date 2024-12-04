"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { createBlog } from '@/lib/store/actions/blogsAction';
import { fetchCategories } from '@/lib/store/actions/categoriesActions'; // Import the thunk
import Link from 'next/link';

export default function AddBlog() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(''); // Track selected category
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const initialCategoryId = searchParams.get('categoryId'); // Get categoryId from query params

  // Fetch categories from the Redux store
  const { categories, loading: categoriesLoading, error } = useSelector((state) => state.categories);

  // Fetch categories when the component mounts
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Set initial category if provided in query params
  useEffect(() => {
    if (initialCategoryId) {
      setCategoryId(initialCategoryId);
    }
  }, [initialCategoryId, categories]); // Ensure it updates when categories change

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(createBlog({ categoryId, blogData: { title, description } }));
      router.push(categoryId ? `/blogs?categoryId=${categoryId}` : '/blogs');
    } catch (err) {
      console.error('Failed to add blog:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-gray-300 w-full min-h-screen py-20 relative'>
      <Link href={categoryId ? `/blogs?categoryId=${categoryId}` : '/blogs'} className='text-black text-2xl absolute top-2 left-2'>
        {`<--`}
      </Link>
      <div className="max-w-md mx-auto p-6 text-black bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Add Blog</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              rows="5"
              required
            />
          </div>
          {/* Category Dropdown */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700">Category</label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="" disabled>{categoriesLoading ? 'Loading categories...' : 'Select a category'}</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded ${loading ? 'opacity-50' : 'hover:bg-blue-700'}`}
            disabled={loading || categoriesLoading}
          >
            {loading ? 'Adding...' : 'Add Blog'}
          </button>
        </form>
      </div>
    </div>
  );
}
