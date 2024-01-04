import { TableCell, TableHead as TableHeadMui, TableRow } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import SiteAdminRole from "../../../../Common/Gui/Role/SiteAdminRole";

const TableHead = () => {
  const { t } = useLaravelReactI18n();

  return (
    <TableHeadMui>
      <TableRow>
        <TableCell align="center">ID</TableCell>
        <TableCell align="center">{t("Название")}</TableCell>
        <TableCell align="center">{t("Комментарий")}</TableCell>
        <TableCell align="center">{t("Статус")}</TableCell>
        <TableCell align="center">{t("Процент юзеров")}</TableCell>
        <TableCell align="center">{t("Добавлено юзеров")}</TableCell>
        <TableCell align="center">{t("Максимум юзеров")}</TableCell>
        <TableCell align="center">{t("Создано")}</TableCell>
        <TableCell align="center">{t("Обновлено")}</TableCell>
        <SiteAdminRole>
          <TableCell align="center">{t("Удаление")}</TableCell>
        </SiteAdminRole>
      </TableRow>
    </TableHeadMui>
  );
};

export default TableHead;