import { Divider, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// @ts-ignore
import dayjs from "dayjs";
import { Formik } from "formik";
import { FormikErrors, FormikHelpers, FormikValues } from "formik/dist/types";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { cloneDeep } from "lodash";
// @ts-ignore
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { RootState } from "../../../../../../store/store";
import { ESex } from "../../../../../../utils/enums/user";
import checker from "../../../../../../utils/funcs/form-rule/checker";
import { inputRules } from "../../../../../../utils/funcs/form-rule/default-rule";
import { IVariantSelectObject } from "../../../../../../utils/interfaces/select";
import { IUserInterface } from "../../../../../../utils/interfaces/user";
import BackBtn from "../../../../../Common/Gui/Btn/BackBtn";
import CustomDateInput from "../../../../../Common/Inputs/CustomDateInput";
import CustomInput from "../../../../../Common/Inputs/CustomInput";
import EmailInput from "../../../../../Common/Inputs/EmailInput";
import PhoneInput from "../../../../../Common/Inputs/PhoneInput";
import SelectFormik from "../../../../../Common/Inputs/SelectFormik";
import SaveBtnRow from "./SaveBtnRow";

interface IEditInfo {
  userPhone: number | "";
  setUserPhone: (v: number | "") => void;
  onSubmit: (v: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => (void | Promise<any>);
  onCloseEdit: (e: React.SyntheticEvent) => void;
}

interface ISelectInputs {
  [key: string]: {
    title: string;
    variants: IVariantSelectObject[] | { [k in any]: string; }
  };
}

const EditInfo = ({ userPhone, setUserPhone, onCloseEdit, onSubmit }: IEditInfo) => {
  const { t } = useLaravelReactI18n();
  const theme = useTheme();
  const refForm = useRef();
  const user: IUserInterface = useSelector((s: RootState) => s.userInfo.user);

  const [isValidUserPhone, setIsValidUserPhone] = useState<boolean>(user.phone ? checker.checkPhone(user.phone.toString()) : true);

  const onChangePhone = (isValid: boolean, value: number): void => {
    setIsValidUserPhone(value > 0 ? isValid : true);
    setUserPhone(value > 0 ? value : "");
  };

  useEffect(() => {
    if (refForm.current) {
      // @ts-ignore
      refForm.current.validateForm();
    }
  }, []);

  const gmtVariants: IVariantSelectObject[] = [];
  for (let i: number = -11; i < 15; i++) {
    gmtVariants.push({
      // formik не воспринимает 0, поэтому поле будет не заполнено если передать number
      key: i.toString(),
      label: `GTM ${i >= 0 ? "+" : ""}${i}`
    });
  }

  const { formFields, formValidationSchema } = inputRules.prepareRulesFormik({
    first_name: {
      ...inputRules.commentDefaultRule(t("Имя обязательно"), 255, 2),
      val: user.first_name
    },
    last_name: {
      ...inputRules.commentDefaultRule(t("Фамилия обязательна"), 255, 2),
      val: user.last_name
    },
    sur_name: {
      // @ts-ignore
      rule: Yup.string().trim().maxLen(255).min(0),
      val: user.surname
    },
    email: {
      ...inputRules.emailDefaultRule(),
      val: user.email
    },
    sex: {
      rule: Yup.string().required().oneOf([ESex.MALE, ESex.FEMALE], t("Пол может быть выбран только из доступных вариантов: мужской или женский пол")),
      val: user.sex
    },
    is_am_pm: {
      rule: Yup.number().required().oneOf([12, 24], t("Часовой формат может быть выбран только из доступных вариантов: 12 или 24 часа")),
      val: user.is_am_pm ? 12 : 24
    },
    gmt: {
      rule: Yup.string().required().oneOf(gmtVariants.map(v => v.key), t("Часовой пояс может быть выбран только из доступных вариантов: от -11 до +14 GMT")),
      val: user.gmt.toString()
    },
    birthday: {
      ...inputRules.dateDefaultRule(),
      val: user.birthday ? dayjs(user.birthday) : null
    },
    city: {
      ...inputRules.commentDefaultRule(t("Город обязателен"), 255, 2),
      val: user.city || null
    },
    submit: { val: null }
  });

  const fioInputs = {
    first_name: `${t("Имя")} *`,
    last_name: `${t("Фамилия")} *`,
    sur_name: t("Отчество"),
    city: `${t("Город")} *`
  };

  const selectInputs: ISelectInputs = {
    is_am_pm: {
      title: `${t("Часовой формат")} *`,
      variants: {
        12: t(`12 часов`),
        24: t(`24 часа`)
      }
    },
    sex: {
      title: `${t("Пол")} *`,
      variants: {
        [ESex.MALE]: t("Мужчина"),
        [ESex.FEMALE]: t("Женщина")
      }
    },
    gmt: {
      title: `${t("Часовой пояс")} *`,
      variants: gmtVariants
    }
  };

  const getErrorsForBtn = (errors: FormikErrors<FormikValues>): FormikErrors<FormikValues> => {
    errors = cloneDeep(errors);
    if (isValidUserPhone) {
      delete errors["custom_phone"];
    } else {
      errors["custom_phone"] = "error";
    }

    return errors;
  };

  return (
    <Formik
      initialValues={formFields}
      validationSchema={formValidationSchema}
      onSubmit={onSubmit}
      innerRef={refForm}
    >
      {({ setFieldValue, errors, handleChange, handleSubmit, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid item xs={12} sx={{ mb: 3 }}>
            <BackBtn
              defaultBackUrl="/settings/1"
              onAction={onCloseEdit}
              variant="outlined"
            />
          </Grid>

          <SaveBtnRow
            withTitle
            errors={getErrorsForBtn(errors)}
          />

          <Divider sx={{ my: 1 }}/>

          <Grid container>
            <Grid item xs={12}>
              <EmailInput
                values={values}
                handleChange={handleChange}
                errors={errors}
                noSubmit
                isRequired
                autoFocus
              />
            </Grid>

            <Grid item xs={12}><Divider sx={{ my: 1 }}/></Grid>

            {Object.keys(fioInputs).map(k => (
              <React.Fragment key={k}>
                <Grid item xs={12}>
                  <CustomInput
                    type="text"
                    name={k}
                    title={fioInputs[k]}
                    theme={theme}
                    values={values}
                    handleChange={handleChange}
                    errors={errors}
                    noSubmit
                  />
                </Grid>

                <Grid item xs={12}><Divider sx={{ my: 1 }}/></Grid>
              </React.Fragment>
            ))}

            <Grid item xs={12}>
              <PhoneInput
                value={userPhone}
                onChange={onChangePhone}
                isValid={isValidUserPhone}
                noSubmit
              />
            </Grid>

            <Grid item xs={12}><Divider sx={{ my: 1 }}/></Grid>

            <Grid item xs={12}>
              <CustomDateInput
                label={t("День рождения")}
                name="birthday"
                values={values}
                setFieldValue={setFieldValue}
                errors={errors}
              />
            </Grid>

            <Grid item xs={12}><Divider sx={{ my: 1 }}/></Grid>

            {Object.keys(selectInputs).map((k, i) => (
              <React.Fragment key={k}>
                <Grid item xs={12}>
                  <SelectFormik
                    variants={selectInputs[k].variants}
                    name={k}
                    sx={{ width: "100%", my: 1, mb: 2 }}
                    title={selectInputs[k].title}
                    values={values}
                    handleChange={handleChange}
                    errors={errors}
                  />
                </Grid>

                <Grid item xs={12}><Divider sx={{ my: 1 }}/></Grid>
              </React.Fragment>
            ))}

            <SaveBtnRow errors={getErrorsForBtn(errors)}/>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default EditInfo;