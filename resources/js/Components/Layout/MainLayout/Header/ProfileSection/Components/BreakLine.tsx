import { Divider, Stack } from "@mui/material";
import * as React from "react";

const BreakLine = () => {
  const sx = { m: 1 };
  return (
    <>
      <Stack sx={sx}/>
      <Divider/>
    </>
  );
};

export default BreakLine;