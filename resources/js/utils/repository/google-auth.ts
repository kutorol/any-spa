import { get } from "lodash";
import { hasConfirmCookieLocalStorage } from "../../Components/Common/Utils/Cookie/CookieConfirm";
import { changeFullScreenLoaderState } from "../../store/reducers/func/common/full-screen-loader";
import { createErrMgs } from "../../store/reducers/func/snackbar/error-snackbar";
import store from "../../store/store";
import r from "../ajax";
import { ERoles } from "../enums/user";
import { __ } from "../funcs/locale";
import { IGoogleAuthInterface } from "../interfaces/google-auth";
import { IUserSocialAuth } from "../interfaces/user-auth";

class UserGoogleRepository implements IUserSocialAuth {
  // @ts-ignore Получение данных от гугла по юзера
  public async fetchData(url: string, accessToken: string): IGoogleAuthInterface {
    // получаем инфу о юзере
    return await r.getOutside(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json"
      }
    });
  }

  // Запрос на сервер с авторизацией/регистрацией
  public auth(res: IGoogleAuthInterface, captchaToken: string, chosenRole?: ERoles): Promise<boolean> {
    changeFullScreenLoaderState(true);
    return r.post("/api/oauth/google", {
      id: res.id,
      locale: store.getState().userInfo.user.locale,
      avatar: get(res, "picture", null),
      email: get(res, "email", ""),
      name: `${get(res, "family_name", "")} ${get(res, "given_name", "")}`.trim(),
      confirmAgreement: hasConfirmCookieLocalStorage() ? 1 : 0,
      "g-recaptcha-token": captchaToken,
      role: chosenRole || null
    })
      .catch(e => {
        console.error("System error", e);
        let errs = __("Не удалось пройти проверку каптчи от Google. Попробуйте еще раз или обновите страницу");
        if (e.message || "") {
          errs = `${__("Ошибка сайта")}: ${e.toString()}`;
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

const userAuthGoogleRep = new UserGoogleRepository();
export default userAuthGoogleRep;
