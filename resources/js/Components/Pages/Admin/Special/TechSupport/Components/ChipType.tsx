import { Chip } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { ETechSupportTypes } from "../../../../../../utils/enums/tech-support";

interface IChipType {
  type: ETechSupportTypes;
}

const getTypeColors = (): { [k in ETechSupportTypes]: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" } => {
  return {
    [ETechSupportTypes.TYPE_PROBLEM]: "error",
    [ETechSupportTypes.TYPE_SUGGEST]: "warning",
    [ETechSupportTypes.TYPE_QUESTION]: "info"
  };
};

const getTypeTitles = (): { [k in ETechSupportTypes]: string } => {
  const { t } = useLaravelReactI18n();

  return {
    [ETechSupportTypes.TYPE_PROBLEM]: t("Проблема"),
    [ETechSupportTypes.TYPE_SUGGEST]: t("Предложение"),
    [ETechSupportTypes.TYPE_QUESTION]: t("Вопрос")
  };
};

const ChipType = ({ type }: IChipType) => {
  const colorsType = getTypeColors();
  const titlesType = getTypeTitles();

  return (
    <Chip
      size="small"
      color={colorsType[type]}
      label={titlesType[type]}
    />
  );
};

export default ChipType;