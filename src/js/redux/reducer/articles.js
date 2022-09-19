import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles: null,
  error: null,
  articlesCount: 0,
  articlePerPage: 10,
  activePageIndex: 1,
  activeTab: "",
  activeTag: "",
  author: "",
};

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    updateActiveTab: (state, action) => {
      const { payload } = action;
      return { ...state, activeTab: payload };
    },
    updateArticles: (state, action) => {
      const { payload } = action;
      return { ...state, ...payload };
    },
    updatePageIndex: (state, action) => {
      const { payload } = action;
      return { ...state, activePageIndex: payload.activePageIndex };
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateArticles, updateActiveTab, updatePageIndex } =
  articlesSlice.actions;

export default articlesSlice.reducer;
