import * as React from "react";
import useGoogleRecaptcha from "../../../../../hooks/useGoogleRecaptcha";
import { inputRules } from "../../../../../utils/funcs/form-rule/default-rule";
import userAuth from "../../../../../utils/repository/user-auth";
import FormikPassReset from "./Formik/FormikPassReset";

const FormInputs = () => {
  // @ts-ignore
  const { formFields, formValidationSchema } = inputRules.prepareRulesFormik({
    email: inputRules.emailDefaultRule(),
    submit: { val: null }
  });

  const { onSubmit } = useGoogleRecaptcha({
    fromAction: "forgotPass",
    actionOnSubmit: (captchaToken, formValues) => {
      return userAuth.sendPassForgotEmail(formValues.email, captchaToken);
    }
  });

  return (
    <FormikPassReset
      onSubmit={onSubmit}
      formFields={formFields}
      formValidationSchema={formValidationSchema}
    />
  );
};

export default FormInputs;