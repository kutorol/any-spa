import { Button } from "@mui/material";
import * as React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import useMatch from "../../../../hooks/useMatch";

interface BtnProps {
  webTitle?: string;
  mobTitle?: string;
  onClick?: (e) => void;
  icon?: React.ReactNode;

  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  variant?: "contained" | "outlined" | "text";
  size?: "small" | "medium" | "large";
  disabled?: boolean;

  [key: string]: any;
}

const Btn = ({
               webTitle = "",
               mobTitle,
               onClick,
               size,
               variant = "text",
               color = "secondary",
               icon,
               ...props
             }: BtnProps) => {

  const { matchDownMd } = useMatch();
  if (!size) {
    size = matchDownMd ? "small" : "medium";
  }

  const webTitleExists = webTitle.trim() !== "";
  const webBtn = (
    <Button
      variant={variant}
      size={size}
      color={color}
      onClick={onClick}
      startIcon={webTitleExists ? icon : undefined}
      {...props}
    >
      {webTitleExists ? webTitle : icon}
    </Button>
  );

  const isOnlyIcon = !(mobTitle || "").trim() && icon;

  const mobileBtn = React.cloneElement(webBtn, {
    ...(isOnlyIcon ? {
      startIcon: undefined,
      children: React.cloneElement(icon)
    } : {
      startIcon: icon ? icon : undefined,
      children: mobTitle
    })
  });

  return (
    <>
      <BrowserView>{webBtn}</BrowserView>
      <MobileView>{mobileBtn}</MobileView>
    </>
  );
};

export default Btn;