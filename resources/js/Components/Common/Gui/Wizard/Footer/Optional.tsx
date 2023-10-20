import { Button } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React from "react";

interface IOptional {
  isOptional?: boolean;
  handleSkip: () => void;
}

const Optional = ({ isOptional, handleSkip }: IOptional) => {
  const { t } = useLaravelReactI18n();

  if (!isOptional) {
    return null;
  }

  return (
    <Button
      color="inherit"
      onClick={handleSkip}
      sx={{ mr: 1 }}
    >
      {t("Пропустить")}
    </Button>
  );
};

export default Optional;