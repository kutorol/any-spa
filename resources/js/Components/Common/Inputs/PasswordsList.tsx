import { Grid } from "@mui/material";
import { FormikErrors, FormikValues } from "formik/dist/types";
import * as React from "react";
import useMatch from "../../../hooks/useMatch";
import PassInput from "./PassInput";

interface IPasswordsList {
  handleBlur?: (e: React.FocusEvent<any>) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
  values: FormikValues;
  errors: FormikErrors<FormikValues>;
}

export const isPassEqual = (values: FormikValues): boolean => {
  return values.password_confirmation === values.password;
};

const PasswordsList = ({ values, handleBlur, handleChange, errors }: IPasswordsList) => {
  const { matchDownMd } = useMatch();

  const withCheckingConfirmation = values.password.length > 0 && values.password_confirmation.length > 0;

  return (
    <Grid container spacing={matchDownMd ? 0 : 2}>
      <Grid item xs={12} sm={6}>
        <PassInput
          withStrength
          values={values}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errors={errors}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <PassInput
          isConfirmPass
          withCheckingConfirmation={withCheckingConfirmation}
          passwordsEqual={isPassEqual(values)}
          values={values}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errors={errors}
        />
      </Grid>
    </Grid>
  );
};

export default PasswordsList;