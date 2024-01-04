import { Box, Grid, Tooltip } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { borderRadius } from "../../../../../../store/constant";
import Icon from "../../../../../Common/Gui/Common/Icon";
import Copyright from "./Copyright";

const iconStyle = {
  width: 48,
  height: 48,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "warning.main",
  borderRadius: borderRadius,
  mr: 1,
  "&:hover": {
    bgcolor: "warning.dark"
  }
};

const SocialBlock = () => {
  const { t } = useLaravelReactI18n();
  const sx = { height: 120 };
  const sxBox = { display: "flex" };

  const socials = [
    // {url: "https://vk.com/", tooltip: t("Перейти в VK"), icon: "IconBrandVk" },
  ];

  const items = socials.map((s, i: number) => {
    return (
      <Tooltip key={i} title={s.tooltip}>
        <Box component="a" href={s.url} sx={iconStyle} target="_blank">
          {typeof s.icon === "string" ? <Icon tablerIcon={s.icon} size="1.5rem"/> : s.icon}
        </Box>
      </Tooltip>
    );
  });

  return (
    <Grid
      container
      spacing={2}
      sx={sx}
    >
      {(items.length > 0) && (
        <Grid item xs={12} sx={sxBox}>
          {items}
        </Grid>
      )}
      <Grid item xs={12}>
        <Copyright/>
      </Grid>
    </Grid>
  );
};

export default SocialBlock;