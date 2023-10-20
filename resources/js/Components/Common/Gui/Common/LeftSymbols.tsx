import { FormHelperText } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React from "react";

interface ILeftSymbols {
  value?: string;
  maxLength: number;
}

const LeftSymbols = ({ value, maxLength }: ILeftSymbols) => {
  const { tChoice } = useLaravelReactI18n();

  const symbolLeft = maxLength - (value || "").length;

  return (
    <FormHelperText disabled>
      {tChoice("Остался|Осталось|Осталось", symbolLeft)} {symbolLeft} {tChoice("символ|символа|символов", symbolLeft)}
    </FormHelperText>
  );
};

export default LeftSymbols;