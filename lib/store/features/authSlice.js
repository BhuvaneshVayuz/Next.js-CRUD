import { createSlice } from '@reduxjs/toolkit';
import { checkUserLoggedIn, login, logout, signUp } from '../actions/authActions';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign Up Cases
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        // state.isAuthenticated = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login Cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout Cases
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Check User Logged In Cases
      .addCase(checkUserLoggedIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUserLoggedIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(checkUserLoggedIn.rejected, (state, action) => {
        state.loading = false;
        state.user = null;  // Ensure user is set to null if not authenticated
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, setLogout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
