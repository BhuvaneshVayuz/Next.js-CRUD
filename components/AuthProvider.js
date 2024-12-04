"use client";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { checkUserLoggedIn } from '@/lib/store/actions/authActions';

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.auth);

const [loading , setLoading] = useState(true)


  useEffect(() => {
    const check = async()=>{
await dispatch(checkUserLoggedIn()); // Fetch user on initial load
setLoading(false)
    }
    check()
  }, [dispatch]);


console.log('wonder', isAuthenticated , loading);


  useEffect(() => {
    // Redirect unauthenticated users to login page
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  // Show a loader or placeholder while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // Only render children if the user is authenticated
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Optionally return null while redirecting to avoid flickering
  return null;
}
