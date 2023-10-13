import { Formik } from "formik";
import { FormikHelpers, FormikValues } from "formik/dist/types";
// @ts-ignore
import React from "react";
import PasswordsList from "../../../../../Common/Inputs/PasswordsList";
import SubmitBtn from "../../../Common/SubmitBtn";

interface FormikPassResetConfirmProps {
  onSubmit: (v: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => void | Promise<any>;
  formFields: object;
  formValidationSchema: object;
}

const FormikPassResetConfirm = ({ onSubmit, formFields, formValidationSchema }: FormikPassResetConfirmProps) => {
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
            isPasswordReset
          />
        </form>
      )}
    </Formik>
  );
};

export default FormikPassResetConfirm;