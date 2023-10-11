import React from 'react'
import { Grid, useMediaQuery } from "@mui/material";
import InputsBlockList from "./InputsBlockList";
import EmailInput from "../../../../Common/Inputs/EmailInput";
import { get } from "lodash";
import PasswordsList from "../../../../Common/Inputs/PasswordsList";
import PolicyGrid from "./PolicyGrid";
import SubmitBtn from "../../Common/SubmitBtn";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTheme } from "@mui/material/styles";
import r from "../../../../../utils/ajax";
import { inputRules } from "../../../../../utils/funcs/form-rule/default-rule";
import useGoogleRecaptcha from "../../../../../hooks/useGoogleRecaptcha";
import { useLaravelReactI18n } from "laravel-react-i18n";

const FormInputs = () => {
  const theme = useTheme();
  const { t } = useLaravelReactI18n();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const spacing = matchDownSM ? 0 : 2;

  const { formFields, formValidationSchema } = inputRules.prepareRulesFormik({
    email: inputRules.emailDefaultRule(),
    password: inputRules.passDefaultRule(),
    password_confirmation: inputRules.passDefaultRule(t("Повторный пароль обязателен")),
    submit: { val: null },
    first_name: { rule: Yup.string().trim().maxLen(255).required(t("Имя обязательно")) },
    sur_name: { rule: Yup.string().trim().maxLen(255).required(t("Отчество обязательно")) },
    last_name: { rule: Yup.string().trim().maxLen(255).required(t("Фамилия обязательна")) }
  });

  const { onSubmit } = useGoogleRecaptcha({
    fromAction: "register",
    actionOnSubmit: (captchaToken, formValues) => {
      return r.post('/api/register', {
        name: `${formValues.last_name} ${formValues.first_name} ${formValues.sur_name}`,
        email: formValues.email,
        password: formValues.password,
        password_confirmation: formValues.password_confirmation,
        "g-recaptcha-token": captchaToken
      }).then(res => get(res, "status", false));
    }
  });

  return (
    <Formik
      initialValues={formFields}
      validationSchema={formValidationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={spacing}>
            <InputsBlockList
              values={values}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
            />
          </Grid>

          <EmailInput
            values={values}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
            theme={theme}
          />

          <PasswordsList
            values={values}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
          />

          <PolicyGrid/>

          <SubmitBtn isSubmitting={isSubmitting}/>
        </form>
      )}
    </Formik>
  );
};

export default FormInputs;