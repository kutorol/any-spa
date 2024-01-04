import { cloneDeep, toNumber } from "lodash";
import store from "../../../store";
import { set } from "../../snackbar/error-snackbar";

export const createErrMgs = (listErrs: string | string[], duration?: number, code: number | string = 0) => {
  store.dispatch(set(_createErrMgs(listErrs, duration, code)));
};

const _createErrMgs = (listErrs: string | string[], duration?: number, code: number | string = 0) => {
  let errs = [];
  if (typeof listErrs === "string") {
    errs.push(listErrs);
  } else if (Array.isArray(listErrs)) {
    errs = cloneDeep(listErrs);
  } else {
    errs = null;
  }

  return {
    code: code,
    errors: errs,
    duration: toNumber(duration)
  };
};
