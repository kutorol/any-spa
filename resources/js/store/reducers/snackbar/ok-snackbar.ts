import { createSlice } from "@reduxjs/toolkit";
import { toNumber } from "lodash";
import store from "../../store";
import { defaultDurationMS } from "./error-snackbar";

export const createSuccessMgs = (msg, duration = 5000) => {
  msg = msg || "";
  if (!msg.trim()) {
    return;
  }

  store.dispatch(successSnackbar.actions.set({
    msg,
    duration: toNumber(duration)
  }));
};

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
        if (dur > 0) {
          state.duration = dur;
        }
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
