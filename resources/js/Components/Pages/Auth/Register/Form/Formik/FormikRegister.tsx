import { ButtonGroup, Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Formik } from "formik";
import { FormikHelpers, FormikValues } from "formik/dist/types";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { ERoles } from "../../../../../../utils/enums/user";
import Btn from "../../../../../Common/Gui/Btn/Btn";
import Icon from "../../../../../Common/Gui/Common/Icon";
import EmailInput from "../../../../../Common/Inputs/EmailInput";
import PasswordsList, { isPassEqual } from "../../../../../Common/Inputs/PasswordsList";
import SubmitBtn from "../../../Common/SubmitBtn";
import { isDisabledBtn } from "../../../Login/Form/Formik/FormikLogin";
import InputsBlockList from "../InputsBlockList";
import PolicyGrid from "../PolicyGrid";

interface FormikRegisterProps {
  chosenRole: ERoles;
  setChosenRole: (r: ERoles) => void;
  onSubmit: (v: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => void | Promise<any>;
  formFields: object;
  formValidationSchema: object;
}

const FormikRegister = ({
                          chosenRole,
                          setChosenRole,
                          onSubmit,
                          formFields,
                          formValidationSchema
                        }: FormikRegisterProps) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const spacing = matchDownSM ? 0 : 2;
  const { t } = useLaravelReactI18n();

  const isAdminRole = chosenRole === ERoles.ADMIN;

  const titleBtnUser = t("Пользователь");
  const titleBtnAdmin = t("Администратор");

  return (
    <Formik
      initialValues={formFields}
      validationSchema={formValidationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, setFieldValue, touched, handleBlur, handleChange, handleSubmit, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={spacing}>
            {/*@ts-ignore*/}
            <InputsBlockList
              values={values}
              handleBlur={handleBlur}
              handleChange={handleChange}
              errors={errors}
            />
          </Grid>

          <EmailInput
            values={values}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errors={errors}
          />

          <PasswordsList
            values={values}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errors={errors}
          />

          <Grid item xs={12} sx={{ my: 1 }}>
            <Typography variant="caption">
              {t("Ваша роль")}
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ mb: 4 }}>
            <Grid container justifyContent="center" alignItems="center">
              <ButtonGroup
                variant="contained"
                color="secondary"
                sx={{ boxShadow: "none" }}
              >
                <Btn
                  onClick={e => {
                    setChosenRole(ERoles.USER);
                    setFieldValue("role", ERoles.USER);
                  }}
                  variant={isAdminRole ? "outlined" : "contained"}
                  webTitle={titleBtnUser}
                  mobTitle={titleBtnUser}
                  icon={<Icon tablerIcon="IconUser"/>}
                  sx={isAdminRole ? { color: "secondary.200" } : {}}
                />

                <Btn
                  sx={isAdminRole ? {} : { color: "secondary.200" }}
                  onClick={e => {
                    setChosenRole(ERoles.ADMIN);
                    setFieldValue("role", ERoles.ADMIN);
                  }}
                  variant={isAdminRole ? "contained" : "outlined"}
                  webTitle={titleBtnAdmin}
                  mobTitle={titleBtnAdmin}
                  endIcon={<Icon tablerIcon="IconUsersGroup"/>}
                />
              </ButtonGroup>
            </Grid>
          </Grid>

          <PolicyGrid/>

          <SubmitBtn
            disabled={isDisabledBtn(errors, touched) || !isPassEqual(values)}
            isRegister
          />
        </form>
      )}
    </Formik>
  );
};

export default FormikRegister;