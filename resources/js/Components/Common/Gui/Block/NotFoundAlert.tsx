import { Grid } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import MainCard from "../../MainCard/MainCard";
import CustomAlert from "../Alert/CustomAlert";
import Icon from "../Common/Icon";

interface INotFoundAlert {
  title?: React.ReactNode | string;
  subTitle?: React.ReactNode | string;
}

const NotFoundAlert = ({ title, subTitle }: INotFoundAlert) => {
  const { t } = useLaravelReactI18n();
  title = title || t("Записей не найдено");
  subTitle = subTitle || t("На запрашиваемой странице нет записей. Перейдите на существующую страницу!");

  return (
    <Grid container>
      <Grid item xs={12}>
        <MainCard>
          <CustomAlert
            color="warning"
            title={title}
            icon={<Icon tablerIcon="IconError404"/>}
            subtitleElement={subTitle}
          />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default NotFoundAlert;