import { configureStore } from "@reduxjs/toolkit";
import articles from "./reducer/articles";
import user from "./reducer/user";

export const store = configureStore({
  reducer: { articles, user },
});
