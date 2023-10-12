import { Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Formik } from "formik";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { get } from "lodash";
// @ts-ignore
import React from "react";
import * as Yup from "yup";
import useGoogleRecaptcha from "../../../../../hooks/useGoogleRecaptcha";
import r from "../../../../../utils/ajax";
import { inputRules } from "../../../../../utils/funcs/form-rule/default-rule";
import EmailInput from "../../../../Common/Inputs/EmailInput";
import PasswordsList from "../../../../Common/Inputs/PasswordsList";
import SubmitBtn from "../../Common/SubmitBtn";
import InputsBlockList from "./InputsBlockList";
import PolicyGrid from "./PolicyGrid";

const FormInputs = () => {
  const theme = useTheme();
  const { t } = useLaravelReactI18n();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const spacing = matchDownSM ? 0 : 2;

  // @ts-ignore
  const { formFields, formValidationSchema } = inputRules.prepareRulesFormik({
    email: inputRules.emailDefaultRule(),
    password: inputRules.passDefaultRule(),
    password_confirmation: inputRules.passDefaultRule(t("Повторный пароль обязателен")),
    submit: { val: null },
    // @ts-ignore
    first_name: { rule: Yup.string().trim().maxLen(255).required(t("Имя обязательно")) },
    // @ts-ignore
    sur_name: { rule: Yup.string().trim().maxLen(255).required(t("Отчество обязательно")) },
    // @ts-ignore
    last_name: { rule: Yup.string().trim().maxLen(255).required(t("Фамилия обязательна")) }
  });

  const { onSubmit } = useGoogleRecaptcha({
    fromAction: "register",
    actionOnSubmit: (captchaToken, formValues) => {
      return r.post("/api/register", {
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
            {/*@ts-ignore*/}
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