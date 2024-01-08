import { Switch } from "@mui/material";
import * as React from "react";
import { EColor } from "../../../../utils/enums/common";

interface IColoredSwitch {
  checked: boolean;
  onChange: (v: boolean) => void;
  color?: "default" | EColor;

  [k: string]: any;
}

const ColoredSwitch = ({ color = EColor.SECONDARY, checked, onChange, ...other }: IColoredSwitch) => {

  const _onChange = e => onChange(!checked);

  let v = "200";
  // @ts-ignore
  if (![EColor.SECONDARY, EColor.PRIMARY].includes(color)) {
    v = "light";
  }

  return (
    <Switch
      edge="start"
      sx={{
        "& .MuiButtonBase-root:not(.Mui-checked ), & .MuiButtonBase-root:not(.Mui-checked) + .MuiSwitch-track": {
          color: `${color}.${v}`
        },
        "& .MuiButtonBase-root:not(.Mui-checked) + .MuiSwitch-track": {
          backgroundColor: `${color}.${v}`
        }
      }}
      checked={checked}
      onChange={_onChange}
      color={color}
      {...other}
    />
  );
};

export default ColoredSwitch;