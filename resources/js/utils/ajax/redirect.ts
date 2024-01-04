import { trimEnd } from "lodash";
import { getUrl, navTo } from "../funcs/url";
import { RedirectInterface } from "./interfaces";

class __redirect implements RedirectInterface {
  // с каких роутов нужно редиректить юзера на главную, если он авторизирован уже
  private readonly redirectFromAuthRouteList = [getUrl("/login"), getUrl("/register")];

  public redirectTo(to: string = "/") {
    const currentPath = trimEnd(this.currentPath().toLowerCase(), "/");
    to = trimEnd(to.toLowerCase(), "/");

    if (currentPath === to || currentPath === getUrl(to)) {
      return;
    }

    console.info("REDIRECT FROM", this.currentPath(), "TO", to);

    navTo(to, true);
  }

  public redirectFromAuthRoutes(): void {
    const redirectTo = getUrl("/");
    const currentPath = this.currentPath();

    if (currentPath !== redirectTo && this.redirectFromAuthRouteList.indexOf(currentPath) !== -1) {
      this.redirectTo(redirectTo);
    }
  }

  public isLogout(): boolean {
    return this.currentPath() == getUrl("/logout");
  }

  private currentPath(): string {
    return trimEnd(window.location.pathname, "/");
  }

  public toDirectRedirect(to: string): void {
    window.location.href = to;
  }
}

const redirect = new __redirect();
export default redirect;