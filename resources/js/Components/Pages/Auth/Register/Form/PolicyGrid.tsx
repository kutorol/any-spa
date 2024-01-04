import { Grid, Typography } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { Link } from "react-router-dom";
import { termOfUseURL } from "../../../../../routes/Components/SpecialRoutes";
import { getUrl } from "../../../../../utils/funcs/url";

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
            target="_blank"
            to={getUrl(termOfUseURL)}
          >
            {t("данные условия.")}
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PolicyGrid;