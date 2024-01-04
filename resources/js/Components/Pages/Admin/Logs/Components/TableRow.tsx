import { TableCell, TableRow as TableRowMui } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import { humanDateTime } from "../../../../../utils/funcs/date";
import { getUrl } from "../../../../../utils/funcs/url";
import { ILog } from "../../../../../utils/interfaces/admin/logs";
import Btn from "../../../../Common/Gui/Btn/Btn";

interface ITableRow {
  log: ILog;
}

const TableRow = ({ log }: ITableRow) => {
  return (
    <TableRowMui>
      <TableCell align="center">
        <Btn
          component={Link}
          color="primary"
          to={getUrl(`/admin/logs/${log.id}`)}
          webTitle={log.path}
          mobTitle={log.path}
        />
      </TableCell>
      <TableCell align="center">{humanDateTime(log.date)}</TableCell>
    </TableRowMui>
  );
};

export default TableRow;