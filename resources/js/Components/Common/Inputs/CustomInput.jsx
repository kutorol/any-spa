import React from 'react'
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from "@mui/material";

const CustomInput = ({ type = 'text', name, title, touched, errors, theme, values, handleBlur, handleChange, endAdornment  }) => {
  const inputID = `${name}-${type}-custom-input`;
  const hasErr = Boolean(touched[name] && errors[name]);

  return (
    <FormControl
      fullWidth
      error={hasErr}
      sx={{ ...theme.typography.customInput }}
    >
      <InputLabel htmlFor={inputID}>{title}</InputLabel>
      <OutlinedInput
        id={inputID}
        type={type}
        value={values[name]}
        name={name}
        label={title}
        onBlur={handleBlur}
        onChange={handleChange}
        endAdornment={endAdornment}
      />

      {hasErr && (
        <FormHelperText error id="standard-weight-helper-text--register">
          {errors[name]}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomInput;