import { TokenResponse } from "@react-oauth/google";
// @ts-ignore
import { get } from "lodash";
import { createErrMgs } from "../../../store/reducers/func/snackbar/error-snackbar";
import { ERoles } from "../../enums/user";
import { __ } from "../../funcs/locale";
import userAuth from "../../repository/user-auth";

// Класс получения инфы юзера от гугла и авторизации на сайте
export class GoogleOAuth {
  // запущен ли процесс авторизации
  public static process: boolean = false;
  // какой url дергать, чтобы получить инфу юзера
  private readonly googleUrl: string = "https://www.googleapis.com/oauth2/v1/userinfo?access_token=";

  constructor(
    // Токены от google auth
    private readonly tokens: Omit<TokenResponse, "error" | "error_description" | "error_uri">,
    // promise с получением токена recaptcha v3
    private readonly handleReCaptchaVerify: any,
    // выбранная роль при регистрации
    private readonly chosenRole?: ERoles
  ) {
    if (GoogleOAuth.process) {
      createErrMgs("Процесс авторизации через Google уже запущен");
      return;
    }

    GoogleOAuth.process = true;
    this.fetchUserData();
    GoogleOAuth.process = false;
  }

  // @ts-ignore
  private async fetchUserData() {
    // получаем инфу о юзере
    const res = await userAuth.fetchData(this.googleUrl + this.tokens.access_token, this.tokens.access_token);
    if (!res.id) {
      createErrMgs(__("Не удалось получить ответ от сервера Google для авторизации на сайте"));
      return;
    }

    await this.handleReCaptchaVerify().then(captchaToken => {
      return userAuth.googleAuth(res, captchaToken, this.chosenRole);
    });
  }
}