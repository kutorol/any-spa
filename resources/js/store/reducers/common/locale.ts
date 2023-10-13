import { createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";
import { Languages } from "../../../utils/enums/common/enums";
import Locale from "../../../utils/funcs/locale";
import store from "../../store";

export const changeLocale = (locale: Languages = Languages.RU) => {
  store.dispatch(localeReducer.actions.set({
    val: locale
  }));
};

export const createLocaleReducer = () => {
  return createSlice({
    name: "localeReducer",
    initialState: {
      val: get(window, "siteLocale", Languages.RU)
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
