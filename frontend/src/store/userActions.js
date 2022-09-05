import instance from "../http";
import { createAsyncThunk } from "@reduxjs/toolkit";
//import axios from "axios";

export const userLogin = createAsyncThunk(
  "user/login",
  async (dataUser, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/user/login", dataUser);

      // store user's token in local storage
      localStorage.setItem("userToken", data.token);

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (dataUser, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/user/signup", dataUser);

      // store user's token in local storage
      localStorage.setItem("userToken", data.token);

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (user_id, { rejectWithValue }) => {
    try {
      // get user data from store
      //const { user } = getState();
      console.log(user_id);
      const { data } = await instance.get(`/user/profile/${user_id}`);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const setUserDetails = createAsyncThunk(
  "user/setUserDetails",
  async (dataProfil, { rejectWithValue }) => {
    try {
      let mid = 0;
      dataProfil.forEach((value, key) => {
        if (key === "userId") {
          mid = value;
        }
      });
      const { data } = await instance.put(`/user/profile/${mid}`, dataProfil);
      return data;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
