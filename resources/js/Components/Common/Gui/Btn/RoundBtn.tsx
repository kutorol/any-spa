import { IconButton } from "@mui/material";
import { IconSend } from "@tabler/icons-react";
// @ts-ignore
import React from "react";

interface BtnProps {
  onClick: (e) => void;
  icon?: React.ReactNode;

  [ key: string ]: any;
}

const RoundBtn = ({ onClick, icon = <IconSend/>, ...props }: BtnProps) => {
  return (
    <IconButton
      color="secondary"
      onClick={onClick}
      {...props}
    >
      {icon}
    </IconButton>
  );
};

export default RoundBtn;