import React from 'react'
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useLaravelReactI18n } from "laravel-react-i18n";

const FooterGrid = ({ xsNum, isRegister = true, isPasswordReset = false }) => {
  const sx = { textDecoration: 'none' };
  const { t } = useLaravelReactI18n();

  let title = t("Еще нет аккаунта?");
  if (isRegister) {
    title = t("Уже регистрировались?");
  } else if (isPasswordReset) {
    title = t("Войти в аккаунт");
  }

  const url = (isRegister || isPasswordReset) ? "/login" : "/register";

  return (
    <Grid item xs={xsNum}>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        xs={xsNum}
      >
        <Typography
          component={Link}
          to={url}
          variant="subtitle1"
          sx={sx}
        >
          {title}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default FooterGrid;