// @ts-ignore
import dayjs from "dayjs";
import { cloneDeep, get, toNumber } from "lodash";
import { changeLocale } from "../../../../utils/funcs/locale";
import { IUserInterface } from "../../../../utils/interfaces/user";
import store from "../../../store";
import { defaultUser, set } from "../../common/user";

// Изменяет данные по юзеру
export const changeUserInfo = (user?: IUserInterface) => {
  const uid = user ? toNumber(get(user, "uid", 0)) : 0;
  const isLogged = uid > 0;

  const u = <IUserInterface>(user ? cloneDeep(user) : cloneDeep(defaultUser));

  changeLocale(u.locale);

  store.dispatch(set({
    isLogged: isLogged,
    user: u
  }));
};

// Обновляет только часть юзера
export const changeUserInfoChunkData = (chunksData: object) => {
  const user = { ...store.getState().userInfo.user, ...chunksData };
  changeUserInfo(user);
};