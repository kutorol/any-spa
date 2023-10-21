import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import Locale from "../../../utils/funcs/locale";
import store from "../../store";

interface ISeoFields {
  title?: string;
  desc?: string;
  h1?: string;
}

interface ISeoTitles {
  [ key: string ]: ISeoFields;
}

const seoTitles: ISeoTitles = {};

export const checkExistsPath = (path: string): boolean => {
  return typeof seoTitles[ path ] !== "undefined";
};

export const setExistsPath = (path: string): void => {
  changeSeo(path, seoTitles[ path ]);
};

export const changeSeo = (path: string, seo: ISeoFields): void => {
  const s = cloneDeep(seo);
  const defaultText = Locale.locale.t("no_exists_such_page_seo");
  s.title = s.title || defaultText;
  s.desc = s.desc || defaultText;
  s.h1 = s.h1 || defaultText;

  seoTitles[ path ] = s;

  document.title = s.title;
  document.querySelector(`meta[name="og:title"]`).setAttribute("content", s.title);
  document.querySelector(`meta[name="og:description"]`).setAttribute("content", s.desc);
  document.querySelector(`meta[name="description"]`).setAttribute("content", s.desc);

  store.dispatch(seoReducer.actions.set(seo));
};

export const createSeoReducer = () => {
  return createSlice({
    name: "seoReducer",
    initialState: {
      title: "",
      desc: "",
      keywords: ""
    },
    reducers: {
      set: (state, action) => {
        const { title, desc, keywords } = action.payload;
        state.title = title;
        state.desc = desc;
        state.keywords = keywords;
      }
    }
  });
};

export const seoReducer = createSeoReducer();

// Action creators are generated for each case reducer function
export const { set } = seoReducer.actions;

export default seoReducer.reducer;
