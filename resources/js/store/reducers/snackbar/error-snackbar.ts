import { createSlice } from "@reduxjs/toolkit";
import { toNumber } from "lodash";

export const defaultDurationMS = 5000;

interface IInitialState {
  code: number | string;
  errors: null | any[];
  duration: number;
}

export const errSnackbar = createSlice({
  name: "errSnackbar",
  initialState: {
    code: 0,
    errors: null,
    duration: defaultDurationMS
  } as IInitialState,
  reducers: {
    set: (state, action) => {
      const { errors, duration, code }: IInitialState = action.payload;

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
