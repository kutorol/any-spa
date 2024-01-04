import { Box } from "@mui/material";
import * as React from "react";
import useMatch from "../../../../hooks/useMatch";
import { drawerWidth } from "../../../../store/constant";
import DrawerContent from "./Components/DrawerContent";
import DrawerSidebar from "./Components/DrawerSidebar";

interface ISidebar {
  drawerOpen: boolean;
  drawerToggle: (e: React.SyntheticEvent, reason: string) => void;
}

const Sidebar = ({ drawerOpen, drawerToggle }: ISidebar) => {
  const { matchUpMd } = useMatch();
  const sx = { flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : "auto" };

  return (
    <Box component="nav" sx={sx}>
      <DrawerSidebar
        drawerOpen={drawerOpen}
        drawerToggle={drawerToggle}
      >
        <DrawerContent/>
      </DrawerSidebar>
    </Box>
  );
};

export default Sidebar;