import { FormControl, FormHelperText, InputLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { enUS, ruRU } from "@mui/x-date-pickers/locales";
// @ts-ignore
import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/ru";
import { FormikErrors, FormikValues } from "formik/dist/types";
// @ts-ignore
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { MinDate } from "../../../store/constant";
import { preventOnSubmit } from "../../../store/reducers/func/input/prevent-submit";
import { RootState } from "../../../store/store";
import { ELanguages } from "../../../utils/enums/user";
import { IUserInterface } from "../../../utils/interfaces/user";

interface ICustomDateInput {
  label: string;
  name: string;
  sx?: object;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<FormikValues>>;
  values: FormikValues;
  // YYYY-MM-DD
  maxDateFormat?: string;
  // YYYY-MM-DD
  minDateFormat?: string;
  errors: FormikErrors<FormikValues>;

  [key: string]: any;
}

const CustomDateInput = ({
                           label,
                           name,
                           values,
                           setFieldValue,
                           maxDateFormat,
                           minDateFormat,
                           errors,
                           sx
                         }: ICustomDateInput) => {
  const user: IUserInterface = useSelector((s: RootState) => s.userInfo.user);
  const hasErr = Boolean(errors[name]);
  const theme = useTheme();
  const ref = useRef(null);
  const placeholders = {
    [ELanguages.RU]: ruRU,
    [ELanguages.EN]: enUS
  };

  const id = `${name}-custom-date-input`;

  return (
    <FormControl
      fullWidth
      sx={{
        // @ts-ignore
        ...theme.typography.customInput,
        "& .MuiInputBase-input": {
          marginTop: "15px",
          paddingBottom: "11px"
        },
        "& .MuiInputLabel-shrink": {
          marginTop: "5px"
        },
        ...(sx ? sx : {})
      }}
      error={hasErr}
    >
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={user.locale.toString()}
      >
        <InputLabel shrink color="secondary" htmlFor={id}>
          {label}
        </InputLabel>
        <DatePicker
          ref={ref}
          value={values[name] || null}
          onChange={newValue => setFieldValue(name, newValue)}
          disableFuture
          maxDate={dayjs(maxDateFormat || null)}
          minDate={dayjs(minDateFormat || MinDate)}
          localeText={placeholders[user.locale].components.MuiLocalizationProvider.defaultProps.localeText}
          slotProps={{
            textField: {
              id: id,
              name: name,
              type: "text",
              color: "secondary",
              className: "CustomDatePicker",
              onKeyDown: preventOnSubmit(true),
              sx: { my: 1 }
            },
            day: {
              sx: {
                "&.MuiPickersDay-root.Mui-selected": {
                  backgroundColor: "secondary.main"
                },
                ":hover": {
                  color: "#fff",
                  backgroundColor: "secondary.main",
                  borderColor: "secondary.main"
                },
                ":not(.Mui-selected)": {
                  borderColor: "secondary.main"
                }
              }
            }
          }}
        />
      </LocalizationProvider>

      {hasErr && (
        <FormHelperText error>
          {errors[name]}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomDateInput;