import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
// @ts-ignore
import React, { useMemo } from "react";
import { hashCode } from "../../../../../utils/funcs/hash";
import CustomSelect from "./CustomSelect";

interface ISelectBlock {
  label: string;
  // объект с любыми ключами и стоками значениями или массив строк
  variants: { [key in any]: string } | string[];
  chosenVariant: any;
  onChange: (n: any) => void;
}

const SelectBlock = ({ label, variants, onChange, chosenVariant }: ISelectBlock) => {
  let tail = "";
  if (Array.isArray(variants)) {
    tail = variants.join("");
  } else {
    tail = Object.keys(variants).map(k => variants[ k ]).join("");
  }
  const labelId = useMemo(() => `id-${hashCode(`${label}-${tail}`)}`, []);

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id={labelId}>
        {label}
      </InputLabel>

      <CustomSelect
        variants={variants}
        label={label}
        onChange={onChange}
        labelId={labelId}
        chosenVariant={chosenVariant}
      />
    </FormControl>
  );
};

export default SelectBlock;