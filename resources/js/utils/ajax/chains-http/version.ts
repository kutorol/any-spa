import { get } from "lodash";
import { SiteVersion } from "../../../store/constant";
import { createInfoMgs } from "../../../store/reducers/func/snackbar/info-snackbar";
import { __ } from "../../funcs/locale";
import { ChainCheckHTTPResponse } from "../interfaces";

export class ChainCheckVersionHTTP implements ChainCheckHTTPResponse {
  public check(res: any): any {
    const version = get(res, "version", null);
    if (!version) {
      return res;
    }

    if (version !== SiteVersion) {
      createInfoMgs(__("Версия сайта обновилась. Обновите страницу"));
    }

    return res;
  }
}