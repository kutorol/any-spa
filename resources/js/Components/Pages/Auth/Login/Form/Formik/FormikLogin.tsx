import { Formik } from "formik";
import { FormikHelpers, FormikValues } from "formik/dist/types";
// @ts-ignore
import React from "react";
import EmailInput from "../../../../../Common/Inputs/EmailInput";
import PassInput from "../../../../../Common/Inputs/PassInput";
import SubmitBtn from "../../../Common/SubmitBtn";

interface FormikLoginProps {
  onSubmit: (v: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => void | Promise<any>;
  formFields: object;
  formValidationSchema: object;
}

const FormikLogin = ({ onSubmit, formFields, formValidationSchema }: FormikLoginProps) => {
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

          <PassInput
            values={values}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
          />

          <SubmitBtn isSubmitting={isSubmitting}/>
        </form>
      )}
    </Formik>
  );
};

export default FormikLogin;