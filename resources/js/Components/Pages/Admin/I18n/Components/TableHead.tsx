import { TableCell, TableHead as TableHeadMui, TableRow } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";

const TableHead = () => {
  const { t } = useLaravelReactI18n();
  return (
    <TableHeadMui>
      <TableRow>
        <TableCell align="center">{t("URL")}</TableCell>
        <TableCell align="center">{t("SEO тег")}</TableCell>
        <TableCell align="center">{t("Перевод")}</TableCell>
        <TableCell align="center">{t("Язык")}</TableCell>
        <TableCell align="center">{t("Остальные языки")}</TableCell>
      </TableRow>
    </TableHeadMui>
  );
};

export default TableHead;