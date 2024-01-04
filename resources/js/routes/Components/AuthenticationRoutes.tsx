import { trimStart } from "lodash";
// @ts-ignore
import React, { lazy } from "react";
import Loadable from "../../Components/Common/Utils/Loadable";
import MainLayout from "../../Components/Layout/MainLayout/MainLayout";
import MinimalLayout from "../../Components/Layout/MinimalLayout/MinimalLayout";
import { NotVerifyEmailURL } from "../../store/constant";
import { IRoute } from "../../utils/interfaces/route";

// @ts-ignore
const LoginPage = Loadable(lazy(() => import("../../Components/Pages/Auth/Login/Login")));
// @ts-ignore
const RegisterPage = Loadable(lazy(() => import("../../Components/Pages/Auth/Register/Register")));
// @ts-ignore
const VerifyEmailPage = Loadable(lazy(() => import("../../Components/Pages/Auth/VerifyEmail/VerifyEmailWrapper")));
// @ts-ignore
const LogoutPage = Loadable(lazy(() => import("../../Components/Pages/Auth/Logout/Logout")));
// @ts-ignore
const PasswordResetPage = Loadable(lazy(() => import("../../Components/Pages/Auth/PasswordReset/PasswordReset")));
// @ts-ignore
const PasswordResetConfirmPage = Loadable(lazy(() => import("../../Components/Pages/Auth/PasswordReset/PasswordResetConfirm")));
// @ts-ignore
const LandingPage = Loadable(lazy(() => import("../../Components/Pages/Landing/LandingPage")));

const AuthenticationRoutes: IRoute = {
  path: ":lang",
  element: <MinimalLayout/>,
  children: [
    { path: "", element: <LandingPage/> },
    { path: "login", element: <LoginPage/> },
    { path: "register", element: <RegisterPage/> },
    { path: "password/reset", element: <PasswordResetPage/> },
    { path: "pass/forgot/:email/:token", element: <PasswordResetConfirmPage/> },
    { path: "logout", element: <LogoutPage/> }
  ]
};

export const AuthLoggedRoutes: IRoute = {
  path: ":lang",
  element: <MainLayout needAuth/>,
  children: [
    {
      path: trimStart(NotVerifyEmailURL, "/"),
      element: <VerifyEmailPage/>
    }
  ]
};

export default AuthenticationRoutes;
