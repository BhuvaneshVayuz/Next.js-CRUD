"use client";

import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function Home() {
  const router = useRouter();

  // Handlers for button navigation
  const goToCategories = () => router.push("/categories");
  const goToBlogs = () => router.push("/blogs");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 sm:p-20 font-sans">
      <h1 className="text-4xl font-bold mb-10 text-blue-600">Stay inside the line</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
        Meet me outside the palace, don't need no approval gal u r valid
      </p>
      <div className="flex space-x-6">
        <button
          onClick={goToCategories}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Go to Categories
        </button>
        <button
          onClick={goToBlogs}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105"
        >
          Go to Blogs
        </button>
      </div>
    </div>
  );
}
