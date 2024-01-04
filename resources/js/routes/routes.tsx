import * as React from "react";
import { useRoutes } from "react-router-dom";
import AdminRoutes from "./Components/AdminRoutes";
import AuthenticationRoutes, { AuthLoggedRoutes } from "./Components/AuthenticationRoutes";

import CommonRoutes from "./Components/CommonRoutes";
import { MainRoutes, NotFoundRoute } from "./Components/MainRoutes";
import SpecialRoutes from "./Components/SpecialRoutes";
import UserRoutes from "./Components/UserRoutes";

export const allRoutesElements = [
  MainRoutes,
  AdminRoutes,
  CommonRoutes,
  AuthenticationRoutes,
  AuthLoggedRoutes,
  SpecialRoutes,
  UserRoutes,
  NotFoundRoute
];

export default function ThemeRoutes() {
  return useRoutes(allRoutesElements);
}
