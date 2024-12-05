import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';


const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;



// Existing fetch and create thunks...
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${serverURL}/api/categories`);
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

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/categories/add', categoryData, {
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

// New delete category thunk
export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/categories/${categoryId}`);
      return categoryId; // Return deleted category ID to remove from state
    } catch (error) {
      console.error('Error deleting category:', error);
      return rejectWithValue({
        status: 'Error',
        message: error?.response?.data?.message || error.message,
      });
    }
  }
);
