import { Toolbar } from "@mui/material";
import { Formik } from "formik";
import * as React from "react";
import { inputRules } from "../../../../../utils/funcs/form-rule/default-rule";
import EmailInput from "../../../../Common/Inputs/EmailInput";

interface IStep2 {
  email: string;
  onChangeEmail: (email: string) => void;
  onSubmit: () => void;
}

const Step2 = ({ email, onChangeEmail, onSubmit }: IStep2) => {
  const rules = inputRules.emailDefaultRule();
  rules.val = email;

  // @ts-ignore
  const { formFields, formValidationSchema } = inputRules.prepareRulesFormik({
    email: rules
  });

  const onChange = (handleChange: (e: React.ChangeEvent<any>) => void): ((e: React.ChangeEvent<any>) => void) => {
    return (e: React.ChangeEvent<any>): void => {
      handleChange(e);
      onChangeEmail(e.target.value);
    };
  };

  const _onSubmit = e => {
    e && e.preventDefault();
    onSubmit();
  };

  return (
    <Formik
      initialValues={formFields}
      validationSchema={formValidationSchema}
      onSubmit={_onSubmit}
    >
      {({ errors, handleChange, handleSubmit, values }) => (
        <form noValidate onSubmit={_onSubmit}>
          <Toolbar/>
          <EmailInput
            values={values}
            handleBlur={handleSubmit}
            handleChange={onChange(handleChange)}
            errors={errors}
          />
        </form>
      )}
    </Formik>
  );
};

export default Step2;