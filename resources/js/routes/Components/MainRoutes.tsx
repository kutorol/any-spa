import * as React from "react";
import { lazy } from "react";
import Loadable from "../../Components/Common/Utils/Loadable";
import MainLayout from "../../Components/Layout/MainLayout/MainLayout";
import MinimalLayout from "../../Components/Layout/MinimalLayout/MinimalLayout";
import { IRoute } from "../../utils/interfaces/route";

// @ts-ignore
// const DashboardPage = Loadable(lazy(() => import("../../Components/Pages/Dashboard/DashboardPage")));
// @ts-ignore
// const SamplePage = Loadable(lazy(() => import("../../Components/Pages/Sample/SamplePage")));
// @ts-ignore
const MainPage = Loadable(lazy(() => import("../../Components/Pages/Main/MainPage")));
// @ts-ignore
const NotFoundPage = Loadable(lazy(() => import("../../Components/Pages/NotFound/NotFoundPage")));

const NotFoundRoute: IRoute = {
  path: ":lang",
  element: <MinimalLayout/>,
  children: [{ path: "*", element: <NotFoundPage/> }]
};

const MainRoutes: IRoute = {
  path: ":lang",
  element: <MainLayout/>,
  children: [
    // { path: "dash", element: <DashboardPage/> },
    // Главная страница - вкладка "Юзер"
    { path: "", element: <MainPage/> },
    // Главная страница - вкладка "Админ"
    { path: "administrator", element: <MainPage isAdminTab/> }
  ]
};

export { MainRoutes, NotFoundRoute };
