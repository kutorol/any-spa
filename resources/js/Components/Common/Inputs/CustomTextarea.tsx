import { FormControl, FormHelperText, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FormikErrors, FormikValues } from "formik/dist/types";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import LeftSymbols from "../Gui/Common/LeftSymbols";

interface CustomTextareaProps {
  name: string;
  title: string;
  helpText?: string | React.ReactNode;
  showLeftChars?: boolean;
  maxLength?: number;
  handleBlur?: (e: React.FocusEvent<any>) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
  values?: FormikValues;
  value?: any;
  errors?: FormikErrors<FormikValues>;
  canUseMarkdown?: boolean;
  shrink?: boolean;
  placeholder?: string;

  [key: string]: any;
}

const CustomTextarea = ({
                          name,
                          title,
                          helpText,
                          errors = {},
                          values,
                          value,
                          showLeftChars,
                          maxLength,
                          handleBlur,
                          handleChange,
                          canUseMarkdown,
                          placeholder,
                          shrink,
                          ...otherTextAreaProps
                        }: CustomTextareaProps) => {
  const theme = useTheme();
  const inputID = `${name}-custom-textarea`;
  const hasErr = Boolean(errors[name]);
  const { t } = useLaravelReactI18n();
  const onChange = (e: React.ChangeEvent<any>): void => {
    if (maxLength && e.target.value.length > maxLength) {
      e.target.value = e.target.value.substring(0, maxLength);
    }

    handleChange(e);
  };

  const shrinkProps = shrink ? { shrink: true } : {};

  const val = typeof value !== "undefined" ? value : (values[name] || "");
  return (
    <FormControl
      fullWidth
      error={hasErr}
      // @ts-ignore
      sx={{ ...theme.typography.customTextarea }}
    >
      <TextField
        error={hasErr}
        placeholder={placeholder}
        id={inputID}
        variant="outlined"
        type="text"
        multiline
        minRows={4}
        value={val}
        name={name}
        label={title}
        onBlur={handleBlur}
        onChange={onChange}
        color={"secondary"}
        InputLabelProps={shrinkProps}
        {...otherTextAreaProps}
      />

      {canUseMarkdown && (
        <FormHelperText disabled>
          {t("Можно использовать Markdown разметку")}
        </FormHelperText>
      )}

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

export default CustomTextarea;