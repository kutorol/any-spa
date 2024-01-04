// @ts-ignore
import dayjs from "dayjs";
// локали нужны, чтобы поменять язык дат - без них по дефолту en будет
import "dayjs/locale/en";
import "dayjs/locale/ru";
import { get, trimEnd, trimStart } from "lodash";
import { localeParam, redirectParam } from "../../../store/constant";
import { defaultUser } from "../../../store/reducers/common/user";
import { changeUserInfo } from "../../../store/reducers/func/common/user";
import store from "../../../store/store";
import { ELanguages } from "../../enums/user";
import { currentURLByLocale } from "../../funcs/url";
import { IUserInterface } from "../../interfaces/user";
import { ChainCheckHTTPResponse } from "../interfaces";

export const isEnumLocale = (v: string): boolean => {
  // @ts-ignore
  return Object.values(ELanguages).includes(v as ELanguages);
};

// Проверка на редирект после запроса
export class ChainCheckLocaleHTTP implements ChainCheckHTTPResponse {
  public check(res: any): any {
    let locale = <ELanguages>get(res, `data.${localeParam}`, null);
    if (!locale) {
      return res;
    }

    if (!isEnumLocale(locale)) {
      locale = defaultUser.locale;
    }

    if (get(res, `data.${redirectParam}`, null)) {
      res.data[redirectParam] = trimEnd(`/${locale}/${trimStart(res.data[redirectParam], "/")}`, "/");
      res.data.redirect_change_with_locale = true;
      return res;
    }

    const localeURL = trimStart(window.location.pathname, "/").split("/")[0] as ELanguages;
    const changeToLocale = locale.toString().toLowerCase();
    if (!isEnumLocale(localeURL) || changeToLocale !== localeURL.toLowerCase()) {
      res.data.redirect_direct = currentURLByLocale(locale);
    }

    const user: IUserInterface = store.getState().userInfo.user;
    if (user.locale === locale) {
      return res;
    }

    const u: IUserInterface = { ...user, locale: locale };
    changeUserInfo(u);

    return res;
  }
}