import React from 'react'
import { Grid, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../../../../../assets/images/svg/Components/Logo";
import { useLaravelReactI18n } from "laravel-react-i18n";

const LogoHeader = () => {
  const sx = { mb: 3 };
  const { t } = useLaravelReactI18n();

  return (
    <Grid item sx={sx}>
      <Tooltip title={t("На главную страницу")}>
        <Link to="/">
          <Logo/>
        </Link>
      </Tooltip>
    </Grid>
  );
};

export default LogoHeader;