import { TableCell, TableRow } from "@mui/material";
import * as React from "react";
import { humanDate, humanTime } from "../../../../../utils/funcs/date";
import { IFeatureToggle } from "../../../../../utils/interfaces/admin/toggle";
import RoundBtn from "../../../../Common/Gui/Btn/RoundBtn";
import Icon from "../../../../Common/Gui/Common/Icon";
import SiteAdminRole from "../../../../Common/Gui/Role/SiteAdminRole";
import Input from "./Input";

interface IRow {
  item: IFeatureToggle;
  onChangeVal: (name: string, value: string, comment: string) => void;
  onDelete: (name: string) => void;
}

const Row = ({ item, onChangeVal, onDelete }: IRow) => {
  const rowSx = { "& > *": { borderBottom: "unset" } };

  const _onDelete = (): void => onDelete(item.name);

  return (
    <TableRow sx={rowSx}>
      <TableCell align="center">{item.name}</TableCell>
      <TableCell align="center">
        <Input
          item={item}
          field="value"
          onChangeVal={onChangeVal}
        />
      </TableCell>
      <TableCell align="center">
        <Input
          item={item}
          field="comment"
          onChangeVal={onChangeVal}
        />
      </TableCell>
      <TableCell align="center">{humanDate(item.created_at)}<br/>{humanTime(item.created_at)}</TableCell>
      <TableCell align="center">{humanDate(item.updated_at)}<br/>{humanTime(item.updated_at)}</TableCell>
      <SiteAdminRole>
        <TableCell align="center">
          <RoundBtn
            size="small"
            color="error"
            icon={<Icon tablerIcon="IconTrashFilled"/>}
            onClick={_onDelete}
          />
        </TableCell>
      </SiteAdminRole>
    </TableRow>
  );
};

export default Row;