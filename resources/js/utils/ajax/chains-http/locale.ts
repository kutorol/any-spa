import { get } from "lodash";
import { changeLocale } from "../../../store/reducers/func/common/locale";
import { Languages } from "../../enums/common/enums";
import Locale from "../../funcs/locale";
import { ChainCheckHTTPResponse } from "../interfaces";

// Проверка на редирект после запроса
export class ChainCheckLocaleHTTP implements ChainCheckHTTPResponse {
  public check(res: any): any {
    const locale = get(res, "data.locale", null);
    if (!locale) {
      return res;
    }

    changeLocale(<Languages>locale);
    Locale.locale.setLocale(locale);

    return res;
  }
}