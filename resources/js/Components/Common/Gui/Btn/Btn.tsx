import { Button } from "@mui/material";
import { IconSend } from "@tabler/icons-react";
// @ts-ignore
import React from "react";
import { BrowserView, MobileView } from "react-device-detect";

interface BtnProps {
  webTitle: string;
  mobTitle?: string;
  onClick: (e) => void;
  icon?: React.ReactNode;

  [ key: string ]: any;
}

const Btn = ({ webTitle, mobTitle = "", onClick, icon = <IconSend/>, ...props }: BtnProps) => {
  let mobContent = mobTitle;
  if (!mobTitle.trim() && icon) {
    mobContent = icon;
    icon = undefined;
  }

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onClick}
      startIcon={icon}
      {...props}
    >
      <BrowserView>{webTitle}</BrowserView>
      <MobileView>{mobContent}</MobileView>
    </Button>
  );
};

export default Btn;