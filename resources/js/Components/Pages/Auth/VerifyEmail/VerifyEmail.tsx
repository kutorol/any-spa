import { Divider, Grid, Typography } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import CustomAlert from "../../../Common/Gui/Alert/CustomAlert";
import Btn from "../../../Common/Gui/Btn/Btn";
import Icon from "../../../Common/Gui/Common/Icon";
import MainCard from "../../../Common/MainCard/MainCard";

interface VerifyEmailProps {
  leftSeconds: number;
  onClick: (e) => void;
}

const VerifyEmail = ({ leftSeconds, onClick }: VerifyEmailProps) => {
  const { t, tChoice } = useLaravelReactI18n();
  const xs = 12;
  const spacing = 2;

  return (
    // @ts-ignore
    <MainCard title={t("Подтверждение E-mail")}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        spacing={spacing}
      >
        <Grid item xs={xs}>
          <CustomAlert
            title={t("E-mail не подтвержден")}
            subtitleElement={t("Проверьте почту или отправьте еще раз письмо с проверкой.")}
          />
        </Grid>

        <Grid item xs={xs}>
          <Divider/>
        </Grid>

        {(leftSeconds > 0) ? (
          <Grid item xs={xs}>
            <Typography variant="subtitle2">
              {t("До следующей отправки письма")}: <b>{leftSeconds} {tChoice("секунда|секунды|секунд", leftSeconds)}</b>
            </Typography>
            <br/>
            <CustomAlert
              title={t("Письмо отправлено")}
              color="success"
              icon={<Icon tablerIcon="IconSend"/>}
              subtitleElement={<>
                {t("Письмо с проверочной ссылкой должно придти")} <b>{t("в течении нескольких минут")}</b>.
                <br/>
                {t("Возможно нужно проверить папку")} <b>{t("Спам")}</b>
              </>}
            />
          </Grid>
        ) : (
          <Grid item xs={xs}>
            <Btn
              variant="contained"
              webTitle={t("Отправить письмо еще раз")}
              mobTitle={t("Отправить")}
              icon={<Icon tablerIcon="IconSend"/>}
              onClick={onClick}
            />
          </Grid>
        )}
      </Grid>
    </MainCard>
  );
};

export default VerifyEmail;