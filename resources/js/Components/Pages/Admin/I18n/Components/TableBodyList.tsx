import { TableBody } from "@mui/material";
import * as React from "react";
import { ELanguages } from "../../../../../utils/enums/user";
import { II18n } from "../../../../../utils/interfaces/admin/i18n";
import Row from "./Row";

interface ITableBodyList {
  items: II18n[];
  onChangeVal: (label: string, locale: ELanguages, val: string) => void;
}

const TableBodyList = ({ items, onChangeVal }: ITableBodyList) => {
  const itemsTSX = items.map((item: II18n, i: number) => {
    const k = `${item.label}_${i}`;
    return (
      <Row
        key={k}
        item={item}
        onChangeVal={onChangeVal}
      />
    );
  });

  return (
    <TableBody>
      {itemsTSX}

    </TableBody>
  );
};

export default TableBodyList;