import { TableBody } from "@mui/material";
import * as React from "react";
import { IFeatureToggle } from "../../../../../utils/interfaces/admin/toggle";
import Row from "./Row";

interface ITableBodyList {
  items: IFeatureToggle[];
  onChangeVal: (name: string, value: string, comment: string) => void;
  onDelete: (name: string) => void;
}

const TableBodyList = ({ items, onChangeVal, onDelete }: ITableBodyList) => {
  const itemsTSX = items.map((item: IFeatureToggle) => (
    <Row
      key={`${item.name}_${item.value}_${item.comment}_${item.randDataForUpdate || ""}`}
      item={item}
      onChangeVal={onChangeVal}
      onDelete={onDelete}
    />
  ));

  return (
    <TableBody>{itemsTSX}</TableBody>
  );
};

export default TableBodyList;