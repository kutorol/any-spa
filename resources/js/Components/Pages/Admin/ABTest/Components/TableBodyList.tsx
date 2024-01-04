import { TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import { ERoles } from "../../../../../utils/enums/user";
import { IABTest } from "../../../../../utils/interfaces/admin/ab";
import Row from "./Row";

interface ITableBodyList {
  items: IABTest[];
  onOpenDialogEdit: (test: IABTest) => void;
  onDelete: (id: number) => void;
}

const TableBodyList = ({ items, onOpenDialogEdit, onDelete }: ITableBodyList) => {
  const { t } = useLaravelReactI18n();
  const userRole: ERoles = useSelector((s: RootState) => s.userInfo.user.role);

  const itemsTSX = items.map((t: IABTest) => (
    <Row
      key={t.id}
      test={t}
      onOpenDialogEdit={onOpenDialogEdit}
      onDelete={onDelete}
    />
  ));

  if (itemsTSX.length === 0) {
    const colSpan = userRole === ERoles.SITE_ADMIN ? 10 : 9;
    itemsTSX.push(
      <TableRow key="no_values">
        <TableCell colSpan={colSpan} align="center">
          <Typography variant="body1">
            {t("На данный момент нет добавленных A/B тестов")}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableBody>{itemsTSX}</TableBody>
  );
};

export default TableBodyList;