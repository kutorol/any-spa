import React from 'react'
import { useTheme } from "@mui/material/styles";
import r from "../../../../../utils/ajax";
import { get } from "lodash";
import { Formik } from "formik";
import EmailInput from "../../../../Common/Inputs/EmailInput";
import SubmitBtn from "../../Common/SubmitBtn";
import { inputRules } from "../../../../../utils/funcs/form-rule/default-rule";
import useGoogleRecaptcha from "../../../../../hooks/useGoogleRecaptcha";

const FormInputs = () => {
  const theme = useTheme();

  const { formFields, formValidationSchema } = inputRules.prepareRulesFormik({
    email: inputRules.emailDefaultRule(),
    submit: { val: null },
  });

  const { onSubmit } = useGoogleRecaptcha({
    fromAction: "forgotPass",
    actionOnSubmit: (captchaToken, formValues) => {
      return r.post('/api/pass/forgot', {
        email: formValues.email,
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

          <SubmitBtn
            isSubmitting={isSubmitting}
            isRegister={false}
            isPasswordReset
          />
        </form>
      )}
    </Formik>
  );
};

export default FormInputs;