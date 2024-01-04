import * as React from "react";
import { lazy } from "react";
import Loadable from "../../Components/Common/Utils/Loadable";
import MainLayout from "../../Components/Layout/MainLayout/MainLayout";
import { EFavorite } from "../../utils/enums/user";
import { IRoute } from "../../utils/interfaces/route";
// @ts-ignore
const UserSettingsPage = Loadable(lazy(() => import("../../Components/Pages/User/Settings/UserSettingsPage")));
// @ts-ignore
const UserFavoritePage = Loadable(lazy(() => import("../../Components/Pages/User/Favorite/UserFavoritePage")));


const UserRoutes: IRoute = {
  path: ":lang",
  element: <MainLayout needAuth/>,
  children: [
    ...[1, 2, 3].map((n: number) => ({
      path: `settings/${n}/:edit?`, element: <UserSettingsPage numTab={n}/>
    })),
    // @ts-ignore
    ...Object.values(EFavorite).map((f: EFavorite) => ({
      path: `favorite/${f}`, element: <UserFavoritePage favorite={f}/>
    }))
  ]
};

export default UserRoutes;