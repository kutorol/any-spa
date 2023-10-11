import React from 'react'
import { Alert, AlertTitle, Typography } from "@mui/material";

const CustomAlert = ({ title, subtitleElement, icon, color = "success" }) => {
  color = color || "warning"
  return (
    <Alert
      color={color}
      severity={color}
      variant="filled"
      icon={icon}
    >
      <AlertTitle>
        <Typography variant="h5">{title}</Typography>
      </AlertTitle>
      <Typography variant="subtitle2">
        {subtitleElement}
      </Typography>
    </Alert>
  );
};

export default CustomAlert;