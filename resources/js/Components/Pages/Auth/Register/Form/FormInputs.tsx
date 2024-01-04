import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import * as Yup from "yup";
import useGoogleRecaptcha from "../../../../../hooks/useGoogleRecaptcha";
import { ERoles } from "../../../../../utils/enums/user";
import { inputRules } from "../../../../../utils/funcs/form-rule/default-rule";
import userAuth from "../../../../../utils/repository/user-auth";
import FormikRegister from "./Formik/FormikRegister";

interface IFormInputs {
  chosenRole: ERoles;
  setChosenRole: (r: ERoles) => void;
}

const FormInputs = ({ chosenRole, setChosenRole }: IFormInputs) => {
  const { t } = useLaravelReactI18n();

  // @ts-ignore
  const { formFields, formValidationSchema } = inputRules.prepareRulesFormik({
    email: inputRules.emailDefaultRule(),
    password: inputRules.passDefaultRule(),
    password_confirmation: inputRules.passDefaultRule(t("Повторный пароль обязателен")),
    submit: { val: null },
    // @ts-ignore
    first_name: { rule: Yup.string().trim().maxLen(255).required(t("Имя обязательно")) },
    // @ts-ignore
    sur_name: { rule: Yup.string().trim().maxLen(255).required(t("Отчество обязательно")) },
    // @ts-ignore
    last_name: { rule: Yup.string().trim().maxLen(255).required(t("Фамилия обязательна")) },
    role: {
      rule: Yup.string().required().oneOf([ERoles.USER, ERoles.ADMIN], t("Роль может быть выбрана только из доступных вариантов!")),
      val: chosenRole
    }
  });

  const { onSubmit } = useGoogleRecaptcha({
    fromAction: "register",
    actionOnSubmit: (captchaToken, formValues) => {
      return userAuth.register(formValues, captchaToken);
    }
  });

  return (
    <FormikRegister
      chosenRole={chosenRole}
      setChosenRole={setChosenRole}
      onSubmit={onSubmit}
      formFields={formFields}
      formValidationSchema={formValidationSchema}
    />
  );
};

export default FormInputs;