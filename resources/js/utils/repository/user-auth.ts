import { get } from "lodash";
import { hasConfirmCookieLocalStorage } from "../../Components/Common/Utils/Cookie/CookieConfirm";
import { changeFullScreenLoaderState } from "../../store/reducers/func/common/full-screen-loader";
import { changeUserInfo } from "../../store/reducers/func/common/user";
import store from "../../store/store";
import r from "../ajax";
import token from "../ajax/token";
import { ERoles } from "../enums/user";
import { IGoogleAuthInterface } from "../interfaces/google-auth";
import {
  ILoginPropsInterface,
  IRegisterFormValuesInterface,
  IResetPassForgotParamsInterface
} from "../interfaces/user";
import { IUserSocialAuth } from "../interfaces/user-auth";
import userAuthGoogleRep from "./google-auth";

class UserAuthRepository {
  constructor(
    private readonly google: IUserSocialAuth
  ) {
  }

  // получение инфы из гугла о юзере
  public fetchData(url: string, accessToken: string): IGoogleAuthInterface {
    return this.google.fetchData(url, accessToken);
  }

  // Логин/регистрация через гугл
  public googleAuth(res: IGoogleAuthInterface, captchaToken: string, chosenRole?: ERoles): Promise<boolean> {
    return this.google.auth(res, captchaToken, chosenRole);
  }

  // Вход по email и паролю
  public login(formValues: ILoginPropsInterface, captchaToken: string): Promise<boolean> {
    return r.post("/api/login", {
      email: formValues.email,
      password: formValues.password,
      confirmAgreement: hasConfirmCookieLocalStorage() ? 1 : 0,
      "g-recaptcha-token": captchaToken,
      successMsgTimeout: 1000
    }).then(res => get(res, "status", false));
  }

  // Регистрация юзера
  public register(formValues: IRegisterFormValuesInterface, captchaToken: string): Promise<boolean> {
    return r.post("/api/register", {
      name: `${formValues.last_name} ${formValues.first_name} ${formValues.sur_name}`,
      email: formValues.email,
      password: formValues.password,
      password_confirmation: formValues.password_confirmation,
      role: formValues.role,
      confirmAgreement: hasConfirmCookieLocalStorage() ? 1 : 0,
      locale: store.getState().userInfo.user.locale,
      "g-recaptcha-token": captchaToken
    }).then(res => get(res, "status", false));
  }

  // Снова отсылает письмо для подтверждения email
  public sendVerifyEmail(cb = (res: object) => {
  }) {
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
  public resetPassForgot(params: IResetPassForgotParamsInterface, captchaToken: string): Promise<any> {
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
    return r.post("/api/logout", {
      successMsgTimeout: 1000
    }).then(res => {
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
  userAuthGoogleRep
);
export default userAuth;