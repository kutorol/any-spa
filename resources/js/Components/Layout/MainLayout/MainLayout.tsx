import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { IconChevronRight } from "@tabler/icons-react";
// @ts-ignore
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { drawerWidth } from "../../../store/constant";
import { changeLeftMenu } from "../../../store/reducers/menu/left-menu";
import Breadcrumbs from "../../Common/Breadcrumbs/Breadcrumbs";
import menuItems from "../../Menu/menu-items";
import Login from "../../Pages/Auth/Login/Login";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

// @ts-ignore
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  // @ts-ignore
  ...theme.typography.mainContent,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create(
    "margin",
    open
      ? {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }
      : {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }
  ),
  [ theme.breakpoints.up("md") ]: {
    marginLeft: open ? 0 : -(drawerWidth - 20),
    width: `calc(100% - ${drawerWidth}px)`
  },
  [ theme.breakpoints.down("md") ]: {
    marginLeft: "20px",
    width: `calc(100% - ${drawerWidth}px)`,
    padding: "16px"
  },
  [ theme.breakpoints.down("sm") ]: {
    marginLeft: "10px",
    width: `calc(100% - ${drawerWidth}px)`,
    padding: "16px",
    marginRight: "10px"
  }
}));

const MainLayout = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const { isLogged, leftMenuIsOpen } = useSelector(s => ({
    // @ts-ignore
    isLogged: s.userInfo.isLogged,
    // @ts-ignore
    leftMenuIsOpen: s.leftMenu.isOpen
  }));

  const handleLeftDrawerToggle = () => {
    changeLeftMenu(!leftMenuIsOpen);
  };

  if (!isLogged) {
    return <Login/>;
  }


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline/>
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftMenuIsOpen ? theme.transitions.create("width") : "none"
        }}
      >
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle}/>
        </Toolbar>
      </AppBar>

      <Sidebar
        drawerOpen={!matchDownMd ? leftMenuIsOpen : !leftMenuIsOpen}
        drawerToggle={handleLeftDrawerToggle}
      />

      {/* @ts-ignore */}
      <Main theme={theme} open={leftMenuIsOpen}>
        {/* @ts-ignore */}
        <Breadcrumbs separator={IconChevronRight} menuItems={menuItems} icons title rightAlign/>
        <Outlet/>
      </Main>
      {/*<Customization/>*/}
    </Box>
  );
};

export default MainLayout;