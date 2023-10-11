import { get } from "lodash";
import { ChainCheckHTTPResponse, RedirectInterface } from "../interfaces";

// Проверка на редирект после запроса
export class ChainCheckRedirectHTTP implements ChainCheckHTTPResponse {
  constructor(
    private readonly redirect: RedirectInterface
  ) {
  }

  public check(res: any): any {
    const to = get(res, "data.redirect", null);
    if (res.tryReqAgain || to === null) {
      return res;
    }

    this.redirect.redirectTo(to);
    return null;
  }
}