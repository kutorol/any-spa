import { Box } from "@mui/material";
import * as React from "react";
import MainCard from "../../../Common/MainCard/MainCard";

;

interface IAuthCardWrapper {
  children: any;

  [k: string]: any;
}

const AuthCardWrapper = ({ children, ...other }: IAuthCardWrapper) => {
  const sxBox = { p: { xs: 2, sm: 3, xl: 5 } };
  const sxMain = {
    maxWidth: { xs: 400, lg: 475 },
    margin: { xs: 2.5, md: 3 },
    "& > *": {
      flexGrow: 1,
      flexBasis: "50%"
    }
  };
  const content = false;

  return (
    // @ts-ignore
    <MainCard
      sx={sxMain}
      content={content}
      {...other}
    >
      <Box sx={sxBox}>{children}</Box>
    </MainCard>
  );
};

export default AuthCardWrapper;
