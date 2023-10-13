import { Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Formik } from "formik";
import { FormikHelpers, FormikValues } from "formik/dist/types";
// @ts-ignore
import React from 'react'
import EmailInput from "../../../../../Common/Inputs/EmailInput";
import PasswordsList from "../../../../../Common/Inputs/PasswordsList";
import SubmitBtn from "../../../Common/SubmitBtn";
import InputsBlockList from "../InputsBlockList";
import PolicyGrid from "../PolicyGrid";

interface FormikRegisterProps {
  onSubmit: (v: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => void | Promise<any>
  formFields: object
  formValidationSchema: object
}

const FormikRegister = ({ onSubmit, formFields, formValidationSchema }: FormikRegisterProps) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const spacing = matchDownSM ? 0 : 2;

  return (
    <Formik
      initialValues={formFields}
      validationSchema={formValidationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={spacing}>
            {/*@ts-ignore*/}
            <InputsBlockList
              values={values}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
            />
          </Grid>

          <EmailInput
            values={values}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
          />

          <PasswordsList
            values={values}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
          />

          <PolicyGrid/>

          <SubmitBtn
            isSubmitting={isSubmitting}
            isRegister
          />
        </form>
      )}
    </Formik>
  );
};

export default FormikRegister;