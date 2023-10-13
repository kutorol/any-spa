import { toNumber } from "lodash";
import store from "../../store";
import { createSnackbarReduce } from "./ok-snackbar";

export const createInfoMgs = (msg?: string, duration:number = 5000) => {
  msg = msg || "";
  if (!msg.trim()) {
    return;
  }

  store.dispatch(infoSnackbar.actions.set({
    msg,
    duration: toNumber(duration)
  }));
};

export const infoSnackbar = createSnackbarReduce("infoSnackbar");

// Action creators are generated for each case reducer function
export const { set, clear } = infoSnackbar.actions;

export default infoSnackbar.reducer;
