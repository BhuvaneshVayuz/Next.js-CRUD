// redux/authActions.js
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Sign up thunk
export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/users', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data; // Assuming response contains the user data
    } catch (error) {
      console.error('Error signing up:', error);
      return rejectWithValue({
        status: 'Error',
        message: error?.response?.data?.message || error.message,
      });
    }
  }
);

// Login thunk
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/login', credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data; // Assuming response contains the user data
    } catch (error) {
      console.error('Error logging in:', error);
      return rejectWithValue({
        status: 'Error',
        message: error?.response?.data?.message || error.message,
      });
    }
  }
);

// Logout thunk
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/api/auth/logout');
      return true; // Simply return true on successful logout
    } catch (error) {
      console.error('Error logging out:', error);
      return rejectWithValue({
        status: 'Error',
        message: error?.response?.data?.message || error.message,
      });
    }
  }
);


export const checkUserLoggedIn = createAsyncThunk(
  'auth/checkUserLoggedIn',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/auth/getUser');
      return response.data.user; // Return user data on success
    } catch (error) {
      console.error('Error checking user authentication:', error);
      return rejectWithValue({
        status: 'Error',
        message: error?.response?.data?.message || error.message,
      });
    }
  }
);
