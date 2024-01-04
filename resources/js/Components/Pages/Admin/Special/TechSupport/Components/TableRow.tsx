import { TableCell, TableRow as TableRowMui } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import { humanDate } from "../../../../../../utils/funcs/date";
import { getUrl } from "../../../../../../utils/funcs/url";
import { IProblemInterface } from "../../../../../../utils/interfaces/admin/tech-support";
import Btn from "../../../../../Common/Gui/Btn/Btn";
import ChipStatus from "./ChipStatus";
import ChipType from "./ChipType";

interface ITableRow {
  problem: IProblemInterface;
  withShortComment?: boolean;
}

const TableRow = ({ problem, withShortComment }: ITableRow) => {

  return (
    <TableRowMui selected={!withShortComment} hover={withShortComment}>
      <TableCell align="center">
        {withShortComment ? (
          <Btn
            component={Link}
            color="primary"
            to={getUrl(`/admin/tech-support/${problem.id}`)}
            webTitle={problem.id.toString()}
            mobTitle={problem.id.toString()}
          />
        ) : problem.id}
      </TableCell>
      <TableCell align="center">{problem.email}</TableCell>
      <TableCell align="center">{problem.user_id || "-"}</TableCell>
      <TableCell align="center">
        <ChipType type={problem.type}/>
      </TableCell>
      <TableCell align="center">
        <ChipStatus status={problem.status}/>
      </TableCell>

      {withShortComment && (
        <TableCell align="center">{problem.comment.slice(0, 50) + "..."}</TableCell>
      )}

      <TableCell align="center">{humanDate(problem.created_at)}</TableCell>
      <TableCell align="center">{humanDate(problem.updated_at)}</TableCell>
    </TableRowMui>
  );
};

export default TableRow;