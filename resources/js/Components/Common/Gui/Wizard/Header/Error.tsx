import { Typography } from "@mui/material";
import * as React from "react";

interface IError {
  textErr: string | null;
}

const Error = ({ textErr }: IError) => {
  if (!textErr) {
    return null;
  }

  return (
    <Typography
      variant="caption"
      color="error"
    >
      {textErr}
    </Typography>
  );
};

export default Error;