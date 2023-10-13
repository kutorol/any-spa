import { Box, Button } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React from "react";
import AnimateButton from "../../../Common/AnimateButton/AnimateButton";

const SubmitBtn = ({ isSubmitting, isRegister = false, isPasswordReset = false }) => {
  const { t } = useLaravelReactI18n();
  const sx = { mt: 2 };

  let title = t("Войти");
  if (isRegister) {
    title = t("Зарегистрироваться");
  } else if (isPasswordReset) {
    title = t("Восстановить пароль");
  }

  return (
    <Box sx={sx}>
      {/*@ts-ignore*/}
      <AnimateButton>
        <Button
          disableElevation
          disabled={isSubmitting}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="secondary"
        >
          {title}
        </Button>
      </AnimateButton>
    </Box>
  );
};

export default SubmitBtn;