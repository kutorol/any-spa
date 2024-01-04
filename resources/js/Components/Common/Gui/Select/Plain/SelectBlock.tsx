import { FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { FormikErrors, FormikValues } from "formik/dist/types";
// @ts-ignore
import React, { useMemo } from "react";
import { hashCode } from "../../../../../utils/funcs/hash";
import CustomSelect from "./CustomSelect";

interface ISelectBlock {
  label: string;
  name: string;
  // объект с любыми ключами и стоками значениями или массив строк
  variants: { [key in any]: string } | string[];
  chosenVariant?: any;
  onChange?: (e: React.ChangeEvent<{ value: unknown }>) => void;
  sx?: object;
  handleBlur?: (e: React.FocusEvent<any>) => void;
  handleChange?: (e: React.ChangeEvent<any>) => void;
  values?: FormikValues;
  errors?: FormikErrors<FormikValues>;

  [key: string]: any;
}

const SelectBlock = ({
                       label, variants, onChange, chosenVariant, sx,
                       name,
                       errors,
                       values,
                       handleBlur,
                       handleChange,
                       ...props
                     }: ISelectBlock) => {
  let tail = "";
  if (Array.isArray(variants)) {
    tail = variants.join("");
  } else {
    tail = Object.keys(variants).map(k => variants[k]).join("");
  }
  const labelId = useMemo(() => `id-${hashCode(`${label}-${tail}`)}`, []);

  const isFormik = typeof handleChange === "function";

  const hasErr = isFormik ? Boolean(errors[name]) : false;

  const _onChange = isFormik ? handleChange : onChange;
  const val = isFormik ? values[name] : chosenVariant;

  return (
    <FormControl
      error={hasErr}
      sx={sx ? sx : { m: 1, minWidth: 120 }}
    >
      <InputLabel color="secondary" id={labelId}>
        {label}
      </InputLabel>

      <CustomSelect
        variants={variants}
        label={label}
        onChange={_onChange}
        onBlur={handleBlur}
        labelId={labelId}
        chosenVariant={val}
        {...props}
      />

      {hasErr && (
        <FormHelperText error>
          {errors[name]}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectBlock;