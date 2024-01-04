import { Box, Button } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";

interface ISubmitBtn {
  disabled: boolean;
  isRegister?: boolean;
  isPasswordReset?: boolean;
}

const SubmitBtn = ({ disabled, isRegister = false, isPasswordReset = false }: ISubmitBtn) => {
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
      <Button
        disableElevation
        disabled={disabled}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="secondary"
      >
        {title}
      </Button>
    </Box>
  );
};

export default SubmitBtn;