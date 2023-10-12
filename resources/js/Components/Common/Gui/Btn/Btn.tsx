import { Button } from "@mui/material";
import { IconSend } from "@tabler/icons-react";
// @ts-ignore
import React from "react";
import { BrowserView, MobileView } from "react-device-detect";

interface BtnProps {
  webTitle: string;
  mobTitle: string;
  onClick: (e) => void;
  icon?: React.ReactNode;
}

const Btn = ({ webTitle, mobTitle, onClick, icon = <IconSend/> }: BtnProps) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onClick}
      startIcon={icon}
    >
      <BrowserView>{webTitle}</BrowserView>
      <MobileView>{mobTitle}</MobileView>
    </Button>
  );
};

export default Btn;