import React from 'react'
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useLaravelReactI18n } from "laravel-react-i18n";

const PolicyGrid = () => {
  const { t } = useLaravelReactI18n();
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid item>
        <Typography variant="subtitle2">
          {t("Регистрируясь, вы принимаете")}&nbsp;
          <Typography
            variant="subtitle2"
            component={Link}
            to="/term-of-use-private-policy"
          >
            {t("данные условия.")}
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PolicyGrid;