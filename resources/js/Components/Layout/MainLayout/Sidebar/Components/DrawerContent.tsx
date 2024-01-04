import { Box } from "@mui/material";
import * as React from "react";
import LogoSection from "../../LogoSection/LogoSection";
import MenuContent from "./MenuContent";

const DrawerContent = () => {
  const sx1 = { display: { xs: "block", md: "none" } };
  const sx2 = { display: "flex", p: 2, mx: "auto" };

  return (
    <>
      <Box sx={sx1}>
        <Box sx={sx2}>
          <LogoSection/>
        </Box>
      </Box>

      <MenuContent/>
    </>
  );
};

export default DrawerContent;