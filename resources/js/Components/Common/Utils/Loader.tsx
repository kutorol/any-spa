// material-ui
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import * as React from "react";

// styles
const LoaderWrapper = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1301,
  width: "100%"
});

const Loader = () => (
  <LoaderWrapper>
    <LinearProgress color="secondary"/>
  </LoaderWrapper>
);

export default Loader;
