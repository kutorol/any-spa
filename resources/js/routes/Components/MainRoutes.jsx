import React, { lazy } from 'react'

import Loadable from '../../Components/Common/Utils/Loadable';
import MainLayout from "../../Components/Layout/MainLayout/MainLayout";
import NotFoundPage from "../../Components/Pages/NotFound/NotFoundPage";
import MinimalLayout from "../../Components/Layout/MinimalLayout/MinimalLayout";

const DashboardPage = Loadable(lazy(() => import('../../Components/Pages/Dashboard/DashboardPage')));
const SamplePage = Loadable(lazy(() => import('../../Components/Pages/Sample/SamplePage')));


const NotFound = {
  path: '/',
  element: <MinimalLayout/>,
  children: [
    {
      path: '*',
      element: <NotFoundPage/>
    }
  ]
};

const MainRoutes = {
  path: '/',
  element: <MainLayout/>,
  children: [
    {
      path: 'dash',
      element: <DashboardPage/>
    },
    {
      path: '',
      element: <SamplePage/>,
    },
  ]
};

export { MainRoutes, NotFound };
