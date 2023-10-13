import { Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// @ts-ignore
import React from "react";
import PassInput from "./PassInput";

const PasswordsList = ({ values, handleBlur, handleChange, touched, errors }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const withCheckingConfirmation = values.password.length > 0 && values.password_confirmation.length > 0;
  const passwordsEqual = values.password_confirmation === values.password;

  return (
    <Grid container spacing={matchDownSM ? 0 : 2}>
      <Grid item xs={12} sm={6}>
        <PassInput
          withStrength
          values={values}
          handleBlur={handleBlur}
          handleChange={handleChange}
          touched={touched}
          errors={errors}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <PassInput
          isConfirmPass
          withCheckingConfirmation={withCheckingConfirmation}
          passwordsEqual={passwordsEqual}
          values={values}
          handleBlur={handleBlur}
          handleChange={handleChange}
          touched={touched}
          errors={errors}
        />
      </Grid>
    </Grid>
  );
};

export default PasswordsList;