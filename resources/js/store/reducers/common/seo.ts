import { createSlice } from "@reduxjs/toolkit";
import { ISeoFields } from "../func/common/seo";

export const createSeoReducer = () => {
  return createSlice({
    name: "seoReducer",
    initialState: {
      title: "",
      desc: "",
      image: ""
    },
    reducers: {
      set: (state, action) => {
        const { title, desc, image } = action.payload as ISeoFields;
        state.title = title;
        state.desc = desc;
        state.image = image;
      }
    }
  });
};

export const seoReducer = createSeoReducer();

// Action creators are generated for each case reducer function
export const { set } = seoReducer.actions;

export default seoReducer.reducer;
