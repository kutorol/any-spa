import { FormControlLabel, Grid, Stack, Typography } from "@mui/material";
import { IconKeyOff } from "@tabler/icons-react";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React from "react";
import { Link } from "react-router-dom";
import GoogleBtnBlock from "../../../Common/Inputs/GoogleBtnBlock";
import FormInputsLogin from "../Login/Form/FormInputs";
import FormPasswordReset from "../PasswordReset/Form/FormInputs";
import FormPasswordResetConfirm from "../PasswordReset/Form/FormInputsConfirm";
import FormInputsRegister from "../Register/Form/FormInputs";
import AuthEmailTitle from "./AuthEmailTitle";
import OrBlock from "./OrBlock";

function AuthForm({ isRegister = false, isPasswordReset = false, isPasswordResetConfirm = false }) {
  const spacing = 2;
  const { t } = useLaravelReactI18n();

  let formInputs = null;
  if (isRegister) {
    formInputs = <FormInputsRegister/>;
  } else if (isPasswordReset) {
    formInputs = <FormPasswordReset/>;
  } else if (isPasswordResetConfirm) {
    formInputs = <FormPasswordResetConfirm/>;
  } else {
    formInputs = <FormInputsLogin/>;
  }

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        spacing={spacing}
      >
        <GoogleBtnBlock isRegister={isRegister}/>

        <OrBlock/>

        {(!isPasswordReset) && (<AuthEmailTitle isRegister={isRegister}/>)}
      </Grid>

      {formInputs}

      {(!isRegister && !isPasswordReset) && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={1}
        >
          <FormControlLabel
            label=""
            control={
              <Typography
                variant="subtitle1"
                color="secondary"
                sx={{ textDecoration: "none", cursor: "pointer", mt: 1 }}
                component={Link}
                to="/password/reset"
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={1}
                >
                  <IconKeyOff size="1rem"/> <span>{t("Забыли пароль?")}</span>
                </Stack>
              </Typography>
            }
          />

        </Stack>
      )}
    </>
  );
}

export default AuthForm;
