import {createSlice} from '@reduxjs/toolkit';

const userSlicer = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    token: null,
    isLogin: false,
    welcome:true,
    remember:true,
    otp:''
  },

  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },

    setToken: (state, action) => {
      state.token = action.payload;
    },

    setAccessToken: (state, action) => {
      state.token = action.payload;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    logOut: (state, action) => {
      state.isLogin = action.payload;
    },
    onLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setWelcome: (state, action) => {
      state.welcome = action.payload;
    },
    rememberMe: (state, action) => {
      state.remember = action.payload;
    },
  },
});

export const {setUser, setToken, setAccessToken, logOut, onLogin,setOtp,setWelcome,rememberMe} =
  userSlicer.actions;

export default userSlicer.reducer;
