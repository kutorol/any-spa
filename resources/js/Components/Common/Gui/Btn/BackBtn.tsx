import { Grid } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { Link } from "react-router-dom";
import { getUrl, navToBackOrDefaultURL } from "../../../../utils/funcs/url";
import Icon from "../Common/Icon";
import Btn from "./Btn";

interface IBackBtn {
  defaultBackUrl: string;
  onAction?: (e: React.SyntheticEvent, defaultBackUrl: string) => void;

  [k: string]: any;
}

const BackBtn = ({ defaultBackUrl, onAction, ...props }: IBackBtn) => {
  const { t } = useLaravelReactI18n();

  const onClick = (e: React.SyntheticEvent): void => {
    e && e.preventDefault();
    if (onAction) {
      onAction(e, defaultBackUrl);
      return;
    }

    navToBackOrDefaultURL(defaultBackUrl);
  };

  const backTitle = t("Назад");

  return (
    <Grid container sx={{ mb: 2 }}>
      <Grid item xs={12}>
        <Btn
          component={Link}
          to={getUrl(defaultBackUrl)}
          webTitle={backTitle}
          mobTitle={backTitle}
          icon={<Icon tablerIcon="IconChevronLeft"/>}
          onClick={onClick}
          {...props}
        />
      </Grid>
    </Grid>
  );
};

export default BackBtn;