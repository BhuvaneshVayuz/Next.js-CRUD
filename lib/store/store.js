import { configureStore } from '@reduxjs/toolkit';
import categoriesSlice from './features/categoriesSlice'
import blogsSlice from './features/blogsSlice'
import authSlice from './features/authSlice'
// store variable is a global variable.
export const makeStore = () => {
    return configureStore({
        reducer: {
            categories: categoriesSlice ,
            blogs: blogsSlice,
            auth: authSlice
        },
    });
};
