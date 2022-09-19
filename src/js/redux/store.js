import { configureStore } from "@reduxjs/toolkit";
import articles from "./reducer/articles";

export const store = configureStore({
  reducer: { articles },
});
