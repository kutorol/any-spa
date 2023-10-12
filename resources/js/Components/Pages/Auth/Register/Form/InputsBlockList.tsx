import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FormikErrors, FormikTouched, FormikValues } from "formik/dist/types";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React from "react";
import CustomInput from "../../../../Common/Inputs/CustomInput";

interface InputsBlockListProps {
  handleBlur: (e: React.FocusEvent<any>) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
  values: FormikValues;
  touched: FormikTouched<FormikValues>;
  errors: FormikErrors<FormikValues>;
}

const InputsBlockList = ({ values, handleBlur, handleChange, touched, errors }: InputsBlockListProps) => {
  const { t } = useLaravelReactI18n();
  const blockInputNames = [
    { name: "first_name", title: t("Имя") },
    { name: "last_name", title: t("Фамилия") },
    { name: "sur_name", title: t("Отчество") }
  ];

  const sm = Math.abs(12 / blockInputNames.length);
  const xs = 12;
  const theme = useTheme();

  return blockInputNames.map(input => (
    <Grid
      key={input.name}
      item
      xs={xs}
      sm={sm}
    >
      <CustomInput
        title={input.title}
        name={input.name}
        values={values}
        handleBlur={handleBlur}
        handleChange={handleChange}
        touched={touched}
        errors={errors}
        theme={theme}
      />
    </Grid>
  ));
};

export default InputsBlockList;