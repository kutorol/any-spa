import { FormControlLabel, Grid, Stack, Typography } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { Link } from "react-router-dom";
import { ERoles } from "../../../../utils/enums/user";
import { getUrl } from "../../../../utils/funcs/url";
import Icon from "../../../Common/Gui/Common/Icon";
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

  const [chosenRole, setChosenRole] = React.useState<ERoles>(ERoles.USER);

  let formInputs = null;
  if (isRegister) {
    formInputs = (
      <FormInputsRegister
        chosenRole={chosenRole}
        setChosenRole={setChosenRole}
      />
    );
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
        <GoogleBtnBlock
          chosenRole={chosenRole}
          isRegister={isRegister}
        />

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
                to={getUrl("/password/reset")}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={1}
                >
                  <Icon tablerIcon="IconKeyOff" stroke={undefined} size="1rem"/> <span>{t("Забыли пароль?")}</span>
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
