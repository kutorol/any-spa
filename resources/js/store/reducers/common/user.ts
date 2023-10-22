import { createSlice } from "@reduxjs/toolkit";
// @ts-ignore
import { cloneDeep, get, toNumber } from "lodash";
import { Languages, Roles, Sex } from "../../../utils/enums/common/enums";
import { UserInterface } from "../../../utils/repository/interfaces";

export const defaultUser: UserInterface = {
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
