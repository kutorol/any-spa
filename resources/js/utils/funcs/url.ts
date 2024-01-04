import { toNumber, trimEnd, trimStart } from "lodash";
import { match, pathToRegexp } from "path-to-regexp";
import { exceptRoutes, IExceptRoutesInfo } from "../../routes/Components/no-seo-route-names";
import store from "../../store/store";
import { isEnumLocale } from "../ajax/chains-http/locale";
import { ELanguages } from "../enums/user";
import RouterAPI from "./router-api";

export const PAGE_KEY_URL = "page";

// canBackURL Возвращает true, если можно вернуть страницу "назад"
export const canBackURL = (): boolean => {
  return window.history.state && window.history.state.idx > 0;
};

// navToBackOrDefaultURL Или страницу "назад" возвращает или редиректит на указанный url
export const navToBackOrDefaultURL = (toURL?: string): void => {
  toURL = toURL ? toURL : "/";
  // @ts-ignore
  RouterAPI.nav(canBackURL() ? -1 : getUrl(toURL));
};

export const navTo = (toURL: string, withoutPrepare?: boolean): void => {
  RouterAPI.nav(withoutPrepare ? toURL : getUrl(toURL));
};

// findSearchParam Находит нужный параметр в url после "?"
export const findSearchParam = (key: string, loc?: { search: string; }): null | string => {
  if (!loc) {
    loc = window.location;
  }

  const params = new URLSearchParams(loc.search);
  if (!params.has(key)) {
    return null;
  }

  return params.get(key);
};

// getPageFromUrl Возвращает текущее значение page
export const getPageFromUrl = (totalPages?: number, loc?: { search: string; }): number => {
  const res = findSearchParam(PAGE_KEY_URL, loc);
  if (res === null) {
    return 1;
  }

  const page = toNumber(res);
  if ((totalPages > 0 && page > totalPages) || page < 1) {
    return 1;
  }

  return page;
};

// removeParam Убирает из url после "?" переданный параметр
export const removeParam = (key: string, sourceURL: string) => {
  const search = sourceURL.split("?");
  if (search.length < 2 || search[1].trim() === "") {
    return "";
  }

  const params = search[1].split("&");

  for (let i = 0; i < params.length; i++) {
    const param = params[i].split("=")[0];
    if (param === key) {
      params.splice(i, 1);
    }
  }

  return params.join("&");
};

// createSearchUrlWithPage Создает url после "?" с указанием страницы
export const createSearchUrlWithPage = (page?: number | null, loc?: { search: string; }): string => {
  if (!loc) {
    loc = window.location;
  }

  const pageParam = `${page === 1 ? "" : `${PAGE_KEY_URL}=${page}`}`;
  if (!loc.search.trim()) {
    return getPageParam(pageParam, "?");
  }

  const otherParams = removeParam(PAGE_KEY_URL, loc.search);

  return `${getPageParam(otherParams, "?")}${getPageParam(pageParam, otherParams === "" ? "?" : "&")}`;
};

// getPageParam Отдает параметр страницы с указанием ? или &
const getPageParam = (pageParam: string, separator?: string): string => {
  return pageParam !== "" ? `${separator}${pageParam}` : "";
};

// saveCurrentPage Сохраняет текущую страницу юзера
export const saveCurrentPage = (): void => {
  const currentPage = localStorage.getItem("current_page") || window.location.href;
  localStorage.setItem("last_page", currentPage);
  localStorage.setItem("current_page", window.location.href);
};

// getLastPage Возвращает предыдущую страницу пользователя
export const getLastPage = (): string => {
  const lastPage = localStorage.getItem("last_page") || "";
  if (!lastPage.trim()) {
    return window.location.href;
  }

  return lastPage;
};

// checkIfLastPageValid Возвращает true, если ссылка прошлой страницы является текущим сайтом (не подделка)
export const checkIfLastPageValid = (): boolean => {
  const lastPage = getLastPage();

  return lastPage.split(window.location.origin)[0].trim() === "";
};

// Возвращает url с учетом языка
export const getUrl = (to: string): string => {
  const locale: ELanguages = store.getState().userInfo.user.locale;
  const lang = locale.toString().toLowerCase();

  return trimEnd(`/${lang}/${trimStart(to, "/")}`, "/");
};

// getUrlByLocale Возвращает текущий URL с проверкой, на какой конкретно URL редиректить относительно текущего URL
export const getCurrentUrlByLocale = (l: ELanguages): string => {
  const { pathname } = window.location;
  // Находит те url, для которых не требуется SEO и с которых нужно сделать редирект на определенную страницу
  // @ts-ignore
  const item: IExceptRoutesInfo = Object.values(exceptRoutes).find((path: IExceptRoutesInfo) => {
    const regex = pathToRegexp(`/:lang/${trimStart(path.regex, "/")}`);
    const res = match(regex, { decode: decodeURIComponent })(pathname);

    return Boolean(res);
  });

  if (item && item.redirectURL) {
    return `/${l.toString()}/${trimStart(item.redirectURL, "/")}`;
  }

  let url = currentURLByLocale(l);
  return `${url.split("?")[0]}?${removeParam(PAGE_KEY_URL, url)}`;
};

// Возвращает текущий относительный путь с указанием новой локали
export const currentURLByLocale = (l: ELanguages): string => {
  let fullURL = window.location.href.split(window.location.origin)[1];
  fullURL = trimEnd(trimStart(fullURL, "/"), "/");
  const parts = fullURL.split("/");
  if (!isEnumLocale(parts[0])) {
    parts.unshift(l.toString());
  }

  parts[0] = l.toString().toLowerCase();

  return `/${parts.join("/")}`;
};