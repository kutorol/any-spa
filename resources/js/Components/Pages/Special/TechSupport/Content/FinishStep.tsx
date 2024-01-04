import { Box, LinearProgress, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React, { useEffect, useState } from "react";

interface IFinishStep {
  isSuccess: boolean;
}

const FinishStep = ({ isSuccess }: IFinishStep) => {
  const { t } = useLaravelReactI18n();
  const theme = useTheme();

  const color = { color: theme.palette.success.dark };

  if (isSuccess) {
    return (
      <>
        <Toolbar/>
        <Box sx={{ width: "100%" }}>
          <Typography
            variant="h3"
            align="center"
            sx={color}
          >
            {t("Ваше обращение успешно отправлено")}
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            sx={color}
          >
            {t("Как только мы ознакомимся с вашим обращением, мы пришлем вам ответ")}
          </Typography>
        </Box>
        <Toolbar/>
      </>
    );
  }

  return (
    <>
      <Toolbar/>
      <Box sx={{ width: "100%" }}>
        <LinearProgress color="secondary"/>
      </Box>
      <Toolbar/>
    </>
  );
};

export default FinishStep;