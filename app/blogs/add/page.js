"use client";

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { createBlog } from '@/lib/store/actions/blogsAction';
import Link from 'next/link';

export default function AddBlog() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

 
  const searchParams = useSearchParams();

const categoryId = searchParams.get('categoryId') 




  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Dispatch the addBlog thunk
      const resultAction = await dispatch(createBlog( { categoryId  , blogData: { title, description }}));
console.log(resultAction);

        router.push(`/blogs?categoryId=${categoryId}`);
    } catch (err) {
      setError('Failed to add blog. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-gray-300 w-full min-h-screen py-20 relative' >
      <Link href={`/blogs?categoryId=${categoryId}`} className='text-black text-2xl absolute top-2 left-2'>
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
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded ${loading ? 'opacity-50' : 'hover:bg-blue-700'}`}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Blog'}
        </button>
      </form>
    </div>
    </div>
  );
}
