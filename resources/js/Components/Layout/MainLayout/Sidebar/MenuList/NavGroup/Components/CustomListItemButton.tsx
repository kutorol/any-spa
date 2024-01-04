import { ListItemButton } from "@mui/material";
import * as React from "react";
import { borderRadius } from "../../../../../../../store/constant";

interface ICustomListItemButton {
  level: number;
  menuSelected: boolean;
  disabled?: boolean;
  children: any;
  onClick?: (e: React.SyntheticEvent) => void;

  [k: string]: any;
}

const CustomListItemButton = ({
                                menuSelected,
                                level,
                                onClick,
                                disabled,
                                children,
                                ...other
                              }: ICustomListItemButton) => {
  const btnSx = {
    borderRadius: borderRadius,
    mb: 0.5,
    alignItems: "flex-start",
    backgroundColor: level > 1 ? "transparent !important" : "inherit",
    py: level > 1 ? 1 : 1.25,
    pl: `${level * 24}px`
  };

  return (
    <ListItemButton
      sx={btnSx}
      selected={menuSelected}
      onClick={onClick}
      disabled={disabled}
      {...other}
    >
      {children}
    </ListItemButton>
  );
};

export default CustomListItemButton;