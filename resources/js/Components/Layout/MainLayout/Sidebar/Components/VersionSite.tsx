import { Chip, Stack, Tooltip } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { SiteVersion } from "../../../../../store/constant";

const VersionSite = () => {
  const { t } = useLaravelReactI18n();
  const sx = { mb: 2 };

  return (
    <Tooltip title={t("Текущая версия сайта")}>
      <Stack
        direction="row"
        justifyContent="center"
        sx={sx}
      >
        {/* @ts-ignore */}
        <Chip
          label={SiteVersion}
          disabled
          chipcolor="secondary"
          size="small"
        />
      </Stack>
    </Tooltip>
  );
};

export default VersionSite;