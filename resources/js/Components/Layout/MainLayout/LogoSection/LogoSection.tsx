import { ButtonBase } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../../../../assets/images/svg/Components/Logo";
import { NotVerifyEmailURL } from "../../../../store/constant";
import { RootState } from "../../../../store/store";
import { getUrl } from "../../../../utils/funcs/url";
import { IUserInterface } from "../../../../utils/interfaces/user";

const LogoSection = () => {
  const user: IUserInterface = useSelector((s: RootState) => s.userInfo.user);
  const urlTo = getUrl(user.uid === 0 || user.verified_email ? "/" : NotVerifyEmailURL);

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