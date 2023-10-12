import { Alert, AlertTitle, Typography } from "@mui/material";
// @ts-ignore
import React from "react";

interface CustomAlertProps {
  title: string;
  subtitleElement: React.ReactNode;
  icon?: React.ReactNode;
  color?: "success" | "info" | "warning" | "error";
}

const CustomAlert = ({ title, subtitleElement, icon, color = "warning" }: CustomAlertProps) => {
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