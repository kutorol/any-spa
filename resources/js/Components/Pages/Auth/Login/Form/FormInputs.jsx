import React from 'react'
import EmailInput from "../../../../Common/Inputs/EmailInput";
import { get } from "lodash";
import SubmitBtn from "../../Common/SubmitBtn";
import { Formik } from "formik";
import { inputRules } from "../../../../../utils/funcs/form-rule/default-rule";
import { useTheme } from "@mui/material/styles";
import r from "../../../../../utils/ajax";
import PassInput from "../../../../Common/Inputs/PassInput";
import useGoogleRecaptcha from "../../../../../hooks/useGoogleRecaptcha";

const FormInputs = () => {
  const theme = useTheme();

  const { formFields, formValidationSchema } = inputRules.prepareRulesFormik({
    email: inputRules.emailDefaultRule(),
    password: inputRules.passDefaultRule(),
    submit: { val: null },
  });

  const { onSubmit } = useGoogleRecaptcha({
    fromAction: "login",
    actionOnSubmit: (captchaToken, formValues) => {
      return r.post('/api/login', {
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