import { createSlice } from "@reduxjs/toolkit";

export const createSeoReducer = () => {
  return createSlice({
    name: "seoReducer",
    initialState: {
      title: "",
      desc: "",
      keywords: ""
    },
    reducers: {
      set: (state, action) => {
        const { title, desc, keywords } = action.payload;
        state.title = title;
        state.desc = desc;
        state.keywords = keywords;
      }
    }
  });
};

export const seoReducer = createSeoReducer();

// Action creators are generated for each case reducer function
export const { set } = seoReducer.actions;

export default seoReducer.reducer;
