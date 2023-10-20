import { FormControl, FormHelperText, InputLabel, OutlinedInput } from "@mui/material";
import { FormikErrors, FormikTouched, FormikValues } from "formik/dist/types";
// @ts-ignore
import React from "react";
import LeftSymbols from "../Gui/Common/LeftSymbols";

interface CustomInputProps {
  type: string;
  name: string;
  title: string;
  theme: any;
  endAdornment?: React.ReactNode;
  handleBlur: (e: React.FocusEvent<any>) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
  values: FormikValues;
  touched: FormikTouched<FormikValues>;
  errors: FormikErrors<FormikValues>;
  showLeftChars?: boolean;
  maxLength?: number;
}

const CustomInput = ({
                       type = "text",
                       name,
                       title,
                       touched,
                       errors,
                       theme,
                       values,
                       handleBlur,
                       handleChange,
                       endAdornment,
                       showLeftChars,
                       maxLength
}: CustomInputProps) => {
  const inputID = `${name}-${type}-custom-input`;
  const hasErr = Boolean(touched[ name ] && errors[ name ]);

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
      <InputLabel htmlFor={inputID}>{title}</InputLabel>
      <OutlinedInput
        id={inputID}
        type={type}
        value={values[ name ]}
        name={name}
        label={title}
        onBlur={handleBlur}
        onChange={onChange}
        endAdornment={endAdornment}
      />

      {(!hasErr && showLeftChars && maxLength) && (
        <LeftSymbols
          value={values[ name ]}
          maxLength={maxLength}
        />
      )}

      {hasErr && (
        <FormHelperText error>
          {errors[ name ]}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomInput;