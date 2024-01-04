import Link from "@mui/material/Link";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import Typography from "../Typography";

const FooterIconCopyright = () => {
  const { t } = useLaravelReactI18n();

  return (
    <Typography variant="caption">
      {t("Иконки и картинки взяты с сайтов")}
      &nbsp;
      <Link href="https://www.freepik.com" target="_blank" rel="nofollow noopener noreferrer">
        Freepik
      </Link>
      &nbsp;
      {t("и")}
      &nbsp;
      <Link href="https://www.flaticon.com" target="_blank" rel="nofollow noopener noreferrer">
        Flaticon
      </Link>
    </Typography>
  );
};

export default FooterIconCopyright;