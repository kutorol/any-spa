import TabPanel from "@mui/lab/TabPanel";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Formik } from "formik";
import { FormikErrors, FormikHelpers, FormikValues } from "formik/dist/types";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { cloneDeep } from "lodash";
import * as React from "react";
import { inputRules } from "../../../../../utils/funcs/form-rule/default-rule";
import PasswordsList from "../../../../Common/Inputs/PasswordsList";
import MainCard from "../../../../Common/MainCard/MainCard";
import SaveBtnRow from "./UserInfo/SaveBtnRow";

interface IPasswordPanel {
  value: string;
  onSubmit: (v: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => (void | Promise<any>);
}

const PasswordPanel = ({ value, onSubmit }: IPasswordPanel) => {
  const theme = useTheme();

  const { t } = useLaravelReactI18n();
  // @ts-ignore
  const { formFields, formValidationSchema } = inputRules.prepareRulesFormik({
    password: inputRules.passDefaultRule(),
    password_confirmation: inputRules.passDefaultRule(t("Повторный пароль обязателен")),
    submit: { val: null }
  });

  const getErrorsForBtn = (values: FormikValues, errors: FormikErrors<FormikValues>): FormikErrors<FormikValues> => {
    errors = cloneDeep(errors);
    const passConfirm: string = values.password_confirmation || "";
    const pass: string = values.password || "";

    if (pass.length > 0 && passConfirm.length > 0 && passConfirm !== pass) {
      errors["pass_equal"] = "error";
    } else if (pass.length === 0 || passConfirm.length === 0) {
      errors["pass_empty"] = "error";
    } else {
      delete errors["pass_equal"];
      delete errors["pass_empty"];
    }

    return errors;
  };

  return (
    <TabPanel value={value} sx={{ "&": { p: 0, py: 2 } }}>
      <Grid
        container
        sx={{ m: 0, p: 3, pt: 2, color: "#fff" }}
        spacing={0}
      >
        <Grid item xs={12}>
          {/* @ts-ignore */}
          <MainCard
            boxShadow
            // @ts-ignore
            shadow={theme.shadows[50]}
            sx={{ "& > .MuiCardContent-root": { p: 2 } }}
          >
            <Formik
              initialValues={formFields}
              validationSchema={formValidationSchema}
              onSubmit={onSubmit}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <SaveBtnRow errors={getErrorsForBtn(values, errors)}/>

                  <PasswordsList
                    values={values}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    errors={errors}
                  />
                </form>
              )}
            </Formik>
          </MainCard>
        </Grid>
      </Grid>
    </TabPanel>
  );
};

export default PasswordPanel;