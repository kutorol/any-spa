import { FormControl, FormHelperText, InputLabel, OutlinedInput } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { CountryCode } from "libphonenumber-js/min";
import { toNumber } from "lodash";
// @ts-ignore
import React, { forwardRef, SyntheticEvent } from "react";
import ReactPhoneInput, { CountryData } from "react-phone-input-material-ui";
import { preventOnSubmit } from "../../../store/reducers/func/input/prevent-submit";
import checker from "../../../utils/funcs/form-rule/checker";

interface IPhoneInput {
  value: number | string;
  isValid?: boolean;
  noSubmit?: boolean;
  defaultCountry?: "ru" | "by" | string;
  onChange: (
    isValid: boolean,
    value: number,
    formattedValue: string,
    data: CountryData | {},
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;

  [key: string]: any;
};

interface ICustomPhone {
  isValid?: boolean;
  noSubmit?: boolean;
  onChange: (e: React.SyntheticEvent) => void;

  [key: string]: any;
}

const CustomPhone = forwardRef(({ isValid, noSubmit, onChange, ...other }: ICustomPhone, ref) => {
  const theme = useTheme();
  const { t } = useLaravelReactI18n();
  const isErr = !isValid;
  const id = "custom-phone-input";
  const color = isErr ? "error" : "secondary";

  return (
    // @ts-ignore
    <FormControl
      ref={ref}
      fullWidth
      // @ts-ignore
      sx={{ ...theme.typography.customInput }}
      error={isErr}
    >
      <InputLabel shrink color="secondary" htmlFor={id}>
        {t("Номер телефона")}
      </InputLabel>
      <OutlinedInput
        type="text"
        color={color}
        id={id}
        onChange={onChange}
        onKeyDown={preventOnSubmit(noSubmit)}
        {...other}
      />

      {isErr && (
        <FormHelperText error>
          {t("Номер телефона введен не правильно")}
        </FormHelperText>
      )}
    </FormControl>
  );
});

const PhoneInput = ({ value, noSubmit, defaultCountry = "ru", onChange, isValid, ...other }: IPhoneInput) => {
  const _onChange = (
    value: string,
    data: CountryData,
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) => {
    const _isValid = checker.checkPhone(formattedValue, {
      defaultCallingCode: data.dialCode,
      defaultCountry: (data.countryCode || "RU").toUpperCase() as CountryCode
    });

    onChange(_isValid, toNumber(value), formattedValue, data, event);
  };

  return (
    <ReactPhoneInput
      inputProps={{
        isValid: isValid,
        noSubmit: noSubmit,
        ...other
      }}
      value={value.toString()}
      defaultCountry={defaultCountry}
      onChange={_onChange}
      placeholder={"+7 (999) 999-99-99"}
      component={CustomPhone}
    />
  );
};

export default PhoneInput;