import { Formik, FormikTouched } from "formik";
import { FormikErrors, FormikHelpers, FormikValues } from "formik/dist/types";
// @ts-ignore
import React, { useEffect, useRef, useState } from "react";
import EmailInput from "../../../../../Common/Inputs/EmailInput";
import PassInput from "../../../../../Common/Inputs/PassInput";
import SubmitBtn from "../../../Common/SubmitBtn";

interface FormikLoginProps {
  onSubmit: (v: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => void | Promise<any>;
  formFields: object;
  formValidationSchema: object;
}

export const isDisabledBtn = (errors: FormikErrors<FormikValues>, touched: FormikTouched<FormikValues>): boolean => {
  return Object.keys(touched).length == 0 || Object.keys(errors).length > 0;
};

const FormikLogin = ({ onSubmit, formFields, formValidationSchema }: FormikLoginProps) => {
  return (
    <Formik
      initialValues={formFields}
      validationSchema={formValidationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, handleBlur, handleChange, touched, handleSubmit, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <EmailInput
            values={values}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errors={errors}
          />

          <PassInput
            values={values}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errors={errors}
          />

          <SubmitBtn
            disabled={isDisabledBtn(errors, touched)}
          />
        </form>
      )}
    </Formik>
  );
};

export default FormikLogin;