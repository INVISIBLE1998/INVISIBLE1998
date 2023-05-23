/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';
import {Alert} from 'react-native';

const initialState = {
  isLoggedIn: false,
  totalUsers: [],
  loggedUser: {},
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    checkUser: (state, action) => {
      if (state.totalUsers) {
        state.totalUsers.forEach(ele => {
          if (
            ele.email === action.payload.email &&
            ele.password === action.payload.password
          ) {
            Alert.alert('Successfully Logged In');
            Object.assign(state.loggedUser, ele);
            state.isLoggedIn = true;
          }
        });
      }
    },
    addUsers: (state, action) => {
      state.totalUsers.push(action.payload);
      Alert.alert('User Created Successfully!!');
    },
    logoutUser: state => {
      state.loggedUser = {};
      Alert.alert('User Logged Out!');
      state.isLoggedIn = false;
    },
  },
});

export const selectLoggedIn = state => state.user.isLoggedIn;

export const loggedInUser = state => state.user.loggedUser;

export const {checkUser, addUsers, logoutUser} = UserSlice.actions;

export default UserSlice.reducer;
