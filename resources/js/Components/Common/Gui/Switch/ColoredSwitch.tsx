import { Grid, Switch } from "@mui/material";
// @ts-ignore
import React, { useState } from "react";

interface IColoredSwitch {

}

const ColoredSwitch = ({}: IColoredSwitch) => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <Grid container alignItems="center">
      <Grid item xs={4}>Слева</Grid>
      <Grid item xs={4}>
        <Switch
          sx={{
            "& .MuiButtonBase-root:not(.Mui-checked ), & .MuiButtonBase-root:not(.Mui-checked) + .MuiSwitch-track": {
              color: "secondary.200"
            },
            "& .MuiButtonBase-root:not(.Mui-checked) + .MuiSwitch-track": {
              backgroundColor: "secondary.200"
            }
          }}
          checked={checked}
          onChange={e => setChecked(!checked)}
          color="secondary"
        />
      </Grid>
      <Grid item xs={4}>Справа</Grid>
    </Grid>
  );
};

export default ColoredSwitch;