import { toNumber } from "lodash";
import store from "../../../store";
import { set } from "../../snackbar/warning-snackbar";

export const createWarningMgs = (msg?: string, duration?: number) => {
  msg = msg || "";
  if (!msg.trim()) {
    return;
  }

  store.dispatch(set({
    msg,
    duration: toNumber(duration)
  }));
};