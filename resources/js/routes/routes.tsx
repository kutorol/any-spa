// @ts-ignore
import React from 'react'
import { useRoutes } from 'react-router-dom';

import { MainRoutes, NotFound } from './Components/MainRoutes';
import AuthenticationRoutes, { AuthLoggedRoutes } from './Components/AuthenticationRoutes';

export default function ThemeRoutes() {
  return useRoutes([
    MainRoutes,
    AuthenticationRoutes,
    AuthLoggedRoutes,
    NotFound
  ]);
}
