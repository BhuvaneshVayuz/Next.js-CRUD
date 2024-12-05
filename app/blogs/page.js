
import { fetchBlogs, deleteBlog } from '@/lib/store/actions/blogsAction'; // Import deleteBlog action
import Button from '@/components/button';
import { makeStore } from '@/lib/store/store';

export default async function BlogListing({searchParams}) {

  const store = makeStore()
  const {categoryId }= await searchParams


  
  if (categoryId) {
    await store.dispatch(fetchBlogs(categoryId));      
  } else {
    await store.dispatch(fetchBlogs());
  }

  const state = store.getState();
  const { blogs, loading, error } =  state.blogs;
  
  const { user:currentUser } =  state.auth; 


  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-semibold text-center mb-6 text-gray-800">Blog Listing</h1>

      {/* Show Add Blog Button only if user is logged in */}
      {currentUser && (
        <div className="text-center mb-6">
          <Button route={categoryId ?`/blogs/add?categoryId=${categoryId}`: "/blogs/add"}/>
       
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
              <tr className="bg-gray-200 flex justify-between w-full">
                <th className="py-3 px-4 border-b w-1/3">Title</th>
                <th className="py-3 px-4 border-b w-1/3">Category</th>
                <th className="py-3 px-4 border-b w-1/3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50 flex justify-center w-full transition">
                  <td className="py-3 px-4 border-b w-1/3 flex justify-center">{blog.title}</td>
                  <td className="py-3 px-4 border-b w-1/3 flex justify-center">{blog.category?.title || 'No Category'}</td> {/* Display category title */}
                  <td className="py-3 px-4 border-b w-1/3 flex items-center justify-center space-x-2">
                 <Button route={`/blogs/${blog._id}`} name={'view'} />
                    {/* Show Delete button only if user is logged in and is the blog owner */}
                    {currentUser && currentUser.userId === blog.user && (
                 <Button functionToDispatch={()=> deleteBlog}  params= {blog._id} name={'Delete'} />
                    )}
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
