import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";

interface ISubTitleItem {
  subtitle?: string;
}

const SubTitleItem = ({ subtitle }: ISubTitleItem) => {
  const theme = useTheme();
  const { t } = useLaravelReactI18n();
  if (!subtitle) {
    return null;
  }

  return (
    <Typography
      variant="caption"
      // @ts-ignore
      sx={{ ...theme.typography.subMenuCaption }}
      display="block"
      gutterBottom
    >
      {t(subtitle)}
    </Typography>
  );
};

export default SubTitleItem;