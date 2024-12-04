// redux/blogActions.js
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Fetch blogs for a category
export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async (categoryId, { rejectWithValue }) => {
    try {
      let query = '';
      if (categoryId) {
        query = `?categoryId=${categoryId}`;
      }
      const response = await axios.get(`/api/blogs${query}`);
      return response.data; // Assuming response contains the list of blogs
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return rejectWithValue({
        status: 'Error',
        message: error?.response?.data?.message || error.message,
      });
    }
  }
);

// Fetch a single blog by its blogId
export const fetchBlog = createAsyncThunk(
  'blogs/fetchBlog',
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/blogs/${blogId}`);
      return response.data; // Assuming response contains the blog details
    } catch (error) {
      console.error('Error fetching blog:', error);
      return rejectWithValue({
        status: 'Error',
        message: error?.response?.data?.message || error.message,
      });
    }
  }
);

// Create a new blog for a category
export const createBlog = createAsyncThunk(
  'blogs/createBlog',
  async ({ categoryId, blogData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/blogs?categoryId=${categoryId}`, blogData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data; // Assuming response contains the newly created blog
    } catch (error) {
      console.error('Error creating blog:', error);
      return rejectWithValue({
        status: 'Error',
        message: error?.response?.data?.message || error.message,
      });
    }
  }
);