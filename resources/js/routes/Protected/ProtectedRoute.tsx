import * as React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState } from "../../store/store";
import { getUrl } from "../../utils/funcs/url";

export const ProtectedRoute = () => {
  const location = useLocation();
  // @ts-ignore
  if (useSelector((s: RootState) => s.userInfo.isLogged)) {
    return <Outlet/>;
  }

  return (
    <Navigate
      to={getUrl("/")}
      state={{ from: `${location.pathname}${location.search}` }}
      replace
    />
  );
};
