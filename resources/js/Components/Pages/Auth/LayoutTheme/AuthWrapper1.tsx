import { styled } from "@mui/material/styles";
// @ts-ignore
import React from "react";

const AuthWrapper1 = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  minHeight: "100vh"
}));

export default AuthWrapper1;