import { get } from "lodash";
import { NotVerifyEmailURL, redirectParam, userDataParam } from "../../../store/constant";
import { changeUserInfo } from "../../../store/reducers/func/common/user";
import { getUrl } from "../../funcs/url";
import { IUserInterface } from "../../interfaces/user";
import { ChainCheckHTTPResponse, RedirectInterface } from "../interfaces";

// Проверка на приход данных по юзеру
export class ChainCheckUserDataHTTP implements ChainCheckHTTPResponse {
  constructor(
    private readonly redirect: RedirectInterface
  ) {
  }

  public check(res: any): any {
    const user = <IUserInterface>get(res, `data.${userDataParam}`, null);
    if (!user) {
      return res;
    }

    if (!user.verified_email && !this.redirect.isLogout()) {
      res.data[redirectParam] = getUrl(NotVerifyEmailURL);
      res.data.redirect_change_with_locale = true;
    }

    changeUserInfo(user);

    return res;
  }
}