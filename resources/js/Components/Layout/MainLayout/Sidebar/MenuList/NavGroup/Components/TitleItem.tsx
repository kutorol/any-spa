import { Typography } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";

interface ITitleItem {
  title?: string;
  menuSelected: boolean;

  [k: string]: any;
}

const TitleItem = ({ title, menuSelected, ...other }: ITitleItem) => {
  const { t } = useLaravelReactI18n();
  if (!title) {
    return null;
  }

  return (
    <Typography
      // @ts-ignore
      variant={menuSelected ? "h5" : "body1"}
      color="inherit"
      {...other}
    >
      {t(title)}
    </Typography>
  );
};

export default TitleItem;