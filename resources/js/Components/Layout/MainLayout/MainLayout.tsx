import { AppBar, Box, CssBaseline, Toolbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { toNumber } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Outlet } from "react-router-dom";
import useMatch from "../../../hooks/useMatch";
import { NotVerifyEmailURL } from "../../../store/constant";
import { RootState } from "../../../store/store";
import { ERoles } from "../../../utils/enums/user";
import { getUrl, navTo } from "../../../utils/funcs/url";
import Breadcrumbs from "../../Common/Breadcrumbs/Breadcrumbs";
import LoginPopup from "./Anonym/LoginPopup";
import RegisterPopup from "./Anonym/RegisterPopup";
import Header from "./Header/Header";
import Main from "./Sidebar/Components/MainBlock";
import Sidebar from "./Sidebar/Sidebar";

interface IMainLayout {
  // Это админка загружается?
  isAdmin?: boolean;
  // Загружается страница, которая требует авторизации?
  needAuth?: boolean;
}

const getLastIsOpenMenu = (matchDownMd: boolean): boolean => {
  return !matchDownMd && toNumber(localStorage.getItem("is_open_left_menu") || "0") === 1;
};

const setLastIsOpenMenu = (isOpen: boolean, matchDownMd: boolean): void => {
  if (matchDownMd) {
    return;
  }

  localStorage.setItem("is_open_left_menu", isOpen ? "1" : "0");
};


const MainLayout = ({ isAdmin, needAuth }: IMainLayout) => {
  const theme = useTheme();
  const loc = useLocation();
  const { matchDownMd } = useMatch();

  const [leftMenuIsOpen, setLeftMenuIsOpen] = useState<boolean>(getLastIsOpenMenu(matchDownMd));
  const { isLogged, isAppInit, user } = useSelector((s: RootState) => ({
    isLogged: s.userInfo.isLogged,
    isAppInit: s.appInit.init,
    user: s.userInfo.user
  }));

  const handleLeftDrawerToggle = (): void => {
    setLastIsOpenMenu(!leftMenuIsOpen, matchDownMd);
    setLeftMenuIsOpen(!leftMenuIsOpen);
  };

  useEffect(() => {
    if (isLogged && !user.verified_email) {
      loc.pathname !== getUrl(NotVerifyEmailURL) && navTo(NotVerifyEmailURL);
    }
  }, [isLogged, user.verified_email, loc.pathname]);

  useEffect(() => {
    // для авторизованного юзера меню открыто
    // для анонима - свернуто
    if (isAppInit) {
      setLeftMenuIsOpen(getLastIsOpenMenu(matchDownMd));
    }
  }, [isAppInit, isLogged, matchDownMd]);

  const needRedirectToMainPage = isAppInit && (
    // @ts-ignore
    (isAdmin && ![ERoles.SITE_ADMIN, ERoles.SITE_MANAGER].includes(user.role))
    || (needAuth && !isLogged)
  );

  useEffect(() => {
    if (needRedirectToMainPage) {
      navTo("/");
    }
  }, [needRedirectToMainPage]);

  // Сайт еще не загрузился
  if (!isAppInit || needRedirectToMainPage) {
    return null;
  }

  // Если email не подтвердили и вошли в аккаунт, то нужен редирект из useEffect
  if (isLogged && !user.verified_email && loc.pathname !== getUrl(NotVerifyEmailURL)) {
    return null;
  }

  const sxBox = { display: "flex" };
  const sxAppBar = {
    bgcolor: theme.palette.background.default,
    transition: leftMenuIsOpen ? theme.transitions.create("width") : "none"
  };

  // Для авторизованного всегда открыта вначале, а для мобилки - всегда скрыто вначале
  // Для анонима - всегда скрыто вначале
  const drawerOpen = matchDownMd ? (isLogged ? !leftMenuIsOpen : leftMenuIsOpen) : leftMenuIsOpen;

  return (
    <>
      <Box sx={sxBox}>
        <CssBaseline/>
        <AppBar
          enableColorOnDark
          position="fixed"
          color="inherit"
          elevation={0}
          sx={sxAppBar}
        >
          <Toolbar>
            <Header handleLeftDrawerToggle={handleLeftDrawerToggle}/>
          </Toolbar>
        </AppBar>

        <Sidebar
          drawerOpen={drawerOpen}
          drawerToggle={handleLeftDrawerToggle}
        />

        {/* @ts-ignore */}
        <Main theme={theme} open={leftMenuIsOpen}>
          <Breadcrumbs/>
          <Outlet/>
        </Main>

        {/*<Customization/>*/}
      </Box>

      <LoginPopup/>
      <RegisterPopup/>
    </>
  );
};

export default MainLayout;