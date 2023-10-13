import { get } from "lodash";
import { changeFullScreenLoaderState } from "../../store/reducers/common/full-screen-loader";
import { changeUserInfo } from "../../store/reducers/common/user";
import r from "../ajax";
import token from "../ajax/token";
import userAuthGoogle from "./google-auth";
import {
  googleAuthInterface,
  loginPropsInterface,
  registerFormValuesInterface,
  resetPassForgotParamsInterface,
  userSocialAuth
} from "./interfaces";

class UserAuthRepository {
  constructor(
    private readonly google: userSocialAuth
  ) {
  }

  // получение инфы из гугла о юзере
  public fetchData(url: string, accessToken: string): googleAuthInterface {
    return this.google.fetchData(url, accessToken);
  }

  // Логин/регистрация через гугл
  public googleAuth(res: googleAuthInterface, captchaToken: string): Promise<boolean> {
    return this.google.auth(res, captchaToken);
  }

  // Вход по email и паролю
  public login(formValues: loginPropsInterface, captchaToken: string): Promise<boolean> {
    return r.post("/api/login", {
      email: formValues.email,
      password: formValues.password,
      "g-recaptcha-token": captchaToken
    }).then(res => get(res, "status", false));
  }

  // Регистрация юзера
  public register(formValues: registerFormValuesInterface, captchaToken: string): Promise<boolean> {
    return r.post("/api/register", {
      name: `${formValues.last_name} ${formValues.first_name} ${formValues.sur_name}`,
      email: formValues.email,
      password: formValues.password,
      password_confirmation: formValues.password_confirmation,
      "g-recaptcha-token": captchaToken
    }).then(res => get(res, "status", false));
  }

  // Снова отсылает письмо для подтверждения email
  public sendVerifyEmail(cb = (res: object) => {}) {
    changeFullScreenLoaderState(true);
    r.post("/api/email/verification-notification", {})
      .then(cb)
      .then(() => changeFullScreenLoaderState(false));
  }

  // Отсылает письмо с восстановлением пароля
  public sendPassForgotEmail(email: string, captchaToken: string): Promise<any> {
    return r.post("/api/pass/forgot", {
      email: email,
      "g-recaptcha-token": captchaToken
    }).then(res => get(res, "status", false));
  }

  // Делаем запрос на изменение нового пароля после прохождения по ссылке из письма
  public resetPassForgot(params: resetPassForgotParamsInterface, captchaToken: string): Promise<any> {
    return r.post(`/api/pass/reset/${params.token}`, {
      email: params.email,
      url_token: params.token,
      password: params.password,
      password_confirmation: params.password_confirmation,
      "g-recaptcha-token": captchaToken
    }).then(res => get(res, "status", false));
  }

  // Выход из аккаунта
  public logout(): Promise<boolean> {
    return r.post("/api/logout").then(res => {
      if (!get(res, "status", false)) {
        return false;
      }

      token.clearToken();
      changeUserInfo(null);
      return true;
    });
  }
}


const userAuth = new UserAuthRepository(
  userAuthGoogle
);
export default userAuth;