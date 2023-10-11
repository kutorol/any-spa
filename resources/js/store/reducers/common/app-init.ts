import { createSlice } from "@reduxjs/toolkit";
import store from "../../store";

export const changeAppInitState = (init: boolean = true) => {
  store.dispatch(appInitReducer.actions.set({
    init: init
  }));
};

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
