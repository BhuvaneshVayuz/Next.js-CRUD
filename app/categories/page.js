"use client";

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategories, deleteCategory } from '@/lib/store/actions/categoriesActions'; // Import deleteCategory thunk
import { useRouter } from 'next/navigation';

export default function Categories() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Get categories, loading, and error states from Redux
  const { categories, loading, error } = useSelector((state) => state.categories);

  // Fetch categories on page load
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Handle navigation to blogs page
  const navigateToBlogs = (categoryId) => {
    router.push(`/blogs?categoryId=${categoryId}`);
  };

  // Handle category deletion
  const handleDeleteCategory = (categoryId) => {
    // if (confirm("Are you sure you want to delete this category?")) { // Confirm deletion
      dispatch(deleteCategory(categoryId))
        // .then((result) => {
        //   if (deleteCategory.fulfilled.match(result)) {
        //     alert("Category deleted successfully!");
        //   } else {
        //     alert(result.payload.message || "Failed to delete category.");
        //   }
        // });
    // }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-semibold mb-6 text-center text-gray-800">Categories</h1>

      {/* Add Category Button */}
      <div className="text-center mb-6">
        <button
          onClick={() => router.push('/categories/add')}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          Add Category
        </button>
      </div>

      {/* Error or Loading State */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-t-4 border-blue-600 rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-center text-red-600 font-semibold">{error}</p>
      ) : (
        // Categories Table
        <div className="min-w-[50%] mx-auto w-[500px] overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full bg-white text-gray-700 border border-gray-300">
            <thead>
              <tr className="bg-gray-200 flex justify-between text-left">
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id} className="hover:bg-gray-50 flex justify-between transition">
                  <td className="py-3 px-4 border-b">{category.title}</td>
                  <td className="py-3 px-4 border-b flex items-center space-x-3">
                    <button
                      onClick={() => navigateToBlogs(category._id)}
                      className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                      View Blogs
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category._id)} // Delete action
                      className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition"
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
    </div>
  );
}
