import { IconButton } from "@mui/material";
import * as React from "react";
import Icon from "../Common/Icon";

interface IBtnProps {
  onClick: (e) => void;
  icon?: React.ReactNode;
  ref?: any;

  [key: string]: any;
}

const RoundBtn = ({ onClick, icon = <Icon tablerIcon="IconSend"/>, anchorRef, ...props }: IBtnProps) => {
  return (
    <IconButton
      color="secondary"
      onClick={onClick}
      ref={anchorRef}
      {...props}
    >
      {icon}
    </IconButton>
  );
};

export default RoundBtn;