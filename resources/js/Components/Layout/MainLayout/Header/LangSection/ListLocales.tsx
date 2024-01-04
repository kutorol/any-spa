import { List } from "@mui/material";
import * as React from "react";
import { ELanguages } from "../../../../../utils/enums/user";
import OneLang from "./OneLang";

interface IListLocales {
  onChangeLocale: (l: ELanguages) => void;
}

const ListLocales = ({ onChangeLocale }: IListLocales) => {
  // @ts-ignore
  const items = Object.values(ELanguages).map(((l: ELanguages, i: number) => (
    <OneLang
      key={i}
      l={l}
      onChangeLocale={onChangeLocale}
    />
  )));

  const sx = { p: 0, minWidth: "150px" };

  return (
    <List dense sx={sx}>
      {items}
    </List>
  );
};

export default ListLocales;