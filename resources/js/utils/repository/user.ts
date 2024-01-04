import { get } from "lodash";
import { userDataParam } from "../../store/constant";
import { changeFullScreenLoaderState } from "../../store/reducers/func/common/full-screen-loader";
import r from "../ajax";
import { ELanguages } from "../enums/user";
import { IPassInfo, IUpdateUserInfo, IUserInterface } from "../interfaces/user";

class UserRepository {
  // Обновляет текущего юзера
  public updateInfo(toUrl: string, userInfo: IUpdateUserInfo): Promise<any> {
    changeFullScreenLoaderState(true);
    return r.post("/api/user/change-profile", userInfo).then(res => {
      if (!get(res, "status", false)) {
        return res;
      }

      const user = <IUserInterface>get(res, `data.${userDataParam}`, null);
      if (!user) {
        window.location.href = toUrl;
        return res;
      }

      return res;
    }).then((res: any) => {
      changeFullScreenLoaderState(false);
      return res;
    });
  }

  // Обновляет пароль с заменой токенов
  public updatePass(passInfo: IPassInfo): void {
    changeFullScreenLoaderState(true);
    r.post("/api/user/change-password", passInfo).then(() => {
      changeFullScreenLoaderState(false);
    });
  }

  // Подтверждает согласие с куками
  public confirmAgreement(): void {
    r.put("/api/user/confirm-agreement");
  }

  // Изменяет аватар
  public changeAvatar(f: File): void {
    const formData = new FormData();
    formData.append("attachment", f);

    changeFullScreenLoaderState(true);
    r.post("/api/user/change-avatar", {
      formData: formData,
      headers: {
        "Accept": "multipart/form-data"
      }
    }).then(() => {
      changeFullScreenLoaderState(false);
    });
  }

  // Изменяет язык юзера
  public changeLocale(l: ELanguages): Promise<boolean> {
    return r.put("/api/user/change-locale", {
      locale: l
    }).then(res => Boolean(res.status));
  }
}

const userRep = new UserRepository();
export default userRep;