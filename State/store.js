/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/TaskSlices';
import UserSlice from './slices/UserSlice';


const store = configureStore({
    reducer:{
        task:taskReducer,
        user:UserSlice,
    },
});

export default store;
