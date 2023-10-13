import { get } from "lodash";
import { changeFullScreenLoaderState } from "../../store/reducers/common/full-screen-loader";
import { createErrMgs } from "../../store/reducers/snackbar/error-snackbar";
import store from "../../store/store";
import r from "../ajax";
import Locale from "../funcs/locale";
import { googleAuthInterface, userSocialAuth } from "./interfaces";

class userGoogleRepository implements userSocialAuth {
  // @ts-ignore Получение данных от гугла по юзера
  public async fetchData(url: string, accessToken: string): googleAuthInterface {
    // получаем инфу о юзере
    return await r.getOutside(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json"
      }
    });
  }

  // Запрос на сервер с авторизацией/регистрацией
  public auth(res: googleAuthInterface, captchaToken: string): Promise<boolean> {
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
      .then(res => {
        changeFullScreenLoaderState(false);
        return get(res, "status", false);
      });
  }
}

const userAuthGoogle = new userGoogleRepository();
export default userAuthGoogle;
