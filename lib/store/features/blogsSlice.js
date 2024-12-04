// redux/blogSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createBlog, fetchBlogs, fetchBlog } from '../actions/blogsAction';

const initialState = {
  blogs: [],
  blog: null, // New state for storing a single blog's details
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch blogs for a category
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.blogs;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch a single blog by blogId
      .addCase(fetchBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload.blog; // Store the single blog details
      })
      .addCase(fetchBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add a blog
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.push(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
