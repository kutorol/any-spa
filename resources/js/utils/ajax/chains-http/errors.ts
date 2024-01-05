import { get } from "lodash";
import { errParam } from "../../../store/constant";
import { createErrMgs } from "../../../store/reducers/func/snackbar/error-snackbar";
import { ChainCheckHTTPResponse } from "../interfaces";

// Проверка на показ ошибок во всплывающем окне
export class ChainCheckErrorsHTTP implements ChainCheckHTTPResponse {
  public check(res: any): any {
    if (!res || res.status || res.tryReqAgain) {
      return res;
    }

    const errs = get(res, `data.${errParam}`, []);
    if (errs.length > 0 && get(res, "msg", "").trim() !== "") {
      errs.unshift(res.msg.trim());
    }

    // отдельные логи авторизации
    const pasetoMsg = get(res, "data.paseto.msg", null);
    pasetoMsg && errs.unshift(pasetoMsg.trim());

    // @ts-ignore
    createErrMgs(errs, errs.length > 0 ? 5000 : 1000, get(res, "code", 0));

    return res;
  }
}