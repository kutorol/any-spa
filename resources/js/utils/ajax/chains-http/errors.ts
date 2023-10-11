import { get } from "lodash";
import { createErrMgs } from "../../../store/reducers/snackbar/error-snackbar";
import { ChainCheckHTTPResponse } from "../interfaces";

// Проверка на показ ошибок во всплывающем окне
export class ChainCheckErrorsHTTP implements ChainCheckHTTPResponse {
  public check(res: any): any {
    if (!res || res.status || res.tryReqAgain) {
      return res;
    }

    const errs = get(res, "data.errs", []);
    if (!errs.length && get(res, "msg", "").trim() !== "") {
      errs.push(res.msg.trim());
    }

    // @ts-ignore
    createErrMgs(errs, 7000, get(res, "code", 0));

    return res;
  }
}