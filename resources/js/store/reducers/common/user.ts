import { createSlice } from "@reduxjs/toolkit";
// @ts-ignore
import { cloneDeep, get, toNumber } from "lodash";
import { isEnumLocale } from "../../../utils/ajax/chains-http/locale";
import { ELanguages, ERoles, ESex } from "../../../utils/enums/user";
import { IUserInterface } from "../../../utils/interfaces/user";

let defaultLang = ELanguages.RU;
// @ts-ignore
if (isEnumLocale(window.siteLocale || "")) {
  // @ts-ignore
  defaultLang = window.siteLocale as ELanguages;
}

export const defaultUser: IUserInterface = {
  uid: 0,
  verified_email: false,
  full_name: "",
  first_name: "",
  last_name: "",
  surname: "",
  email: "",
  role: ERoles.GUEST,
  locale: defaultLang,
  is_am_pm: false,
  phone: null,
  sex: ESex.MALE,
  avatar: null,
  age: 0,
  agreement_confirmed_at: null,
  gmt: 3,
  city: null
};

export const createUserInfoReducer = () => {
  return createSlice({
    name: "userInfoReducer",
    initialState: {
      isLogged: false,
      user: defaultUser
    },
    reducers: {
      set: (state, action) => {
        const { user, isLogged } = action.payload;
        state.isLogged = isLogged;
        state.user = user;
      },
      clear: (state) => {
        state.user = defaultUser;
        state.isLogged = false;
      }
    }
  });
};

export const userInfoReducer = createUserInfoReducer();

// Action creators are generated for each case reducer function
export const { set, clear } = userInfoReducer.actions;

export default userInfoReducer.reducer;
