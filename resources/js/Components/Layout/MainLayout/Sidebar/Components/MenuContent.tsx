import { Box } from "@mui/material";
import * as React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import useMatch from "../../../../../hooks/useMatch";
import WebOrMobileBox from "../../../../Common/Gui/WebOrMobileBox";
import MenuList from "../MenuList/MenuList";
import VersionSite from "./VersionSite";

const MenuContent = () => {
  const { matchUpMd } = useMatch();

  const menuContent = (
    <>
      <MenuList/>
      {/*<MenuCard/>*/}
      <VersionSite/>
    </>
  );

  const boxSx = { px: 2 };
  const styleScroll = {
    height: !matchUpMd ? "calc(100vh - 56px)" : "calc(100vh - 88px)",
    paddingLeft: "16px",
    paddingRight: "16px"
  };

  return (
    <WebOrMobileBox
      mobileComponent={<Box sx={boxSx}>{menuContent}</Box>}
    >
      <PerfectScrollbar
        component="div"
        style={styleScroll}
      >
        {menuContent}
      </PerfectScrollbar>
    </WebOrMobileBox>
  );
};

export default MenuContent;