import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React from "react";
import * as Yup from "yup";
import useGoogleRecaptcha from "../../../../../hooks/useGoogleRecaptcha";
import { inputRules } from "../../../../../utils/funcs/form-rule/default-rule";
import userAuth from "../../../../../utils/repository/user-auth";
import FormikRegister from "./Formik/FormikRegister";

const FormInputs = () => {
  const { t } = useLaravelReactI18n();

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
      return userAuth.register(formValues, captchaToken);
    }
  });

  return (
    <FormikRegister
      onSubmit={onSubmit}
      formFields={formFields}
      formValidationSchema={formValidationSchema}
    />
  );
};

export default FormInputs;