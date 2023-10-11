import { get } from "lodash";
import { changeUserInfo } from "../../../store/reducers/common/user";
import { ChainCheckHTTPResponse, RedirectInterface } from "../interfaces";

// Проверка на приход данных по юзеру
export class ChainCheckUserDataHTTP implements ChainCheckHTTPResponse {
  constructor(
    private readonly redirect: RedirectInterface
  ) {
  }

  public check(res: any): any {
    const user = get(res, "data.user_data", null);
    if (!user) {
      return res;
    }

    if (!user.verified_email && !this.redirect.isLogout()) {
      res.data.redirect = "/verify-email";
    }

    changeUserInfo(user);

    return res;
  }
}