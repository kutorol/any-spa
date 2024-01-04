import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";

interface ITitleGroup {
  title?: string;
  subtitle?: string;
}

const TitleGroup = ({ title, subtitle }: ITitleGroup) => {
  const { t } = useLaravelReactI18n();
  const theme = useTheme();

  if (!title) {
    return null;
  }

  return (
    <Typography
      variant="caption"
      // @ts-ignore
      sx={{ ...theme.typography.menuCaption }}
      display="block"
      gutterBottom
    >
      {t(title)}
      {subtitle && (
        <Typography
          variant="caption"
          // @ts-ignore
          sx={{ ...theme.typography.subMenuCaption }}
          display="block"
          gutterBottom
        >
          {t(subtitle)}
        </Typography>
      )}
    </Typography>
  );
};

export default TitleGroup;