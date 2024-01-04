import { Chip, TableCell, TableRow, Typography } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { EColor } from "../../../../../utils/enums/common";
import { humanDate, humanTime } from "../../../../../utils/funcs/date";
import { IABTest } from "../../../../../utils/interfaces/admin/ab";
import { IVariantDottedBtn } from "../../../../../utils/interfaces/select";
import DottedActionBtn from "../../../../Common/Gui/Btn/DottedActionBtn";
import Icon from "../../../../Common/Gui/Common/Icon";
import SiteAdminRole from "../../../../Common/Gui/Role/SiteAdminRole";

interface IRow {
  test: IABTest;
  onOpenDialogEdit: (test: IABTest) => void;
  onDelete: (id: number) => void;
}

const Row = ({ test, onOpenDialogEdit, onDelete }: IRow) => {
  const { t } = useLaravelReactI18n();
  const rowSx = { "& > *": { borderBottom: "unset" } };

  const isActive = test.active && test.total_users_in_test < test.max_count_users_in_test;

  const options = [
    {
      title: t("Редактировать"),
      icon: (<Icon tablerIcon="IconPencil"/>),
      onClick: (): void => onOpenDialogEdit(test),
      iconColor: EColor.SECONDARY
    },
    {
      title: t("Удалить"),
      icon: (<Icon tablerIcon="IconTrashFilled"/>),
      onClick: (): void => onDelete(test.id),
      iconColor: EColor.ERROR
    }
  ] as IVariantDottedBtn[];

  const titleChip = t(isActive ? "Активен" : "Не активен");
  const colorChip = isActive ? EColor.SUCCESS : "default";

  return (
    <TableRow sx={rowSx}>
      <TableCell align="center">
        <Typography variant="caption">{test.id}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="caption">{test.key}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="caption">{test.comment}</Typography>
      </TableCell>
      <TableCell align="center">
        <Chip
          size="small"
          color={colorChip}
          label={titleChip}
        />
      </TableCell>
      <TableCell align="center">
        <Typography variant="caption">{test.total_percent_from_users}%</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="caption">{test.total_users_in_test}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="caption">{test.max_count_users_in_test}</Typography>
      </TableCell>

      <TableCell align="center">
        <Typography variant="caption">
          {humanDate(test.created_at)}<br/>{humanTime(test.created_at)}
        </Typography>
      </TableCell>

      <TableCell align="center">
        <Typography variant="caption">
          {humanDate(test.updated_at)}<br/>{humanTime(test.updated_at)}
        </Typography>
      </TableCell>
      <SiteAdminRole>
        <TableCell align="center">
          <DottedActionBtn variants={options}/>
        </TableCell>
      </SiteAdminRole>
    </TableRow>
  );
};

export default Row;