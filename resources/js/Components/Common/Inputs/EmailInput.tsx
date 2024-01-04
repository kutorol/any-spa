import { FormControl, FormHelperText, InputLabel, OutlinedInput } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FormikErrors, FormikValues } from "formik/dist/types";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React, { useMemo } from "react";
import { preventOnSubmit } from "../../../store/reducers/func/input/prevent-submit";
import { hashCode } from "../../../utils/funcs/hash";

interface IEmailInput {
  endAdornment?: React.ReactNode;
  handleBlur?: (e: React.FocusEvent<any>) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
  values: FormikValues;
  errors: FormikErrors<FormikValues>;
  noSubmit?: boolean;
  isRequired?: boolean;

  [key: string]: any;
}

const EmailInput = ({
                      noSubmit,
                      errors,
                      values,
                      handleBlur = (e) => {
                      },
                      handleChange,
                      isRequired = false,
                      ...otherInputProps
                    }: IEmailInput) => {
  const theme = useTheme();

  const emailID = useMemo(() => `email-${hashCode(`email-${new Date().toString()}`)}`, []);
  const hasErr = Boolean(errors.email);
  const { t } = useLaravelReactI18n();

  return (
    <FormControl
      fullWidth
      error={hasErr}
      // @ts-ignore
      sx={{ ...theme.typography.customInput }}
    >
      <InputLabel color="secondary" htmlFor={emailID}>{t("E-mail")}{isRequired && " *"}</InputLabel>
      <OutlinedInput
        id={emailID}
        type="email"
        value={values.email}
        name="email"
        onBlur={handleBlur}
        onChange={handleChange}
        color={"secondary"}
        onKeyDown={preventOnSubmit(noSubmit)}
        {...otherInputProps}
      />
      {hasErr && (
        <FormHelperText error>
          {errors.email}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default EmailInput;