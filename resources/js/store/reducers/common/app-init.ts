import { createSlice } from "@reduxjs/toolkit";

export const createAppInitReducerReducer = () => {
  return createSlice({
    name: "appInitReducer",
    initialState: {
      init: false
    },
    reducers: {
      set: (state, action) => {
        state.init = action.payload.init;
      }
    }
  });
};

export const appInitReducer = createAppInitReducerReducer();

// Action creators are generated for each case reducer function
export const { set } = appInitReducer.actions;

export default appInitReducer.reducer;
