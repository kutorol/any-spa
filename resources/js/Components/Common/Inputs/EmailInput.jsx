import React from 'react'
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";

const EmailInput = ({ touched, errors, theme, values, handleBlur, handleChange }) => {
  const emailID = "outlined-adornment-email-register";
  const hasErr = Boolean(touched.email && errors.email);
  const { t } = useLaravelReactI18n();

  return (
    <FormControl
      fullWidth
      error={hasErr}
      sx={{ ...theme.typography.customInput }}
    >
      <InputLabel htmlFor={emailID}>
        {t("E-mail")}
      </InputLabel>
      <OutlinedInput
        id={emailID}
        type="email"
        value={values.email}
        name="email"
        onBlur={handleBlur}
        onChange={handleChange}
      />
      {hasErr && (
        <FormHelperText error id="standard-weight-helper-text--register">
          {errors.email}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default EmailInput;