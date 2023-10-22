import { createSlice } from "@reduxjs/toolkit";
import { toNumber } from "lodash";

export const defaultDurationMS = 5000;

export const errSnackbar = createSlice({
  name: "errSnackbar",
  initialState: {
    code: 0,
    errors: null,
    duration: defaultDurationMS
  },
  reducers: {
    set: (state, action) => {
      const { errors, duration, code } = action.payload;

      state.errors = errors;
      const dur = toNumber(duration);
      state.duration = dur > 0 ? dur : defaultDurationMS;

      state.code = code;
    },
    clear: (state) => {
      state.code = 0;
      state.errors = null;
      state.duration = defaultDurationMS;
    }
  }
});

// Action creators are generated for each case reducer function
export const { set, clear } = errSnackbar.actions;

export default errSnackbar.reducer;
