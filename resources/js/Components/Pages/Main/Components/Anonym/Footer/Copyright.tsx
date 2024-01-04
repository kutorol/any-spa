import { Link } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { SiteName, SiteVersion, WorkFromYear } from "../../../../../../store/constant";
import { getUrl } from "../../../../../../utils/funcs/url";
import Typography from "../Typography";

const Copyright = () => {
  const { t } = useLaravelReactI18n();
  const year = new Date().getFullYear();

  return (
    <Typography variant="caption">
      © {year === WorkFromYear ? year : `${WorkFromYear}-${year}`} <Link color="inherit"
                                                                         href={getUrl("/")}>{SiteName}</Link> ({SiteVersion})
      <br/>
      {t("Все права защищены")}
    </Typography>
  );
};

export default Copyright;