import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";

interface ICustomSelect {
  variants: { [key in any]: string } | string[];
  label: string;
  labelId: string;
  onChange: (e: React.ChangeEvent<{ value: unknown }>) => void;
  chosenVariant: any;

  [key: string]: any;
}

const CustomSelect = ({ variants, label, onChange, labelId, chosenVariant, ...props }: ICustomSelect) => {
  let items = null;
  if (Array.isArray(variants)) {
    items = variants.map((v: string, i: number) => (
      <MenuItem key={i} value={i}>{v}</MenuItem>
    ));
  } else {
    items = Object.keys(variants).map((k: any, i: number) => (
      <MenuItem key={i} value={k}>{variants[k]}</MenuItem>
    ));
  }

  return (
    <Select
      defaultValue={chosenVariant}
      labelId={labelId}
      value={chosenVariant}
      label={label}
      onChange={onChange}
      variant="outlined"
      color="secondary"
      {...props}
    >
      {items}
    </Select>
  );
};

export default CustomSelect;