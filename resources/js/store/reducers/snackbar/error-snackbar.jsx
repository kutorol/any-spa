import { createSlice } from '@reduxjs/toolkit'
import { cloneDeep, toNumber } from "lodash";
import store from "../../store";

export const defaultDurationMS = 5000

export const createErrMgs = (listErrs, duration = 5000, code = 0) => {
  store.dispatch(errSnackbar.actions.set(_createErrMgs(listErrs, duration, code)))
}

const _createErrMgs = (listErrs, duration = 5000, code = 0) => {
  let errs = []
  if (typeof listErrs === "string") {
    errs.push(listErrs)
  } else if (Array.isArray(listErrs)) {
    errs = cloneDeep(listErrs)
  } else {
    errs = null
  }

  return {
    code: toNumber(code),
    errors: errs,
    duration: toNumber(duration)
  }
}

export const errSnackbar = createSlice({
  name: 'errSnackbar',
  initialState: {
    code: 0,
    errors: null,
    duration: defaultDurationMS
  },
  reducers: {
    set: (state, action) => {
      const { errors, duration, code } = action.payload

      state.errors = errors
      const dur = toNumber(duration)
      if (dur > 0) {
        state.duration = dur
      }

      if (code > 0) {
        state.textError += ` (#${code})`
      }
    },
    clear: (state) => {
      state.code = 0
      state.errors = null
      state.duration = defaultDurationMS
    },
  },
})

// Action creators are generated for each case reducer function
export const { set, clear } = errSnackbar.actions

export default errSnackbar.reducer
