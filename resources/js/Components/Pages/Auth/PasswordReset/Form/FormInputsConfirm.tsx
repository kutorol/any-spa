import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React from "react";
import { useParams } from "react-router";
import useGoogleRecaptcha from "../../../../../hooks/useGoogleRecaptcha";
import { inputRules } from "../../../../../utils/funcs/form-rule/default-rule";
import userAuth from "../../../../../utils/repository/user-auth";
import FormikPassResetConfirm from "./Formik/FormikPassResetConfirm";

const FormInputsConfirm = () => {
  const params = useParams();
  const { t } = useLaravelReactI18n();
  // @ts-ignore
  const { formFields, formValidationSchema } = inputRules.prepareRulesFormik({
    password: inputRules.passDefaultRule(),
    password_confirmation: inputRules.passDefaultRule(t("Повторный пароль обязателен")),
    submit: { val: null }
  });

  const { onSubmit } = useGoogleRecaptcha({
    fromAction: "forgotPassConfirm",
    actionOnSubmit: (captchaToken, formValues) => {
      return userAuth.resetPassForgot({ ...params, ...formValues }, captchaToken);
    }
  });

  return (
    <FormikPassResetConfirm
      onSubmit={onSubmit}
      formFields={formFields}
      formValidationSchema={formValidationSchema}
    />
  );
};

export default FormInputsConfirm;