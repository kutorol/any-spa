import { createSlice } from "@reduxjs/toolkit";
import { toNumber } from "lodash";
import { defaultDurationMS } from "./error-snackbar";

export const createSnackbarReduce = (name) => {
  return createSlice({
    name: name,
    initialState: {
      value: "",
      duration: defaultDurationMS
    },
    reducers: {
      set: (state, action) => {
        const { msg, duration } = action.payload;
        state.value = msg;
        const dur = toNumber(duration);
        state.duration = dur > 0 ? dur : defaultDurationMS;
      },
      clear: (state) => {
        state.value = "";
        state.duration = defaultDurationMS;
      }
    }
  });
};

export const successSnackbar = createSnackbarReduce("successSnackbar");

// Action creators are generated for each case reducer function
export const { set, clear } = successSnackbar.actions;

export default successSnackbar.reducer;
