import React from 'react'
import { Box, Grid, Typography } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";

const AuthEmailTitle = ({ isRegister = true }) => {
  const xs = 12;
  const sx = { mb: 2 };
  const { t } = useLaravelReactI18n();

  const title = isRegister ? t("Регистрация через E-mail") : t("Авторизация через E-mail");

  return (
    <Grid item xs={xs} container alignItems="center" justifyContent="center">
      <Box sx={sx}>
        <Typography variant="subtitle1">
          {title}
        </Typography>
      </Box>
    </Grid>
  );
};

export default AuthEmailTitle;