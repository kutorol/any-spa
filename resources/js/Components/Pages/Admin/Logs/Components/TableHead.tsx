import { TableCell, TableHead as TableHeadMui, TableRow } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";

const TableHead = () => {
  const { t } = useLaravelReactI18n();

  return (
    <TableHeadMui>
      <TableRow>
        <TableCell align="center">{t("Путь лога")}</TableCell>
        <TableCell align="center">{t("Дата обновления")}</TableCell>
      </TableRow>
    </TableHeadMui>
  );
};

export default TableHead;