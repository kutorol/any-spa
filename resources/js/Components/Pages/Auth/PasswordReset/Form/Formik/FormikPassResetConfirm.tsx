import { Formik } from "formik";
import { FormikHelpers, FormikValues } from "formik/dist/types";
import * as React from "react";
import PasswordsList, { isPassEqual } from "../../../../../Common/Inputs/PasswordsList";
import SubmitBtn from "../../../Common/SubmitBtn";
import { isDisabledBtn } from "../../../Login/Form/Formik/FormikLogin";

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
      {({ errors, touched, handleBlur, handleChange, handleSubmit, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <PasswordsList
            values={values}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errors={errors}
          />

          <SubmitBtn
            disabled={isDisabledBtn(errors, touched) || !isPassEqual(values)}
            isPasswordReset
          />
        </form>
      )}
    </Formik>
  );
};

export default FormikPassResetConfirm;