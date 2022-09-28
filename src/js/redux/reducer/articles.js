import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles: null,
  error: null,
  articlesCount: 0,
  articlePerPage: 5,
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
      return { ...state, activeTab: payload.activeTab };
    },
    updateArticles: (state, action) => {
      const { payload } = action;
      return { ...state, ...payload };
    },
    updatePageIndex: (state, action) => {
      const { payload } = action;
      return { ...state, activePageIndex: payload.activePageIndex };
    },
    updateAuthor: (state, action) => {
      const { payload } = action;
      return { ...state, author: payload.author };
    },
    updateActiveTag: (state, action) => {
      const { payload } = action;
      return { ...state, activeTag: payload.activeTag };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateArticles,
  updatePageIndex,
  updateAuthor,
  updateActiveTab,
  updateActiveTag,
} = articlesSlice.actions;

export default articlesSlice.reducer;
