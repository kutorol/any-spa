import { cloneDeep } from "lodash";
import Locale from "../../../../utils/funcs/locale";
import store from "../../../store";
import { set } from "../../common/seo";

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

  store.dispatch(set(seo));
};