import { Toolbar } from "@mui/material";
import { Formik } from "formik";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React from "react";
import { inputRules } from "../../../../../utils/funcs/form-rule/default-rule";
import CustomTextarea from "../../../../Common/Inputs/CustomTextarea";

interface IStep4 {
  comment: string;
  onChangeComment: (comment: string) => void;
}

interface ISubmitComment {
  comment?: string;
}

const Step4 = ({ comment, onChangeComment }: IStep4) => {
  const { t } = useLaravelReactI18n();
  const maxCommentSymbols = 2500;
  const rules = inputRules.commentDefaultRule(t("Текст обращения обязателен"), maxCommentSymbols);
  rules.val = comment;

  // @ts-ignore
  const { formFields, formValidationSchema } = inputRules.prepareRulesFormik({
    comment: rules
  });

  const onSubmit = (values: ISubmitComment): void => {
    onChangeComment(values.comment);
  };

  const onChange = (handleChange: (e: React.ChangeEvent<any>) => void): ((e: React.ChangeEvent<any>) => void) => {
    return (e: React.ChangeEvent<any>): void => {
      handleChange(e);
      onChangeComment(e.target.value);
    };
  };

  return (
    <Formik
      initialValues={formFields}
      validationSchema={formValidationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, handleChange, handleSubmit, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Toolbar/>
          <CustomTextarea
            title={t("Текст обращения")}
            name="comment"
            showLeftChars
            maxLength={maxCommentSymbols}
            values={values}
            handleBlur={handleSubmit}
            handleChange={onChange(handleChange)}
            touched={touched}
            errors={errors}
          />
        </form>
      )}
    </Formik>
  );
};

export default Step4;