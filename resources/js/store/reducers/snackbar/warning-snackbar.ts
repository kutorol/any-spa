import { toNumber } from "lodash";
import store from "../../store";
import { createSnackbarReduce } from "./ok-snackbar";

export const createWarningMgs = (msg?:string, duration: number = 5000) => {
  msg = msg || "";
  if (!msg.trim()) {
    return;
  }

  store.dispatch(warningSnackbar.actions.set({
    msg,
    duration: toNumber(duration)
  }));
};

export const warningSnackbar = createSnackbarReduce("warningSnackbar");

// Action creators are generated for each case reducer function
export const { set, clear } = warningSnackbar.actions;

export default warningSnackbar.reducer;
