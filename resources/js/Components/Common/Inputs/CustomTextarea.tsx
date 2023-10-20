import { FormControl, FormHelperText, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FormikErrors, FormikTouched, FormikValues } from "formik/dist/types";
// @ts-ignore
import React from "react";
import LeftSymbols from "../Gui/Common/LeftSymbols";

interface CustomTextareaProps {
  name: string;
  title: string;
  showLeftChars?: boolean;
  maxLength?: number;
  handleBlur: (e: React.FocusEvent<any>) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
  values: FormikValues;
  touched: FormikTouched<FormikValues>;
  errors: FormikErrors<FormikValues>;
}

const CustomTextarea = ({
                          name,
                          title,
                          touched,
                          errors,
                          values,
                          showLeftChars,
                          maxLength,
                          handleBlur,
                          handleChange
}: CustomTextareaProps) => {
  const theme = useTheme();
  const inputID = `${name}-custom-textarea`;
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
      // @ts-ignore
      sx={{ ...theme.typography.customTextarea }}
    >
      <TextField
        error={hasErr}
        placeholder=""
        id={inputID}
        variant="outlined"
        type="text"
        multiline
        minRows={4}
        value={values[ name ]}
        name={name}
        label={title}
        onBlur={handleBlur}
        onChange={onChange}
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

export default CustomTextarea;