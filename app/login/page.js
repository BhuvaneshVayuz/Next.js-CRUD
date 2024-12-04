"use client"; 

import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'
import { login } from '@/lib/store/actions/authActions';

export default function Login() {

  // Redux dispatch
  const dispatch = useDispatch();

  const router = useRouter()



  // Get loading and error state from Redux
  const { loading, error: loginError } = useSelector((state) => state.auth);

  // State to store form data and errors
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      // Dispatch the login action with form data
      const action = await dispatch(login(formData));
      // if (loginError) {
      //   setError(loginError); // Set error if login failed
      // } else {
        // Redirect to the dashboard or homepage after successful login
        // window.location.href = '/dashboard'; // You can use nextjs router.push('/dashboard') for navigation
        router.push("/")
      // }
    } catch (err) {
      setError('Something went wrong, please try again later');
    }
  };


console.log(loginError , 'error');


  return (
    <div className="max-w-md text-black mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">Login</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 ${loading ? 'opacity-50' : ''}`}
          disabled={loading}
        >
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </form>
      <p className="text-gray-700 text-sm mt-4 text-center">
        Do not have an account? <Link href="/signUp" className="text-blue-500">Sign up here</Link>
      </p>
    </div>
  );
}
