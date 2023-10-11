import React from 'react'
import { Link } from 'react-router-dom';
import { ButtonBase } from '@mui/material';
import Logo from "../../../../../assets/images/svg/Components/Logo";
import { useSelector } from "react-redux";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
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