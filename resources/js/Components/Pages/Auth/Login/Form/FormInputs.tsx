import { useTheme } from "@mui/material/styles";
import { Formik } from "formik";
import { get } from "lodash";
// @ts-ignore
import React from "react";
import useGoogleRecaptcha from "../../../../../hooks/useGoogleRecaptcha";
import r from "../../../../../utils/ajax";
import { inputRules } from "../../../../../utils/funcs/form-rule/default-rule";
import EmailInput from "../../../../Common/Inputs/EmailInput";
import PassInput from "../../../../Common/Inputs/PassInput";
import SubmitBtn from "../../Common/SubmitBtn";

const FormInputs = () => {
  const theme = useTheme();

  // @ts-ignore
  const { formFields, formValidationSchema } = inputRules.prepareRulesFormik({
    email: inputRules.emailDefaultRule(),
    password: inputRules.passDefaultRule(),
    submit: { val: null }
  });

  const { onSubmit } = useGoogleRecaptcha({
    fromAction: "login",
    actionOnSubmit: (captchaToken, formValues) => {
      return r.post("/api/login", {
        email: formValues.email,
        password: formValues.password,
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
          <EmailInput
            values={values}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
            theme={theme}
          />

          <PassInput
            values={values}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
            theme={theme}
          />

          <SubmitBtn
            isSubmitting={isSubmitting}
            isRegister={false}
          />
        </form>
      )}
    </Formik>
  );
};

export default FormInputs;