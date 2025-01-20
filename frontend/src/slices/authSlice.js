import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  token: localStorage.getItem("token") || null, // Token stored as a plain string
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload); // Store token in localStorage
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token"); // Remove token from localStorage
    },
  },
});

export const { setLoading, setToken, logout } = authSlice.actions;

export default authSlice.reducer;
