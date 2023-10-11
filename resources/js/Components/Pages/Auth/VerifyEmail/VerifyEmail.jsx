import React, { useEffect } from 'react'
import MainCard from "../../../Common/MainCard/MainCard";
import { Divider, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { IconSend } from "@tabler/icons-react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { changeFullScreenLoaderState, } from "../../../../store/reducers/common/fullScreenLoader";
import r from '../../../../utils/ajax'
import useSecondsLeftTimer from "../../../../hooks/useSecondsLeftTimer";
import Btn from "../../../Common/Gui/Btn/Btn";
import CustomAlert from "../../../Common/Gui/Alert/CustomAlert";

const VerifyEmail = () => {
  const { t, tChoice } = useLaravelReactI18n();
  const xs = 12;
  const spacing = 2;

  const navigate = useNavigate();
  const verifiedEmail = useSelector(s => s.userInfo.user.verified_email);
  const { leftSeconds, setLeftSeconds } = useSecondsLeftTimer({
    initStorageNameLeftSeconds: "verify_email_again_action"
  });

  useEffect(() => {
    if (verifiedEmail) {
      navigate('/');
    }
    return () => {
    };
  }, [verifiedEmail]);


  const onClickSendEmail = e => {
    e && e.preventDefault();
    if (leftSeconds > 0) {
      return;
    }

    changeFullScreenLoaderState(true)
    r.post("/api/email/verification-notification", {}).then(res => {
      res.status && setLeftSeconds(60);
      changeFullScreenLoaderState(false)
    });
  };

  if (verifiedEmail) {
    return null;
  }

  return (
    <MainCard title={t("Подтверждение E-mail")}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        spacing={spacing}
      >
        <Grid item xs={xs}>
          <CustomAlert
            color="warning"
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
              icon={<IconSend/>}
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
              webTitle={t("Отправить письмо еще раз")}
              mobTitle={t("Отправить")}
              onClick={onClickSendEmail}
            />
          </Grid>
        )}
      </Grid>
    </MainCard>
  );
};

export default VerifyEmail;