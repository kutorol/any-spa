import { Formik } from "formik";
import { FormikHelpers, FormikValues } from "formik/dist/types";
import * as React from "react";
import EmailInput from "../../../../../Common/Inputs/EmailInput";
import SubmitBtn from "../../../Common/SubmitBtn";
import { isDisabledBtn } from "../../../Login/Form/Formik/FormikLogin";

interface FormikPassResetProps {
  onSubmit: (v: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => void | Promise<any>;
  formFields: object;
  formValidationSchema: object;
}

const FormikPassReset = ({ onSubmit, formFields, formValidationSchema }: FormikPassResetProps) => {
  return (
    <Formik
      initialValues={formFields}
      validationSchema={formValidationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, handleBlur, handleChange, handleSubmit, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <EmailInput
            values={values}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errors={errors}
          />

          <SubmitBtn
            disabled={isDisabledBtn(errors, touched)}
            isPasswordReset
          />
        </form>
      )}
    </Formik>
  );
};

export default FormikPassReset;