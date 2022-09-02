import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import articleReducer from "./articleSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    articles: articleReducer,
  },
});

export default store;
