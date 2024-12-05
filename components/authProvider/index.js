"use client";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import { checkUserLoggedIn } from '@/lib/store/actions/authActions';

const privateRoutes = ['/blogs/add', '/categories/add']; // Private routes that need authentication

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      await dispatch(checkUserLoggedIn()); // Fetch user on initial load
      setLoading(false);
    };
    check();
  }, [dispatch]);

  // Redirect if we are on a private route and the user is not authenticated
  useEffect(() => {
    if (!loading && privateRoutes.includes(pathname) && !isAuthenticated) {
      router.push('/login'); // Redirect to login page
    }
  }, [loading, pathname, isAuthenticated, router]);

  // Show a loader or placeholder while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render children regardless of authentication status
  return <>{children}</>;
}
