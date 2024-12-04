"use client"; 

import { logout } from "@/lib/store/actions/authActions";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { usePathname } from 'next/navigation'; // Import usePathname to get current path

export default function Navbar() {
  const dispatch = useDispatch();
  const pathname = usePathname(); // Get the current path

  const handleSignOut = async () => {
    await dispatch(logout());
    redirect('/login');
  };

  // Helper function to determine if the link is active
  const isActive = (path) => pathname === path ? 'border-b-2 border-white' : '';

  return (
    <nav className="bg-blue-500 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold">
        <Link href="/" className="hover:text-gray-300">
          My App
        </Link>
      </div>
      <div className="flex space-x-6 justify-center items-center">
        <Link
          href="/categories"
          className={`hover:text-gray-300 ${isActive('/categories')}`}
        >
          Categories
        </Link>
        <Link
          href="/blogs"
          className={`hover:text-gray-300 ${isActive('/blogs')}`}
        >
          Blogs
        </Link>
        <button
          onClick={handleSignOut}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
