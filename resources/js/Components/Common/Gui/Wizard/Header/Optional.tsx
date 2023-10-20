import { Typography } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React from "react";

const Optional = () => {
  const { t } = useLaravelReactI18n();

  return (
    <Typography variant="caption">
      {t("Необязательно")}
    </Typography>
  );
};

export default Optional;