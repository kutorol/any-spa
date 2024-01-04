import { Table, TableBody, TableContainer } from "@mui/material";
import * as React from "react";
import { IProblemInterface } from "../../../../../../utils/interfaces/admin/tech-support";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

interface ITableOneProblem {
  problem: IProblemInterface;
}

const TableOneProblem = ({ problem }: ITableOneProblem) => {
  return (
    <TableContainer sx={{ mb: 5 }}>
      <Table>
        <TableHead/>

        <TableBody>
          <TableRow problem={problem}/>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableOneProblem;