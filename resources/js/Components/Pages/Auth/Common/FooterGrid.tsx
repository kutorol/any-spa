import { Grid, Typography } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { Link } from "react-router-dom";
import { getUrl } from "../../../../utils/funcs/url";

const FooterGrid = ({ xsNum, isRegister = false, isPasswordReset = false }) => {
  const sx = { textDecoration: "none" };
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
          to={getUrl(url)}
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