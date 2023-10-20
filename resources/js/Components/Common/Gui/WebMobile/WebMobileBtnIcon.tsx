import { Button } from "@mui/material";
// @ts-ignore
import React from "react";
import WebOrMobileBox from "../WebOrMobileBox";

interface IWebMobileBtnIcon {
  title: string;
  onClick: (e: any) => void;
  icon?: React.ReactNode;

  [ key: string ]: any;
}

const WebMobileBtnIcon = ({ title, onClick, icon, ...props }: IWebMobileBtnIcon) => {
  const btn = (
    <Button
      disableElevation
      variant="contained"
      size="small"
      sx={{ color: "inherit" }}
      startIcon={icon}
      onClick={onClick}
      {...props}
    >
      {title}
    </Button>
  );

  const btnMobileOnlyIcon = React.cloneElement(btn, {
    startIcon: undefined,
    endIcon: icon,
    children: null
  });

  return (
    <WebOrMobileBox
      mobileComponent={btnMobileOnlyIcon}
    >
      {btn}
    </WebOrMobileBox>
  );
};

export default WebMobileBtnIcon;