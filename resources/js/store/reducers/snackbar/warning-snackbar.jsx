import { toNumber } from "lodash";
import { createSnackbarReduce } from "./ok-snackbar";
import store from "../../store";

export const createWarningMgs = (msg, duration = 5000) => {
  msg = msg || ""
  if (!msg.trim()) {
    return
  }

  store.dispatch(warningSnackbar.actions.set({
    msg,
    duration: toNumber(duration),
  }))
}

export const warningSnackbar = createSnackbarReduce('warningSnackbar')

// Action creators are generated for each case reducer function
export const { set, clear } = warningSnackbar.actions

export default warningSnackbar.reducer
