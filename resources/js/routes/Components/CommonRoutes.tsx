import { trimStart } from "lodash";
import * as React from "react";
import { lazy } from "react";
import Loadable from "../../Components/Common/Utils/Loadable";

import MainLayout from "../../Components/Layout/MainLayout/MainLayout";
import { IRoute } from "../../utils/interfaces/route";
import { exceptRoutes } from "./no-seo-route-names";

// @ts-ignore
const SiteNewsPageList = Loadable(lazy(() => import("../../Components/Pages/SiteNews/SiteNewsPageList")));
// @ts-ignore
const NewsInfoPage = Loadable(lazy(() => import("../../Components/Pages/SiteNews/NewsInfoPage")));


// Общие роуты, где шаблон меняется в зависимости аутентифицирован юзер или нет
const CommonRoutes: IRoute = {
  path: ":lang",
  element: <MainLayout/>,
  children: [
    {
      // новости сайта
      path: "news",
      element: <SiteNewsPageList/>
    },
    {
      // конкретная новость сайта
      path: trimStart(exceptRoutes.infoNews.regex, "/"),
      element: <NewsInfoPage/>
    }
  ]
};

export default CommonRoutes;
