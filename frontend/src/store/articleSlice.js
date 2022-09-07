import { createSlice } from "@reduxjs/toolkit";
import {
  getArticles,
  getArticle,
  updateArticle,
  postArticle,
  delArticle,
} from "./articleActions";

const initialState = {
  loading: false,
  articles: null,
  error: null,
  success: false,
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
  extraReducers: {
    // login user
    [getArticles.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getArticles.fulfilled]: (state, { payload }) => {
      state.loading = false;
      // for (let ind in payload) {
      //   console.log(ind);
      //   if (ind == 2) {
      //     console.log(payload[ind]);
      //     payload[ind].img = "http://localhost:5000/images/a39.jpg";
      //   }
      // }
      state.articles = payload;
    },
    [getArticles.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [getArticle.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getArticle.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.articles = payload;
    },
    [getArticle.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [updateArticle.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [updateArticle.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.articles = payload;
    },
    [updateArticle.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [postArticle.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [postArticle.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.articles = payload;
    },
    [postArticle.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [delArticle.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [delArticle.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.articles = payload;
    },
    [delArticle.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default articleSlice.reducer;
