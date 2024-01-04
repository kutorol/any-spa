import { Drawer } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import useMatch from "../../../../../hooks/useMatch";
import { drawerWidth } from "../../../../../store/constant";

interface IDrawerSidebar {
  drawerOpen: boolean;
  drawerToggle: (e: React.SyntheticEvent, reason: string) => void;
  children: React.ReactNode;
}

const DrawerSidebar = ({ drawerOpen, drawerToggle, children }: IDrawerSidebar) => {
  const theme = useTheme();
  const { matchUpMd } = useMatch();
  const variant = matchUpMd ? "persistent" : "temporary";

  const sx = {
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      background: theme.palette.background.default,
      color: theme.palette.text.primary,
      borderRight: "none",
      [theme.breakpoints.up("md")]: {
        top: "88px"
      }
    }
  };

  const props = { keepMounted: true };

  return (
    <Drawer
      variant={variant}
      anchor="left"
      open={drawerOpen}
      onClose={drawerToggle}
      sx={sx}
      ModalProps={props}
      color="inherit"
    >
      {children}
    </Drawer>
  );
};

export default DrawerSidebar;