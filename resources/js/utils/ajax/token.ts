// @ts-ignore
import { get } from "lodash";
import { createErrMgs } from "../../store/reducers/snackbar/error-snackbar";
import { RedirectInterface } from "./interfaces";
import redirect from "./redirect";
import Locale from "../funcs/locale";

class __tokens {
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
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    this.accessToken = null;
    this.refreshToken = null;

    if (redirectTo) {
      this.redirect.redirectTo(redirectTo);
    }
  }

  public setTokens(res: any): void {
    const at = get(res, "data.token.access_token", null);
    const rt = get(res, "data.token.refresh_token", null);
    if (!at || !rt) {
      this.clearToken("/");
      return;
    }

    this.accessToken = at;
    this.refreshToken = rt;
    localStorage.setItem("access_token", at);
    localStorage.setItem("refresh_token", rt);
  }

  // Проверяем при инициализации, все ли хорошо с токенами и если нужно, то выпускаем новые токены
  public checkTokens = (method: (url: string, params: object) => Promise<any>): Promise<any> => {
    if (!this.accessToken || !this.refreshToken) {
      // @ts-ignore
      return new Promise(resolve => resolve(true));
    }

    return method("/api/init-request", {}).then(res => {
      if (res.status) {
        return true;
      }

      let withErrors = false;
      const errs = get(res, "data.errs", []);
      if (errs.length) {
        withErrors = true;
        const msg = get(res, "msg", "").trim();
        msg.length > 0 && errs.unshift(msg);

        createErrMgs(errs, 7000, get(res, "code", 0));
      }

      const redirectTo = "/login";
      if (window.location.pathname !== redirectTo) {
        !withErrors && createErrMgs(Locale.locale.t("Токены авторизации неисправны, поэтому вы вышли из аккаунта"));
      }

      this.clearToken(redirectTo);
      return false;
    }).then(noError => {
      noError && this.redirect.redirectFromAuthRoutes();
      return noError;
    });
  };

  private initTokens(): void {
    this.accessToken = localStorage.getItem("access_token");
    this.refreshToken = localStorage.getItem("refresh_token");
  }
}

const token = new __tokens(redirect);
export default token;