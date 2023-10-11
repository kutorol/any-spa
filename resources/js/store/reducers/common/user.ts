import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep, get, toNumber } from "lodash";
import store from "../../store";
import Locale from "../../../utils/funcs/locale";

const defaultUser = {
  uid: 0,
  verified_email: false,
  full_name: "",
  first_name: "",
  last_name: "",
  surname: "",
  email: "",
  role: "guest",
  locale: "ru",
  is_am_pm: false,
  phone: null,
  sex: "male",
  avatar: null,
  age: 0
};


const getRoleName = (role: string): string => {
  const roles = {
    "site_admin": Locale.locale.t("Администратор сайта"),
    "site_manager": Locale.locale.t("Менеджер сайта"),
    "gym_admin": Locale.locale.t("Администратор тренажерных залов"),
    "gym_manager": Locale.locale.t("Менеджер тренажерных залов"),
    "gym_trainer": Locale.locale.t("Тренер тренажерных залов"),
    "user": Locale.locale.t("Посетитель тренажерных залов"),
    "guest": Locale.locale.t("Аноним"),
    "test_user": Locale.locale.t("Тестовый пользователь")
  };

  return roles[ role ];
};

export const changeUserInfo = (user: object) => {
  const uid = user ? toNumber(get(user, "uid", 0)) : 0;
  const isLogged = uid > 0;

  const u = isLogged ? cloneDeep(user) : cloneDeep(defaultUser);
  u.roleTitle = getRoleName(u.role);

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
        state.uid = user;
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
