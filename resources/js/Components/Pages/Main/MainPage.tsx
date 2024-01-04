import * as React from "react";
import { lazy } from "react";
import { useSelector } from "react-redux";
import Loadable from "../../../Components/Common/Utils/Loadable";
import { RootState } from "../../../store/store";
import MainPageAnonym from "./MainPageAnonym";
import MainPageAuth from "./MainPageAuth";

interface IMainPage {
  isAdminTab?: boolean;
}

// @ts-ignore
const NotFoundPage = Loadable(lazy(() => import("../../../Components/Pages/NotFound/NotFoundPage")));

const MainPage = ({ isAdminTab }: IMainPage) => {
  const isLogged: boolean = useSelector((s: RootState) => s.userInfo.isLogged);

  if (isLogged && isAdminTab) {
    return <NotFoundPage/>;
  }

  if (isLogged) {
    return (<MainPageAuth/>);
  }

  return (<MainPageAnonym isAdminTab={isAdminTab}/>);
};

export default MainPage;