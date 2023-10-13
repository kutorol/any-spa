import { createSlice } from "@reduxjs/toolkit";
// @ts-ignore
import { cloneDeep, get, toNumber } from "lodash";
import { Languages, Roles, Sex } from "../../../utils/enums/common/enums";
import Locale from "../../../utils/funcs/locale";
import { UserInterface } from "../../../utils/repository/interfaces";
import store from "../../store";

const defaultUser: UserInterface = {
  uid: 0,
  verified_email: false,
  full_name: "",
  first_name: "",
  last_name: "",
  surname: "",
  email: "",
  roleTitle: "",
  role: Roles.GUEST,
  locale: Languages.RU,
  is_am_pm: false,
  phone: null,
  sex: Sex.MALE,
  avatar: null,
  age: 0
};

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

  store.dispatch(userInfoReducer.actions.set({
    isLogged: isLogged,
    uid: uid,
    user: u
  }));
};

export const createUserInfoReducer = () => {
  return createSlice({
    name: "userInfoReducer",
    initialState: {
      uid: 0,
      isLogged: false,
      user: defaultUser
    },
    reducers: {
      set: (state, action) => {
        const { user, isLogged, uid } = action.payload;
        state.isLogged = isLogged;
        state.user = user;
        state.uid = uid;
      },
      clear: (state) => {
        state.user = defaultUser;
        state.isLogged = false;
        state.uid = 0;
      }
    }
  });
};

export const userInfoReducer = createUserInfoReducer();

// Action creators are generated for each case reducer function
export const { set, clear } = userInfoReducer.actions;

export default userInfoReducer.reducer;
