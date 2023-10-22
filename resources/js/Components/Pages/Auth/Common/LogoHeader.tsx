import { Grid, Tooltip } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../../../assets/images/svg/Components/Logo";

interface ILogoHeader {
  withLink: boolean;
}

const LogoHeader = ({ withLink = true }: ILogoHeader) => {
  const sx = { mb: 3 };
  const { t } = useLaravelReactI18n();

  return (
    <Grid item sx={sx}>
      {withLink ? (
        <Tooltip title={t("На главную страницу")}>
          <Link to="/">
            <Logo/>
          </Link>
        </Tooltip>
      ) : (
        <Logo/>
      )}
    </Grid>
  );
};

export default LogoHeader;