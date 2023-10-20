import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
// @ts-ignore
import React from "react";

interface ICustomSelect {
  variants: { [key in any]: string } | string[];
  label: string;
  labelId: string;
  onChange: (n: any) => void;
  chosenVariant: any;
}

const CustomSelect = ({ variants, label, onChange, labelId, chosenVariant, ...props }: ICustomSelect) => {
  let items = null;
  if (Array.isArray(variants)) {
    items = variants.map((v: string, i: number) => (
      <MenuItem key={i} value={i}>{v}</MenuItem>
    ));
  } else {
    items = Object.keys(variants).map((k: any, i: number) => (
      <MenuItem key={i} value={k}>{variants[ k ]}</MenuItem>
    ));
  }

  const _onChange = (e: React.ChangeEvent<{ value: unknown }>): void => {
    onChange(e.target.value);
  };

  return (
    <Select
      defaultValue={chosenVariant}
      labelId={labelId}
      value={chosenVariant}
      label={label}
      onChange={_onChange}
      variant="outlined"
      {...props}
    >
      {items}
    </Select>
  );
};

export default CustomSelect;