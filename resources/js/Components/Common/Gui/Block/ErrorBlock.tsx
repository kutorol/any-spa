import { Grid, Typography } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { toggleSupportTech } from "../../../../utils/funcs/event";
import MainCard from "../../MainCard/MainCard";
import CustomAlert from "../Alert/CustomAlert";
import Btn from "../Btn/Btn";
import Icon from "../Common/Icon";

interface IErrorBlock {
  errorText?: string;
  actionOnReload?: (e: React.SyntheticEvent) => void;
}

const ErrorBlock = ({ errorText, actionOnReload }: IErrorBlock) => {
  const { t } = useLaravelReactI18n();
  const onReload = actionOnReload ? actionOnReload : () => window.location.reload();

  return (
    <MainCard>
      <CustomAlert
        title={<Typography variant="h4" color="inherit">{t("Ошибка")}</Typography>}
        sx={{ mb: 2 }}
        color="error"
        icon={<Icon tablerIcon="IconBug" size="1.5rem"/>}
        subtitleElement={
          <>
            {errorText && (
              <Typography variant="subtitle1" color="inherit">
                {errorText}
              </Typography>
            )}

            <Typography variant="subtitle1" color="inherit">
              {t("Обновите страницу или обратитесь в техническую поддержку")}
            </Typography>
          </>
        }
      />

      <Grid container item justifyContent="center">
        <Btn
          webTitle={t("Обновить страницу")}
          mobTitle={t("Обновить")}
          icon={<Icon tablerIcon="IconRefresh"/>}
          variant="contained"
          color="error"
          onClick={onReload}
          sx={{ mr: 1 }}
        />

        <Btn
          webTitle={t("Техническая поддержка")}
          mobTitle={t("Тех. поддержка")}
          icon={<Icon tablerIcon="IconLifebuoy"/>}
          variant="contained"
          color="secondary"
          onClick={toggleSupportTech}
        />
      </Grid>
    </MainCard>
  );
};

export default ErrorBlock;