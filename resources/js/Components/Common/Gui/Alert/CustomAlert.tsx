import { Alert, AlertTitle, Typography } from "@mui/material";
import * as React from "react";

interface CustomAlertProps {
  title: React.ReactNode | string;
  subtitleElement: React.ReactNode | string;
  icon?: React.ReactNode;
  color?: "success" | "info" | "warning" | "error";
  titleSx?: object;
  subTitleSx?: object;

  [k: string]: any;
}

const CustomAlert = ({
                       title,
                       titleSx,
                       subTitleSx,
                       subtitleElement,
                       icon,
                       color = "warning",
                       ...other
                     }: CustomAlertProps) => {
  return (
    <Alert
      color={color}
      severity={color}
      variant="filled"
      icon={icon}
      {...other}
    >
      <AlertTitle>
        {typeof title === "string" ? (
          <Typography variant="h5" sx={titleSx}>{title}</Typography>
        ) : title}
      </AlertTitle>
      {typeof subtitleElement === "string" ? (
        <Typography variant="subtitle2" sx={subTitleSx}>
          {subtitleElement}
        </Typography>
      ) : subtitleElement}
    </Alert>
  );
};

export default CustomAlert;