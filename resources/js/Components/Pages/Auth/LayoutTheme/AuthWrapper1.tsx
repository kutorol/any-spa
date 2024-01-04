import { styled, Theme } from "@mui/material/styles";
import * as React from "react";

interface IAuthWrapper1 {
  isLanding?: boolean;
  theme: Theme;
}

const AuthWrapper1 = styled("div")(({ isLanding = false, theme }: IAuthWrapper1) => ({
  backgroundColor: isLanding ? "none" : theme.palette.primary.light,
  minHeight: "100vh"
}));

export default AuthWrapper1;
