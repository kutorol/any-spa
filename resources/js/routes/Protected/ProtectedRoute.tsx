// @ts-ignore
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = () => {
  const location = useLocation()
  // @ts-ignore
  if (useSelector(s => s.userInfo.isLogged)) {
    return <Outlet/>
  }

  return (
    <Navigate
      to="/"
      state={{ from: `${location.pathname}${location.search}` }}
      replace
    />
  )
}
