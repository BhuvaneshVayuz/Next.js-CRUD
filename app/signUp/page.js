"use client"; 

import { signUp } from '@/lib/store/actions/authActions';
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation'

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Signup() {

  // Redux dispatch
  const dispatch = useDispatch();
  

  const router = useRouter()


  // State to store form data and errors
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  // Get loading and error state from Redux
  const { loading, error: signupError } = useSelector((state) => state.auth);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      const action = await dispatch(signUp(formData)); // Dispatch sign-up action
      console.log(action , 'nah nah');
      
      // if (signupError) {
      //   setError(signupError); // Set error if signup failed
      // } else {
        // Redirect or show success message after successful signup
        // redirect('/login')
        router.push("/login")

        // window.location.href = '/login'; // You can also use `router.push('/login')` if using next router
      // }
    } catch (err) {
      console.log(err , 'i dont');
      
      setError('Something went wrong, please try again later');
    }
  };

  return (
    <div className="max-w-md text-black mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">Sign Up</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
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
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
