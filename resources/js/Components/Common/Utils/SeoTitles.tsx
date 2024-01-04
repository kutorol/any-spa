import { get, trimStart } from "lodash";
import { match, pathToRegexp } from "path-to-regexp";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { exceptRoutes, IExceptRoutesInfo } from "../../../routes/Components/no-seo-route-names";
import { allRoutesElements } from "../../../routes/routes";

import { changeAppInitState } from "../../../store/reducers/func/common/app-init";
import { changeSeo, checkExistsPath, setExistsPath } from "../../../store/reducers/func/common/seo";
import { RootState } from "../../../store/store";
import r from "../../../utils/ajax";
import { __ } from "../../../utils/funcs/locale";
import { IRoute } from "../../../utils/interfaces/route";

// Это страница админки?
export const isAdminPage = (): boolean => {
  const { pathname } = window.location;
  const splitURL = trimStart(pathname, "/").split("/");
  return get(splitURL, "1", "").toLowerCase() === "admin";
};

// Является ли данный route нужным, чтобы запрашивать seo по нему
export const isCurrentRouteWithSeo = (): boolean => {
  if (isAdminPage()) {
    return false;
  }

  const { pathname } = window.location;
  // @ts-ignore
  return !Boolean(Object.values(exceptRoutes).find((path: IExceptRoutesInfo) => {
    const regex = pathToRegexp(`/:lang/${trimStart(path.regex, "/")}`);
    const res = match(regex, { decode: decodeURIComponent })(pathname);

    return Boolean(res);
  }));
};

// Находит, совпадает ли конкретный роут с дочерними элементами
const findCurrentRouteByChildren = (path: string, pathname: string, children: IRoute[]): boolean => {
  for (let i = 0; i < children.length; i++) {
    const nextPath = `${path}/${trimStart(children[i].path, "/")}`;

    const regex = pathToRegexp(nextPath);
    const res = match(regex, { decode: decodeURIComponent })(pathname);

    if (Boolean(res)) {
      return true;
    }
    if ((children[i].children || []).length === 0) {
      continue;
    }

    if (findCurrentRouteByChildren(nextPath, pathname, children[i].children)) {
      return true;
    }
  }

  return false;
};

// Находит текущий роут, который задействован
export const findCurrentRoute = (pathname: string): undefined | IRoute => {
  // @ts-ignore
  return allRoutesElements.find((r: IRoute) => {
    try {
      const path = `/${trimStart(r.path, "/")}`;
      const regex = pathToRegexp(path);
      const res = match(regex, { decode: decodeURIComponent })(pathname);

      if (Boolean(res)) {
        return true;
      }

      if ((r.children || []).length === 0) {
        return false;
      }
      if (findCurrentRouteByChildren(path, pathname, r.children)) {
        return true;
      }

      return false;
    } catch(e) {
    }

    return false;
  });
};

const SeoTitles = () => {
  const location = useLocation();
  const isAppInit: boolean = useSelector((s: RootState) => s.appInit.init as boolean);

  useEffect(() => {
    if (!isAppInit) {
      return;
    }

    // проверяем, что ранее уже устанавливали данный путь
    if (checkExistsPath(location.pathname)) {
      setExistsPath(location.pathname);
      return;
    }

    // это страница админки?
    if (isAdminPage()) {
      changeSeo(location.pathname, { title: __("Зона администраторов") });
      return;
    }

    const currentRouteExists = Boolean(findCurrentRoute(location.pathname));
    // Если это 404 страница (роут не существует) или для этого роута не нужно подтягивать название
    if (!currentRouteExists || !isCurrentRouteWithSeo()) {
      changeSeo(location.pathname, { title: __("У страницы еще нет названия") });
      return;
    }

    // Делаем запрос на получение SEO данных от сервера
    changeAppInitState(true, true);
    r.get("/api/seo-page-info", { path: location.pathname }).then(res => {
      if (get(res, "status", false)) {
        changeSeo(location.pathname, get(res, "data.seo", {}));
      }
      changeAppInitState(true, false);
    });
  }, [isAppInit, location.pathname]);

  return null;
};

export default SeoTitles;