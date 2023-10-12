import { Box, Button, Divider, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React from "react";

const OrBlock = () => {
  const theme = useTheme();
  const { t } = useLaravelReactI18n();

  return (
    <Grid item xs={12}>
      <Box sx={{ alignItems: "center", display: "flex" }}>
        <Divider sx={{ flexGrow: 1 }} orientation="horizontal"/>
        <Button
          variant="outlined"
          sx={{
            cursor: "unset",
            m: 2,
            py: 0.5,
            px: 7,
            borderColor: `${theme.palette.grey[ 100 ]} !important`,
            color: `${theme.palette.grey[ 900 ]}!important`,
            fontWeight: 500,
            borderRadius: `15px`
          }}
          disableRipple
          disabled
        >
          {t("ИЛИ")}
        </Button>
        <Divider sx={{ flexGrow: 1 }} orientation="horizontal"/>
      </Box>
    </Grid>
  );
};

export default OrBlock;