import { Dialog, DialogTitle } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// @ts-ignore
import React, { useState } from "react";
import Btn from "../../Common/Gui/Btn/Btn";
import Icon from "../../Common/Gui/Common/Icon";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import AppBar from "./AppBar";
import AppFooter from "./AppFooter";
import ProductCategories from "./ProductCategories";
import ProductCTA from "./ProductCTA";
import ProductHero from "./ProductHero";
import ProductHowItWorks from "./ProductHowItWorks";
import ProductSmokingHero from "./ProductSmokingHero";
import ProductValues from "./ProductValues";
import withRoot from "./withRoot";

const LandingPage = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const [isOpenLogin, setIsOpenLogin] = useState<boolean>(false);
  const [isOpenRegister, setIsOpenRegister] = useState<boolean>(false);
  const toggleLogin = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    setIsOpenLogin(!isOpenLogin);
  };

  const toggleRegister = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    setIsOpenRegister(!isOpenRegister);
  };

  let AuthPage = null;
  let toggleFunc = null;
  if (isOpenLogin) {
    AuthPage = (<Login isLanding/>);
    toggleFunc = toggleLogin;
  } else if (isOpenRegister) {
    AuthPage = (<Register isLanding/>);
    toggleFunc = toggleRegister;
  }

  const isOpenDialog = AuthPage !== null;
  return (
    <>
      <Dialog
        fullScreen={isMd}
        onClose={toggleFunc}
        open={isOpenDialog}
      >
        {isMd && (
          <DialogTitle align={"right"} sx={{ p: 0, pt: 1 }}>
            <Btn
              onClick={toggleFunc}
              icon={<Icon tablerIcon={"IconX"}/>}
            />
          </DialogTitle>
        )}
        {AuthPage}
      </Dialog>

      <AppBar
        toggleLogin={toggleLogin}
        toggleRegister={toggleRegister}
      />
      <ProductHero toggleRegister={toggleRegister}/>
      <ProductValues/>
      <ProductCategories/>
      <ProductHowItWorks toggleRegister={toggleRegister}/>
      <ProductCTA/>
      <ProductSmokingHero/>
      <AppFooter/>
    </>
  );
};

export default withRoot(LandingPage);