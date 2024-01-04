import * as React from "react";
import { lazy } from "react";
import Loadable from "../../Components/Common/Utils/Loadable";
import MainLayout from "../../Components/Layout/MainLayout/MainLayout";
import MinimalLayout from "../../Components/Layout/MinimalLayout/MinimalLayout";
import { IRoute } from "../../utils/interfaces/route";
// @ts-ignore
const AdminMainPage = Loadable(lazy(() => import("../../Components/Pages/Admin/Main/AdminMainPage")));
// @ts-ignore
const AdminNewsCreatePage = Loadable(lazy(() => import("../../Components/Pages/Admin/News/AdminNewsCreatePage")));
// @ts-ignore
const AdminNewsListPage = Loadable(lazy(() => import("../../Components/Pages/Admin/News/AdminNewsListPage")));
// @ts-ignore
const AdminNewsInfoPage = Loadable(lazy(() => import("../../Components/Pages/Admin/News/AdminNewsInfoPage")));
// @ts-ignore
const AdminTechSupportListPage = Loadable(lazy(() => import("../../Components/Pages/Admin/Special/TechSupport/AdminTechSupportListPage")));
// @ts-ignore
const AdminTechSupportInfoPage = Loadable(lazy(() => import("../../Components/Pages/Admin/Special/TechSupport/AdminTechSupportInfoPage")));
// @ts-ignore
const AdminLogsListPage = Loadable(lazy(() => import("../../Components/Pages/Admin/Logs/AdminLogsListPage")));
// @ts-ignore
const AdminLogsInfoPage = Loadable(lazy(() => import("../../Components/Pages/Admin/Logs/AdminLogsInfoPage")));
// @ts-ignore
const AdminI18nListPage = Loadable(lazy(() => import("../../Components/Pages/Admin/I18n/AdminI18nListPage")));
// @ts-ignore
const AdminFeatureToggleListPage = Loadable(lazy(() => import("../../Components/Pages/Admin/FeatureToggle/AdminFeatureToggleListPage")));
// @ts-ignore
const AdminABTestListPage = Loadable(lazy(() => import("../../Components/Pages/Admin/ABTest/AdminABTestListPage")));

const AdminRoutes: IRoute = {
  path: ":lang/admin",
  element: <MainLayout isAdmin/>,
  children: [
    // главная
    { path: "main", element: <AdminMainPage/> },
    // новости
    {
      path: "news",
      element: <MinimalLayout/>,
      children: [
        { path: "create", element: <AdminNewsCreatePage/> },
        { path: "list", element: <AdminNewsListPage/> },
        { path: ":id", element: <AdminNewsInfoPage/> }
      ]
    },
    // тех. поддержка
    {
      path: "tech-support",
      element: <MinimalLayout/>,
      children: [
        { path: "list", element: <AdminTechSupportListPage/> },
        { path: ":id", element: <AdminTechSupportInfoPage/> }
      ]
    },
    // Перевод страниц
    {
      path: "page-i18n",
      element: <MinimalLayout/>,
      children: [
        { path: "", element: <AdminI18nListPage/> }
      ]
    },
    // Фичатоглы
    {
      path: "toggle",
      element: <MinimalLayout/>,
      children: [
        { path: "", element: <AdminFeatureToggleListPage/> }
      ]
    },
    // A/B тесты
    {
      path: "ab",
      element: <MinimalLayout/>,
      children: [
        { path: "", element: <AdminABTestListPage/> }
      ]
    },
    // Логи сайта
    {
      path: "logs",
      element: <MinimalLayout/>,
      children: [
        { path: "", element: <AdminLogsListPage/> },
        { path: ":id", element: <AdminLogsInfoPage/> }
      ]
    }
  ]
};

export default AdminRoutes;