import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FormikErrors, FormikValues } from "formik/dist/types";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React, { useEffect, useState } from "react";
// @ts-ignore
import value from "../../../../assets/scss/themes-vars.module.scss";
import { strengthColor, strengthIndicator } from "../../../utils/funcs/password-strength";
import PassStrengthBar from "../../Pages/Auth/Register/Form/PassStrengthBar";
import CustomInput from "./CustomInput";

interface IPassInput {
  handleBlur?: (e: React.FocusEvent<any>) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
  values: FormikValues;
  errors: FormikErrors<FormikValues>;
  isConfirmPass?: boolean;
  withStrength?: boolean;
  withCheckingConfirmation?: boolean;
  passwordsEqual?: boolean;
}

const PassInput = ({
                     handleBlur,
                     handleChange,
                     values,
                     errors,
                     isConfirmPass = false,
                     withStrength = false,
                     withCheckingConfirmation = false,
                     passwordsEqual = false
                   }: IPassInput) => {
  const { t } = useLaravelReactI18n();
  const theme = useTheme();

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = e => e.preventDefault();

  const changePassword = value => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    // @ts-ignore
    setLevel(strengthColor(temp));
  };

  const name = isConfirmPass ? "password_confirmation" : "password";

  useEffect(() => {
    changePassword(values[name]);
  }, [values[name]]);

  const type = showPassword ? "text" : "password";
  const title = isConfirmPass ? t("Повторный пароль") : t("Пароль");

  const checkingStyle = { color: passwordsEqual ? value.successDark : value.errorMain };
  const checkingText = passwordsEqual ? t("Пароли одинаковые") : t("Пароли не совпадают");

  const spacing = 2;
  const iconEndAdornment = showPassword ? <Visibility/> : <VisibilityOff/>;
  const endAdornment = (
    <InputAdornment position="end">
      <IconButton
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        edge="end"
        size="large"
      >
        {iconEndAdornment}
      </IconButton>
    </InputAdornment>
  );

  return (
    <>
      <CustomInput
        title={title}
        type={type}
        name={name}
        values={values}
        handleBlur={handleBlur}
        handleChange={handleChange}
        errors={errors}
        theme={theme}
        endAdornment={endAdornment}
      />

      {withStrength && (
        <PassStrengthBar
          strength={strength}
          levelStrength={level}
        />
      )}

      {withCheckingConfirmation && (
        <Grid
          container
          spacing={spacing}
          alignItems="center"
        >
          <Grid item>
            <Typography variant="subtitle1" fontSize="0.75rem" style={checkingStyle}>
              {checkingText}
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default PassInput;