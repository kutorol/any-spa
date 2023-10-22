import { get, toNumber } from "lodash";
import { createErrMgs } from "../../../store/reducers/func/snackbar/error-snackbar";
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

    // отдельные логи авторизации
    const pasetoMsg = get(res, 'data.paseto.msg', null);
    pasetoMsg && errs.push(pasetoMsg.trim());

    // @ts-ignore
    createErrMgs(errs, 7000, toNumber(get(res, "code", 0)));

    return res;
  }
}