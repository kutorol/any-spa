import { cloneDeep } from "lodash";
import { ELanguages } from "../../../../utils/enums/user";
import { __ } from "../../../../utils/funcs/locale";
import store from "../../../store";
import { set } from "../../common/seo";

export interface ISeoDuplicatesRel {
  locale: ELanguages;
  link: string;
}

export interface ISeoFields {
  title?: string;
  desc?: string;
  h1?: string;
  image?: string;
}

interface ISeoTitles {
  [key: string]: ISeoFields;
}

const seoTitles: ISeoTitles = {};

export const checkExistsPath = (path: string): boolean => {
  return typeof seoTitles[path] !== "undefined";
};

export const setExistsPath = (path: string): ISeoFields => {
  return changeSeo(path, seoTitles[path] || { title: null, desc: null, h1: null });
};

// changeSeo Изменяет seo страницы (установка title и прочих тегов)
export const changeSeo = (path: string, seo: ISeoFields, duplicates?: ISeoDuplicatesRel[]): ISeoFields => {
  const s = cloneDeep(seo);
  s.desc = s.desc ? s.desc.slice(0, 255) : s.desc;

  const defaultText = __("У страницы еще нет названия");
  s.title = s.title || defaultText;
  s.desc = s.desc || defaultText;
  s.h1 = s.h1 || defaultText;
  s.image = s.image || "";

  seoTitles[path] = s;

  document.title = s.title;
  document.querySelector(`meta[name="og:title"]`).setAttribute("content", s.title);
  document.querySelector(`meta[name="og:description"]`).setAttribute("content", s.desc);
  document.querySelector(`meta[name="description"]`).setAttribute("content", s.desc);
  document.querySelector(`meta[name="og:image"]`).setAttribute("content", s.image);
  document.querySelector(`meta[name="og:url"]`).setAttribute("content", window.location.href);

  // удаляем предыдущие rel метаданные
  const alternateLinks = document.querySelectorAll("link[rel=\"alternate\"]");
  alternateLinks.forEach(link => link.parentNode.removeChild(link));

  const headElement = document.head || document.getElementsByTagName("head")[0];
  (duplicates || []).map((d: ISeoDuplicatesRel) => {
    const linkElement = document.createElement("link");
    linkElement.rel = "alternate";
    linkElement.href = d.link;
    linkElement.hreflang = d.locale.toString();

    // Вставляем созданный элемент в head
    headElement.appendChild(linkElement);
  });

  store.dispatch(set(seo));

  return s;
};