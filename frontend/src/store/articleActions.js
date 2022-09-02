import http from "../http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getArticles = createAsyncThunk(
  "article/getArticles",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON

      const { data } = await http.post("/user/login", { email, password });

      // store user's token in local storage
      localStorage.setItem("userToken", data.userToken);

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

export const getArticle = createAsyncThunk(
  "article/getArticle",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON

      const { data } = await http.post("/user/login", { email, password });

      // store user's token in local storage
      localStorage.setItem("userToken", data.userToken);

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

export const updateArticle = createAsyncThunk(
  "article/updateArticle",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON

      const { data } = await http.post("/user/login", { email, password });

      // store user's token in local storage
      localStorage.setItem("userToken", data.userToken);

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

export const postArticle = createAsyncThunk(
  "article/postArticle",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON

      const { data } = await http.post("/user/login", { email, password });

      // store user's token in local storage
      localStorage.setItem("userToken", data.userToken);

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

export const delArticle = createAsyncThunk(
  "article/delArticle",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON

      const { data } = await http.post("/user/login", { email, password });

      // store user's token in local storage
      localStorage.setItem("userToken", data.userToken);

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
