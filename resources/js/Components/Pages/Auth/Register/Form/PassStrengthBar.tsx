import { Box, FormControl, Grid, Typography } from "@mui/material";
import * as React from "react";

const PassStrengthBar = ({ strength, levelStrength }) => {
  const sx = { mb: 2 };
  const spacing = 2;
  const boxStyle = { backgroundColor: levelStrength?.color };
  const boxSx = { width: 85, height: 8, borderRadius: "7px" };
  const label = levelStrength?.label;

  if (!strength) {
    return null;
  }

  return (
    <FormControl fullWidth>
      <Box sx={sx}>
        <Grid
          container
          spacing={spacing}
          alignItems="center"
        >
          <Grid item>
            <Box
              style={boxStyle}
              sx={boxSx}
            />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" fontSize="0.75rem">
              {label}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </FormControl>
  );
};

export default PassStrengthBar;