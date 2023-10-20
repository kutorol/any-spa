import { Button } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React from "react";

interface IBack {
  backIsDisabled: boolean;
  handleBack: () => void;
}

const Back = ({ backIsDisabled, handleBack }:IBack) => {
  const { t } = useLaravelReactI18n();

  if (backIsDisabled) {
    return null;
  }

  return (
    <Button
      color="inherit"
      onClick={handleBack}
      sx={{ mr: 1 }}
    >
      {t("Назад")}
    </Button>
  );
};

export default Back;