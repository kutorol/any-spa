import React from 'react'
import r from "../../../../../utils/ajax";
import { get } from "lodash";
import { Formik } from "formik";
import SubmitBtn from "../../Common/SubmitBtn";
import PasswordsList from "../../../../Common/Inputs/PasswordsList";
import { useParams } from "react-router";
import { inputRules } from "../../../../../utils/funcs/form-rule/default-rule";
import useGoogleRecaptcha from "../../../../../hooks/useGoogleRecaptcha";
import { useLaravelReactI18n } from "laravel-react-i18n";

const FormInputsConfirm = () => {
  const params = useParams();
  const { t } = useLaravelReactI18n();
  const { formFields, formValidationSchema } = inputRules.prepareRulesFormik({
    password: inputRules.passDefaultRule(),
    password_confirmation: inputRules.passDefaultRule(t("Повторный пароль обязателен")),
    submit: { val: null },
  });

  const { onSubmit } = useGoogleRecaptcha({
    fromAction: "forgotPassConfirm",
    actionOnSubmit: (captchaToken, formValues) => {
      return r.post(`/api/pass/reset/${params.token}`, {
        email: params.email,
        url_token: params.token,
        password: captchaToken.password,
        password_confirmation: captchaToken.password_confirmation,
        "g-recaptcha-token": formValues
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
          <PasswordsList
            values={values}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
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

export default FormInputsConfirm;