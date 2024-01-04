import { TableCell, TableHead as TableHeadMui, TableRow } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";

const TableHead = () => {
  const { t } = useLaravelReactI18n();

  return (
    <TableHeadMui>
      <TableRow>
        <TableCell align="center">ID</TableCell>
        <TableCell align="center">{t("Картинка")}</TableCell>
        <TableCell align="center">{t("Название")}</TableCell>
        <TableCell align="center">{t("Язык")}</TableCell>
        <TableCell align="center">{t("Просмотры")}</TableCell>
        <TableCell align="center">{t("Лайки")}</TableCell>
        <TableCell align="center">{t("Создано")}</TableCell>
        <TableCell align="center">{t("Обновлено")}</TableCell>
      </TableRow>
    </TableHeadMui>
  );
};

export default TableHead;