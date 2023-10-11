import { TokenResponse } from "@react-oauth/google";
import { get } from "lodash";
import { changeFullScreenLoaderState } from "../../../store/reducers/common/fullScreenLoader";
import { createErrMgs } from "../../../store/reducers/snackbar/error-snackbar";
import store from "../../../store/store";
import Locale from "../../funcs/locale";
import r from "../index";

// Класс получения инфы юзера от гугла и авторизации на сайте
export class GoogleOAuth {
  // запущен ли процесс авторизации
  public static process: boolean = false;
  // какой url дергать, чтобы получить инфу юзера
  private readonly googleUrl: string = "https://www.googleapis.com/oauth2/v1/userinfo?access_token=";

  constructor(
    // Токены от google auth
    private readonly tokens: Omit<TokenResponse, "error"|"error_description"|"error_uri">,
    // promise с получением токена recaptcha v3
    private readonly handleReCaptchaVerify: any
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
    const res = await r.getOutside(this.googleUrl + this.tokens.access_token, {
      headers: {
        Authorization: `Bearer ${this.tokens.access_token}`,
        Accept: "application/json"
      }
    });

    if (!res.id) {
      createErrMgs(Locale.locale.t("Не удалось получить ответ от сервера Google для авторизации на сайте"));
      return;
    }

    await this.handleReCaptchaVerify().then(captchaToken => {
      changeFullScreenLoaderState(true);

      return r.post("/api/oauth/google", {
        id: res.id,
        // @ts-ignore
        locale: get(res, "locale", store.getState().locale.val),
        avatar: get(res, "picture", null),
        email: get(res, "email", ""),
        name: `${get(res, "family_name", "")} ${get(res, "given_name", "")}`.trim(),
        "g-recaptcha-token": captchaToken
      })
        .catch(e => {
          console.error("System error", e);
          let errs = Locale.locale.t("Не удалось пройти проверку каптчи от Google. Попробуйте еще раз или обновите страницу");
          if (e.message || "") {
            errs = `${Locale.locale.t("Ошибка сайта")}: ${e.toString()}`;
          }

          createErrMgs(errs);
          return false;
        })
        .then(res => get(res, "status", false));
    }).then(res => changeFullScreenLoaderState(false));
  }
}