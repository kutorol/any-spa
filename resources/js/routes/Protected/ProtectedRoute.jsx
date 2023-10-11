import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = () => {
  const location = useLocation()
  if (useSelector(state => state.userInfo.isLogged)) {
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
