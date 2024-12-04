// redux/categoriesActions.js
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Fetch all categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/categories');
      return response.data; // Assuming response contains the categories list
    } catch (error) {
      console.error('Error fetching categories:', error);
      return rejectWithValue({
        status: 'Error',
        message: error?.response?.data?.message || error.message,
      });
    }
  }
);

// Create a new category
export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/categories', categoryData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data.category; // Assuming response contains the newly created category data
    } catch (error) {
      console.error('Error creating category:', error);
      return rejectWithValue({
        status: 'Error',
        message: error?.response?.data?.message || error.message,
      });
    }
  }
);
