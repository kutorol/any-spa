// @ts-ignore
import { cloneDeep, get, toNumber } from "lodash";
import { Roles } from "../../../../utils/enums/common/enums";
import Locale from "../../../../utils/funcs/locale";
import { UserInterface } from "../../../../utils/repository/interfaces";
import store from "../../../store";
import { defaultUser, set } from "../../common/user";

const getRoleName = (role: Roles): string => {
  const { t } = Locale.locale;
  const roles: { [key in Roles]: string } = {
    [ Roles.SITE_ADMIN ]: t("Администратор сайта"),
    [ Roles.SITE_MANAGER ]: t("Менеджер сайта"),
    [ Roles.GYM_ADMIN ]: t("Администратор тренажерных залов"),
    [ Roles.GYM_MANAGER ]: t("Менеджер тренажерных залов"),
    [ Roles.GYM_TRAINER ]: t("Тренер тренажерных залов"),
    [ Roles.USER ]: t("Посетитель тренажерных залов"),
    [ Roles.GUEST ]: t("Аноним"),
    [ Roles.TEST_USER ]: t("Тестовый пользователь")
  };

  return roles[ role ];
};

export const changeUserInfo = (user?: UserInterface) => {
  const uid = user ? toNumber(get(user, "uid", 0)) : 0;
  const isLogged = uid > 0;

  const u = isLogged ? cloneDeep(user) : cloneDeep(defaultUser);
  u.roleTitle = getRoleName(<Roles>u.role);

  store.dispatch(set({
    isLogged: isLogged,
    uid: uid,
    user: u
  }));
};