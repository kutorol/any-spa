import RouterAPI from "../funcs/router-api";
import { RedirectInterface } from "./interfaces";

class __redirect implements RedirectInterface {
  // с каких роутов нужно редиректить юзера на главную, если он авторизирован уже
  private readonly redirectFromAuthRouteList = ["/login", "/register"];

  public redirectTo(to: string = "/") {
    if (this.currentPath().toLowerCase() === to.toLowerCase()) {
      return;
    }

    console.info("REDIRECT TO", to, "from", this.currentPath());

    RouterAPI.navigate(to);
  }

  public redirectFromAuthRoutes(): void {
    const redirectTo = "/";
    const currentPath = this.currentPath();

    if (currentPath !== redirectTo && this.redirectFromAuthRouteList.indexOf(currentPath) !== -1) {
      this.redirectTo(redirectTo);
    }
  }

  public isLogout(): boolean {
    return this.currentPath() == "/logout";
  }

  private currentPath(): string {
    return window.location.pathname;
  }
}

const redirect = new __redirect();
export default redirect;