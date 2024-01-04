import { get } from "lodash";
import { redirectParam } from "../../../store/constant";
import { getUrl } from "../../funcs/url";
import { ChainCheckHTTPResponse, RedirectInterface } from "../interfaces";

// Проверка на редирект после запроса
export class ChainCheckRedirectHTTP implements ChainCheckHTTPResponse {
  constructor(
    private readonly redirect: RedirectInterface
  ) {
  }

  public check(res: any): any {
    let to = get(res, `data.${redirectParam}`, null);
    const toDirect = get(res, "data.redirect_direct", null);
    if (res.tryReqAgain || (to === null && toDirect === null)) {
      return res;
    }

    if (toDirect) {
      window.location.href = toDirect;
      return null;
    }

    // ранее не подставлялся url для редиректа
    if (!get(res, "data.redirect_change_with_locale", false)) {
      to = getUrl(to);
    }

    this.redirect.redirectTo(to);
    return null;
  }
}