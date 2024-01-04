import { FormControl, FormHelperText, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { FormikErrors, FormikValues } from "formik/dist/types";
// @ts-ignore
import React, { useMemo } from "react";
import { IVariantSelectObject } from "../../../utils/interfaces/select";

interface ISelectFormik {
  name: string;
  title: string;
  // объект с любыми ключами и стоками значениями или массив строк
  variants: { [key in any]: string } | string[] | IVariantSelectObject[];
  handleBlur?: (e: React.FocusEvent<any>) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
  values: FormikValues;
  errors: FormikErrors<FormikValues>;

  [key: string]: any;
}

const SelectFormik = ({
                        name,
                        title,
                        variants,

                        errors,
                        values,
                        handleBlur = e => {
                        },
                        handleChange,
                        sx,
                        ...otherInputProps
                      }: ISelectFormik) => {
  const hasErr = Boolean(errors[name]);

  let items = null;
  if (Array.isArray(variants)) {
    items = variants.map((v: string | IVariantSelectObject, i: number) => (
      typeof v === "string"
        ? <MenuItem key={i} value={i}>{v}</MenuItem>
        : <MenuItem key={i} value={v.key}>{v.label}</MenuItem>
    ));
  } else {
    items = Object.keys(variants).map((k: any, i: number) => (
      <MenuItem key={i} value={k}>{variants[k]}</MenuItem>
    ));
  }

  return (
    <FormControl
      fullWidth
      error={hasErr}
      sx={sx ? sx : {}}
    >
      <TextField
        select
        value={values[name]}
        name={name}
        label={title}
        onBlur={handleBlur}
        onChange={handleChange}
        color="secondary"
        sx={{
          "& .MuiInputBase-root": { minHeight: 62 }
        }}
        {...otherInputProps}
      >
        {items}
      </TextField>

      {hasErr && (
        <FormHelperText error>
          {errors[name]}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectFormik;