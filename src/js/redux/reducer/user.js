import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogedInUser: false,
  user: null,
  isVerifying: true,
  article: null,
  params: {
    username: "",
  },
  profile: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfo: (state, action) => {
      const { payload } = action;
      return { ...state, ...payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUserInfo } = userSlice.actions;

export default userSlice.reducer;
