import { TableCell, TableHead, TableRow } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";

const DupTableHead = () => {
  const { t } = useLaravelReactI18n();

  return (
    <TableHead>
      <TableRow>
        <TableCell align="center">{t("Язык новости")}</TableCell>
        <TableCell align="center">ID</TableCell>
        <TableCell align="center">{t("Название")}</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default DupTableHead;