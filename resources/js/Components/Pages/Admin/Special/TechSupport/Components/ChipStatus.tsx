import { Chip } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { ETechSupportStatus } from "../../../../../../utils/enums/admin/tech-support";

interface IChipStatus {
  status: ETechSupportStatus;
}

export const getStatusColors = (): { [k in ETechSupportStatus]: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" } => {
  return {
    [ETechSupportStatus.CREATED]: "info",
    [ETechSupportStatus.IN_PROGRESS]: "primary",
    [ETechSupportStatus.DEFERRED]: "warning",
    [ETechSupportStatus.REJECTED]: "secondary",
    [ETechSupportStatus.DONE]: "success"
  };
};

export const getStatusTitles = (): { [k in ETechSupportStatus]: string } => {
  const { t } = useLaravelReactI18n();

  return {
    [ETechSupportStatus.CREATED]: t("Новый"),
    [ETechSupportStatus.IN_PROGRESS]: t("В работе"),
    [ETechSupportStatus.DEFERRED]: t("Отложен"),
    [ETechSupportStatus.REJECTED]: t("Отклонен"),
    [ETechSupportStatus.DONE]: t("Выполнен")
  };
};

const ChipStatus = ({ status }: IChipStatus) => {

  const colorsStatus = getStatusColors();
  const titlesStatus = getStatusTitles();

  return (
    <Chip
      size="small"
      color={colorsStatus[status]}
      label={titlesStatus[status]}
    />
  );
};

export default ChipStatus;