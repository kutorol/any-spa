import { Formik } from "formik";
import { FormikHelpers, FormikValues } from "formik/dist/types";
// @ts-ignore
import React from "react";
import EmailInput from "../../../../../Common/Inputs/EmailInput";
import SubmitBtn from "../../../Common/SubmitBtn";

interface FormikPassResetProps {
  onSubmit: (v: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => void | Promise<any>
  formFields: object
  formValidationSchema: object
}

const FormikPassReset = ({ onSubmit, formFields, formValidationSchema }: FormikPassResetProps) => {
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
          />

          <SubmitBtn
            isSubmitting={isSubmitting}
            isPasswordReset
          />
        </form>
      )}
    </Formik>
  );
};

export default FormikPassReset;