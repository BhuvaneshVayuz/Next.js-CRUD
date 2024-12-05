// "use client";

import Button from '@/components/button';
import { checkUserLoggedIn } from '@/lib/store/actions/authActions';
import { fetchCategories, deleteCategory } from '@/lib/store/actions/categoriesActions';
import { makeStore } from '@/lib/store/store';

export default async function Categories() {
  const store = makeStore()

  await store.dispatch(checkUserLoggedIn());
  await store.dispatch(fetchCategories());
  const state = store.getState();
  const { categories, loading, error } =  state.categories  
  const { user: currentUser } = state.auth

console.log(state, 'okokok');

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-semibold mb-6 text-center text-gray-800">Categories</h1>

      {/* Add Category Button (show only if user is logged in) */}
      {currentUser && (
        <div className="text-center mb-6">
                   <Button name={"Add Category"} route={'/categories/add'} />

        </div>
      )}

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
                  <td className="py-3 px-4 border-b">{category?.title}</td>
                  <td className="py-3 px-4 border-b flex items-center space-x-3">
                    
                    {/* Show Delete button only if the category belongs to the logged-in user */}
                    <Button name={"View Blogs"} route={`/blogs?categoryId=${category?._id}`} />

                    {currentUser && currentUser?.userId === category?.user && (
                                          <Button name={"Delete"} functionToDispatch = { ()=> deleteCategory} params={category?._id} /> 

                    )}
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