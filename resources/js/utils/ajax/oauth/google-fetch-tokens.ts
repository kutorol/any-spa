import { NonOAuthError, TokenResponse } from "@react-oauth/google";
import { createErrMgs } from "../../../store/reducers/func/snackbar/error-snackbar";
import Locale from "../../funcs/locale";
import { GoogleOAuth } from "./google-auth";

// Класс хранит callback для получения токенов
export class GoogleFetchTokens {
  // при успешном получении, отправляем запрос на получение данных и авторизацию юзера на сайте
  public static onSuccess(tokens: Omit<TokenResponse, "error"|"error_description"|"error_uri">, handleReCaptchaVerify: any) {
    new GoogleOAuth(tokens, handleReCaptchaVerify);
  }

  public static onNonOAuthError(err: NonOAuthError) {
    let msg;
    switch (err.type) {
      case "popup_failed_to_open":
        msg = "Окно с авторизацией через Google не может быть открыто";
        break;

      case "popup_closed":
        msg = "Окно с авторизацией через Google был закрыт";
        break;

      case "unknown":
      default:
        msg = "Неизвестная ошибка авторизации через Google";
    }

    msg && createErrMgs(Locale.locale.t(msg));
  }

  public static onError(err: Pick<TokenResponse, "error"|"error_description"|"error_uri">) {
    console.error("Google login failed:", err);
    const errors = [
      Locale.locale.t("Произошла ошибка авторизации через Google")
    ];

    err.error && errors.push(err.error.toString());
    err.error_description && errors.push(err.error_description);
    err.error_uri && errors.push(err.error_uri);

    createErrMgs(errors);
  }
}
