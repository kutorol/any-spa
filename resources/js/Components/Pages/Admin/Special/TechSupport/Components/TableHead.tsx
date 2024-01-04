import { TableCell, TableHead as TableHeadMui, TableRow } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";

interface ITableHead {
  withShortComment?: boolean;
}

const TableHead = ({ withShortComment }: ITableHead) => {
  const { t } = useLaravelReactI18n();

  return (
    <TableHeadMui>
      <TableRow>
        <TableCell align="center">ID</TableCell>
        <TableCell align="center">{t("E-mail")}</TableCell>
        <TableCell align="center">UID</TableCell>
        <TableCell align="center">{t("Тип")}</TableCell>
        <TableCell align="center">{t("Статус")}</TableCell>
        {withShortComment && (
          <TableCell align="center">{t("Комментарий")}</TableCell>
        )}
        <TableCell align="center">{t("Создано")}</TableCell>
        <TableCell align="center">{t("Обновлено")}</TableCell>
      </TableRow>
    </TableHeadMui>
  );
};

export default TableHead;