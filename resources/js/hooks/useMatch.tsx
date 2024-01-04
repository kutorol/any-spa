import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";

interface IUseMatchDownResponse {
  matchDownMd: boolean;
  matchDownLg: boolean;
  matchUpMd: boolean;

  breakpoints: {
    bDownMD: string;
    bDownLG: string;
    bUpMD: string;
    bDownSM: string;
  };
}

const useMatch = (): IUseMatchDownResponse => {
  const themeBreakpoints = useTheme().breakpoints;

  const bDownSM = themeBreakpoints.down("sm");
  const bDownMD = themeBreakpoints.down("md");
  const bDownLG = themeBreakpoints.down("lg");
  const bUpMD = themeBreakpoints.up("md");

  return {
    matchDownMd: useMediaQuery(bDownMD),
    matchDownLg: useMediaQuery(bDownLG),

    matchUpMd: useMediaQuery(bUpMD),
    breakpoints: {
      bDownMD,
      bDownLG,
      bUpMD,
      bDownSM
    }
  };
};

export default useMatch;