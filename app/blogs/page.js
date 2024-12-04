"use client";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchBlogs } from '@/lib/store/actions/blogsAction';
import { useRouter, useSearchParams } from 'next/navigation';

export default function BlogListing() {
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize useRouter

  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');

  // Get blog data, loading, and error states from Redux
  const { blogs, loading, error } = useSelector((state) => state.blogs);

  // Fetch blogs when component mounts
  useEffect(() => {
    if (categoryId) {
      dispatch(fetchBlogs(categoryId));
    } else {
      dispatch(fetchBlogs());
    }
  }, [dispatch, categoryId]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-semibold text-center mb-6 text-gray-800">Blog Listing</h1>

      {/* Add Blog Button */}
      {categoryId && (
        <div className="text-center mb-6">
          <button
            onClick={() => {
              router.push(`/blogs/add?categoryId=${categoryId}`);
            }}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
          >
            Add Blog
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-t-4 border-blue-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        // Blog Table
        <div className="min-w-[50%] mx-auto w-[500px] overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="min-w-full text-gray-700 border border-gray-300">
            <thead>
              <tr className="bg-gray-200 flex justify-between">
                <th className="py-3 px-6 border-b">Title</th>
                <th className="py-3 px-6 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50 flex justify-between w-full transition">
                  <td className="py-3 px-6 border-b">{blog.title}</td>
                  <td className="py-3 px-6 border-b flex items-center">
                    <button
                      onClick={() => router.push(`/blogs/${blog._id}`)}
                      className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Error State */}
      {error && <p className="text-center text-red-600 font-semibold mt-4">{error}</p>}
    </div>
  );
}
