import { createSlice } from "@reduxjs/toolkit";
import store from "../../store";

export const changeFullScreenLoaderState = (isActive: boolean = false) => {
  store.dispatch(fullScreenLoaderReducer.actions.set({
    active: isActive
  }));
};

export const createFullScreenLoaderReducer = () => {
  return createSlice({
    name: "fullScreenLoaderReducer",
    initialState: {
      active: true
    },
    reducers: {
      set: (state, action) => {
        state.active = action.payload.active;
      }
    }
  });
};

export const fullScreenLoaderReducer = createFullScreenLoaderReducer();

// Action creators are generated for each case reducer function
export const { set } = fullScreenLoaderReducer.actions;

export default fullScreenLoaderReducer.reducer;
