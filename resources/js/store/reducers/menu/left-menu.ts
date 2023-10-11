import { createSlice } from "@reduxjs/toolkit";
import store from "../../store";

export const changeLeftMenu = (isOpen: boolean = true) => {
  store.dispatch(leftMenuReducer.actions.set({
    isOpen: isOpen
  }));
};

export const createLeftMenuReducer = () => {
  return createSlice({
    name: "leftMenuReducer",
    initialState: {
      isOpen: true
    },
    reducers: {
      set: (state, action) => {
        const { isOpen } = action.payload;

        state.isOpen = isOpen;
      }
    }
  });
};

export const leftMenuReducer = createLeftMenuReducer();

// Action creators are generated for each case reducer function
export const { set } = leftMenuReducer.actions;

export default leftMenuReducer.reducer;
