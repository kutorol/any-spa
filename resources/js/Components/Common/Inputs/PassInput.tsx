import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React, { useEffect, useState } from "react";
// @ts-ignore
import value from "../../../../assets/scss/themes-vars.module.scss";
import { strengthColor, strengthIndicator } from "../../../utils/funcs/password-strength";
import PassStrengthBar from "../../Pages/Auth/Register/Form/PassStrengthBar";
import CustomInput from "./CustomInput";

const PassInput = ({
 handleBlur,
 handleChange,
 touched,
 values,
 errors,
 theme,
 isConfirmPass = false,
 withStrength = false,
 withCheckingConfirmation = false,
 passwordsEqual = false
}) => {
  const { t } = useLaravelReactI18n();

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
    changePassword(values[ name ]);
  }, [values[ name ]]);

  const type = showPassword ? "text" : "password";
  const title = isConfirmPass ? t("Повторный пароль") : t("Пароль");

  const checkingStyle = { color: passwordsEqual ? value.successDark : value.errorMain };
  const checkingText = passwordsEqual ? t("Пароли одинаковые") : t("Пароли не совпадают");

  const spacing = 2;
  const iconEndAdornment = showPassword ? <Visibility/> : <VisibilityOff/>;
  const endAdornment = (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
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
        touched={touched}
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