import React from 'react'
import { IconSend } from "@tabler/icons-react";
import { BrowserView, MobileView } from "react-device-detect";
import { Button } from "@mui/material";

const Btn = ({ webTitle, mobTitle, onClick = () => {}, icon = <IconSend/> }) => {
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