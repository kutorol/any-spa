import { get, toNumber, trimEnd } from "lodash";
import { hasConfirmCookieLocalStorage } from "../../Components/Common/Utils/Cookie/CookieConfirm";
import { findCurrentRoute, isCurrentRouteWithSeo } from "../../Components/Common/Utils/SeoTitles";
import { accessTokenParam, errParam, refreshTokenParam, tokenParam } from "../../store/constant";
import { changeSeo } from "../../store/reducers/func/common/seo";
import { changeUserInfoChunkData } from "../../store/reducers/func/common/user";
import { createErrMgs } from "../../store/reducers/func/snackbar/error-snackbar";
import { __ } from "../funcs/locale";
import { getUrl } from "../funcs/url";
import { RedirectInterface, TokenInterface } from "./interfaces";
import redirect from "./redirect";

class __tokens implements TokenInterface {
  private accessToken?: string = null;
  private refreshToken?: string = null;

  constructor(
    private redirect: RedirectInterface
  ) {
    this.redirect = redirect;

    this.initTokens();
  }


  public getAccess(): string {
    return this.accessToken;
  }

  public getRefresh(): string {
    return this.refreshToken;
  }

  public clearToken(redirectTo?: string): void {
    localStorage.removeItem(accessTokenParam);
    localStorage.removeItem(refreshTokenParam);

    this.accessToken = null;
    this.refreshToken = null;

    if (redirectTo) {
      this.redirect.redirectTo(redirectTo);
    }
  }

  public setTokens(res: any): void {
    const at = get(res, `data.${tokenParam}.${accessTokenParam}`, null);
    const rt = get(res, `data.${tokenParam}.${refreshTokenParam}`, null);
    if (!at || !rt) {
      this.clearToken(getUrl("/"));
      return;
    }

    this.accessToken = at;
    this.refreshToken = rt;
    localStorage.setItem(accessTokenParam, at);
    localStorage.setItem(refreshTokenParam, rt);
  }

  // Проверяем при инициализации, все ли хорошо с токенами и если нужно, то выпускаем новые токены
  public checkTokens = (method: (url: string, params: object) => Promise<any>): Promise<any> => {
    const path = window.location.pathname;
    // Для роута нужно получить SEO и это не 404 роут
    const withSeo = isCurrentRouteWithSeo() && Boolean(findCurrentRoute(path));

    if (!this.accessToken || !this.refreshToken) {
      this.clearToken();

      return method("/api/init-request-anonym", {
        path: path,
        withSeo: withSeo ? 1 : 0
      }).then(res => {
        if (res.status) {
          withSeo && changeSeo(path, get(res, "data.seo", {}));
          changeUserInfoChunkData({
            ab_tests: get(res, "data.ab_tests", {})
          });
        }

        return res.status;
      });
    }

    return method("/api/init-request", {
      path: path,
      confirmAgreement: hasConfirmCookieLocalStorage() ? 1 : 0,
      withSeo: withSeo ? 1 : 0
    }).then(res => {
      if (res.status) {
        withSeo && changeSeo(path, get(res, "data.seo", {}));
        return true;
      }

      let withErrors = false;
      const errs = get(res, `data.${errParam}`, []);
      if (errs.length) {
        withErrors = true;
        const msg = get(res, "msg", "").trim();
        msg.length > 0 && errs.unshift(msg);

        createErrMgs(errs, 7000, toNumber(get(res, "code", 0)));
      }

      const redirectTo = getUrl("/login");
      if (trimEnd(window.location.pathname, "/").toLowerCase() !== redirectTo.toLowerCase()) {
        !withErrors && createErrMgs(__("Токены авторизации неисправны, поэтому вы вышли из аккаунта"));
      }

      this.clearToken(redirectTo);
      return false;
    }).then(noError => {
      noError && this.redirect.redirectFromAuthRoutes();
      return noError;
    });
  };

  private initTokens(): void {
    this.accessToken = localStorage.getItem(accessTokenParam);
    this.refreshToken = localStorage.getItem(refreshTokenParam);
  }
}

const token = new __tokens(redirect);
export default token;