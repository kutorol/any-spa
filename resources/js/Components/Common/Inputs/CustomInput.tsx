import { FormControl, FormHelperText, InputLabel, OutlinedInput } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FormikErrors, FormikValues } from "formik/dist/types";
import * as React from "react";
import { preventOnSubmit } from "../../../store/reducers/func/input/prevent-submit";
import LeftSymbols from "../Gui/Common/LeftSymbols";

interface CustomInputProps {
  type?: "text" | "email" | "password" | string;
  name: string;
  title: string;
  helpText?: string | React.ReactNode;
  theme?: any;
  endAdornment?: React.ReactNode;
  handleBlur?: (e: React.FocusEvent<any>) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
  values: FormikValues;
  errors?: FormikErrors<FormikValues>;
  showLeftChars?: boolean;
  // если true, то submit по enter отменяем
  noSubmit?: boolean;
  maxLength?: number;

  [key: string]: any;
}

const CustomInput = ({
                       type = "text",
                       name,
                       title,
                       errors = {},
                       theme,
                       values,
                       handleBlur = e => {
                       },
                       handleChange,
                       endAdornment,
                       showLeftChars,
                       maxLength,
                       noSubmit = false,
                       helpText,
                       ...otherInputProps
                     }: CustomInputProps) => {
  const inputID = `${name}-${type}-custom-input`;
  const hasErr = Boolean(errors[name]);

  theme = theme ? theme : useTheme();

  const onChange = (e: React.ChangeEvent<any>): void => {
    if (maxLength && e.target.value.length > maxLength) {
      e.target.value = e.target.value.substring(0, maxLength);
    }

    handleChange(e);
  };

  return (
    <FormControl
      fullWidth
      error={hasErr}
      sx={{ ...theme.typography.customInput }}
    >
      <InputLabel color="secondary" htmlFor={inputID}>{title}</InputLabel>
      <OutlinedInput
        id={inputID}
        type={type}
        value={values[name]}
        name={name}
        label={title}
        onBlur={handleBlur}
        onChange={onChange}
        endAdornment={endAdornment}
        color={"secondary"}
        onKeyDown={preventOnSubmit(noSubmit)}
        {...otherInputProps}
      />

      {(!hasErr && showLeftChars && maxLength) && (
        <LeftSymbols
          value={values[name]}
          maxLength={maxLength}
        />
      )}

      {hasErr && (
        <FormHelperText error>
          {errors[name]}
        </FormHelperText>
      )}

      {helpText && (
        <FormHelperText disabled component="div">
          {helpText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomInput;