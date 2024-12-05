
import { fetchBlog } from "@/lib/store/actions/blogsAction";
import Link from "next/link";
import { makeStore } from "@/lib/store/store";



export default async function BlogDetail({searchParams , params}) {
  const store = makeStore()
  const {blog:id} = await params

      if (id) {      
        await store.dispatch(fetchBlog(id));      
      }

      const state = store.getState();

  // Accessing the state from the Redux store
  const { blog, loading, error } = state.blogs;

  // Fetch the blog when the component mounts or the ID changes
 
const {categoryId } = await searchParams;

  // Display loading or error messages
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // If no blog is found, show a message
  if (!blog) return <p>Blog not found</p>;

  return (
    <div className='bg-gray-300 w-full min-h-screen py-20 relative' >
    <Link href={`/blogs?${categoryId ? `categoryId=${categoryId}`: ''}`} className='text-black text-2xl absolute top-2 left-2'>
    {`<--`}
    </Link>
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-blue-800">{blog.title}</h1>
      <p className="text-gray-700">{blog.description}</p>
      {/* Add more blog details here as necessary */}
    </div>
    </div>
  );
}
