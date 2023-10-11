import React, { lazy } from 'react'

import Loadable from '../../Components/Common/Utils/Loadable';
import MinimalLayout from '../../Components/Layout/MinimalLayout/MinimalLayout';
import NotFoundPage from "../../Components/Pages/NotFound/NotFoundPage";
import MainLayout from "../../Components/Layout/MainLayout/MainLayout";

const LoginPage = Loadable(lazy(() => import('../../Components/Pages/Auth/Login/Login')));
const RegisterPage = Loadable(lazy(() => import('../../Components/Pages/Auth/Register/Register')));
const VerifyEmailPage = Loadable(lazy(() => import('../../Components/Pages/Auth/VerifyEmail/VerifyEmail')));
const LogoutPage = Loadable(lazy(() => import('../../Components/Pages/Auth/Logout/Logout')));
const PasswordResetPage = Loadable(lazy(() => import('../../Components/Pages/Auth/PasswordReset/PasswordReset')));
const PasswordResetConfirmPage = Loadable(lazy(() => import('../../Components/Pages/Auth/PasswordReset/PasswordResetConfirm')));

// ==============================|| Маршруты авторизации ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout/>,
  children: [
    { path: '/', element: <LoginPage/> },
    { path: '/login', element: <LoginPage/> },
    { path: '/register', element: <RegisterPage/> },
    { path: '/password/reset', element: <PasswordResetPage/> },
    { path: '/pass/forgot/:email/:token', element: <PasswordResetConfirmPage/> },
    // todo заменить компонент роута
    { path: '/term-of-use-private-policy', element: <NotFoundPage/> },
    { path: '/logout', element: <LogoutPage/> }
  ]
};

export const AuthLoggedRoutes = {
  path: '/',
  element: <MainLayout/>,
  children: [
    { path: '/verify-email', element: <VerifyEmailPage/> },
  ]
};

export default AuthenticationRoutes;
