import * as React from "react";
import useGoogleRecaptcha from "../../../../../hooks/useGoogleRecaptcha";
import { inputRules } from "../../../../../utils/funcs/form-rule/default-rule";
import userAuth from "../../../../../utils/repository/user-auth";
import FormikLogin from "./Formik/FormikLogin";

const FormInputs = () => {
  // @ts-ignore
  const { formFields, formValidationSchema } = inputRules.prepareRulesFormik({
    email: inputRules.emailDefaultRule(),
    password: inputRules.passDefaultRule(),
    submit: { val: null }
  });

  const { onSubmit } = useGoogleRecaptcha({
    fromAction: "login",
    actionOnSubmit: (captchaToken, formValues) => {
      return userAuth.login(formValues, captchaToken);
    }
  });

  return (
    <FormikLogin
      onSubmit={onSubmit}
      formFields={formFields}
      formValidationSchema={formValidationSchema}
    />
  );
};

export default FormInputs;