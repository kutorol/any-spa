import { ButtonBase } from "@mui/material";
// @ts-ignore
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../../../../assets/images/svg/Components/Logo";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  // @ts-ignore
  const user = useSelector(s => s.userInfo.user);
  const urlTo = user.verified_email ? "/" : "/verify-email";

  return (
    <ButtonBase
      disableRipple
      component={Link}
      to={urlTo}
    >
      <Logo/>
    </ButtonBase>
  );
};

export default LogoSection;