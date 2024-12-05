"use client"; 

import { logout } from "@/lib/store/actions/authActions";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from 'next/navigation'; // Import useRouter for navigation

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter(); // Use router for navigation
  const pathname = usePathname(); // Get the current path

  // Access the authentication state from Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleSignOut = async () => {
    await dispatch(logout());
    router.push('/login'); // Use router.push instead of redirect
  };

  // Helper function to determine if the link is active
  const isActive = (path) => (pathname === path ? 'border-b-2 border-white' : '');

  // Logic to determine if the Navbar should be shown (hide it on certain routes)
  const hideNavbarRoutes = ['/login', '/signup']; // Add more routes where the navbar should be hidden
  if (hideNavbarRoutes.includes(pathname)) {
    return null; // Don't render the navbar for these routes
  }

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
        {isAuthenticated ? (
          <button
            onClick={handleSignOut}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Sign Out
          </button>
        ) : (
          <Link
            href="/login"
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
