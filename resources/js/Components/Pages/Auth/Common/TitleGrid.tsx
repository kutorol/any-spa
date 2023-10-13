import { Grid, Stack, Typography } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React from "react";
import { useParams } from "react-router";

const TitleGrid = ({
 xsNum,
 themeColor,
 matchDownSM,
 isRegister = false,
 isPasswordReset = false,
 isPasswordResetConfirm = false
}) => {
  const { t } = useLaravelReactI18n();
  const direction = matchDownSM ? "column-reverse" : "row";
  const variant = matchDownSM ? "h3" : "h2";
  const textAlign = matchDownSM ? "center" : "inherit";
  const spacing = 1;

  const params = useParams();

  const titleMap = {
    "register": t("Регистрация"),
    "login": t("Вход"),
    "passReset": t("Восстановление пароля"),
    "passResetConfirm": t("Введите новый пароль")
  };

  const subtitleMap = {
    "register": t("Введите ваши данные для регистрации"),
    "login": t("Введите ваши данные для авторизации"),
    "passReset": t("Введите E-mail для сброса пароля"),
    "passResetConfirm": t("Для :email", { email: params.email || "" })
  };

  let action = "login";
  if (isRegister) {
    action = "register";
  } else if (isPasswordReset) {
    action = "passReset";
  } else if (isPasswordResetConfirm) {
    action = "passResetConfirm";
  }

  return (
    <Grid item xs={xsNum}>
      <Grid
        container
        direction={direction}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={spacing}
          >
            <Typography
              color={themeColor}
              gutterBottom
              variant={variant}
            >
              {titleMap[ action ]}
            </Typography>

            <Typography
              variant="caption"
              fontSize="16px"
              textAlign={textAlign}
            >
              {subtitleMap[ action ]}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TitleGrid;