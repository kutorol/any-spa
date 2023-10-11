import { createSlice } from "@reduxjs/toolkit";
import Locale from "../../../utils/funcs/locale";
import store from "../../store";

export const changeLocale = (locale: string = "ru") => {
  store.dispatch(localeReducer.actions.set({
    val: locale
  }));
};

export const createLocaleReducer = () => {
  return createSlice({
    name: "localeReducer",
    initialState: {
      // @ts-ignore
      val: window.siteLocale || "ru"
    },
    reducers: {
      set: (state, action) => {
        const { val } = action.payload;
        if (Locale.locale.isLocale(val)) {
          state.val = val;
        }
      }
    }
  });
};

export const localeReducer = createLocaleReducer();

// Action creators are generated for each case reducer function
export const { set } = localeReducer.actions;

export default localeReducer.reducer;
