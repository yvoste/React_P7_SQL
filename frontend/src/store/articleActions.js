import instance from "../http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getArticles = createAsyncThunk(
  "article/getArticles",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/messages");
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
  async (objectToTransmitted, { rejectWithValue }) => {
    try {
      const dataArticle = objectToTransmitted.data;
      const { data } = await instance.put("/messages", dataArticle);
      console.log(data);
      data.indexo = objectToTransmitted.indexo;
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
  async (objectToTransmitted, { rejectWithValue }) => {
    try {
      const dataArticle = objectToTransmitted.data;
      const { data } = await instance.post("/messages", dataArticle);
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

      const { data } = await instance.post("/user/login", { email, password });

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
