import { ButtonGroup, Grid, Stack, Typography } from "@mui/material";
import { Formik } from "formik";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { useRef, useState } from "react";
import * as Yup from "yup";
import useDialogConfirm from "../../../../../../hooks/dialog/useDialogConfirm";
import { ETechSupportStatus } from "../../../../../../utils/enums/admin/tech-support";
import { inputRules } from "../../../../../../utils/funcs/form-rule/default-rule";
import { IProblemInterface } from "../../../../../../utils/interfaces/admin/tech-support";
import Btn from "../../../../../Common/Gui/Btn/Btn";
import Icon from "../../../../../Common/Gui/Common/Icon";
import SelectBlock from "../../../../../Common/Gui/Select/Plain/SelectBlock";
import CustomMarkdown from "../../../../../Common/Gui/Text/CustomMarkdown";
import CustomTextarea from "../../../../../Common/Inputs/CustomTextarea";
import { getStatusColors, getStatusTitles } from "./ChipStatus";

interface IFormAnswer {
  problem: IProblemInterface;
  onSubmit: (comment: string, status: ETechSupportStatus) => Promise<boolean>;
}

const none = "none";

const FormAnswer = ({ problem, onSubmit }: IFormAnswer) => {
  const { t } = useLaravelReactI18n();

  const refForm = useRef();
  const [isMarkdownComment, setIsMarkdownComment] = useState<boolean>(true);
  const [comment, setComment] = useState<string>("");
  const [status, setStatus] = useState<ETechSupportStatus | "none">(none);
  const { confirmDialogTSX, openConfirmDialog } = useDialogConfirm((): Promise<boolean> => {
    return onSubmit(comment, status as ETechSupportStatus).then((res: boolean): boolean => {
      if (!res) {
        return false;
      }
      if (refForm.current) {
        // @ts-ignore
        refForm.current.setFieldValue("comment", "");
      }
      setComment("");
      setStatus(none);
      return true;
    });
  }, t("отправить ответ"));

  // @ts-ignore
  const statusTitles: { [k in ETechSupportStatus | "none"]: string } = {
    ...(status !== none ? {} : { none: t("Не выбрано") }),
    ...getStatusTitles()
  };

  delete statusTitles[problem.status];

  const statusColors = getStatusColors();
  const maxCommentSymbols = 2500;
  const { formFields, formValidationSchema } = inputRules.prepareRulesFormik({
    comment: {
      // @ts-ignore
      rule: Yup.string().trim().maxLen(maxCommentSymbols),
      val: comment
    }
  });

  const onChangeStatus = (e: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(e.target.value as ETechSupportStatus | "none");
  };

  const _onSubmit = (): void => openConfirmDialog();

  const onChange = (handleChange: (e: React.ChangeEvent<any>) => void): ((e: React.ChangeEvent<any>) => void) => {
    return (e: React.ChangeEvent<any>): void => {
      handleChange(e);
      setComment(e.target.value);
    };
  };

  const withoutPrettyTitle = t("Без предпросмотра");
  const withPrettyTitle = t("Предпросмотр");
  const answerText = t("Ответить");

  if (problem.status === ETechSupportStatus.DONE || problem.status === ETechSupportStatus.REJECTED) {
    return null;
  }

  return (
    <>
      <Grid item xs={12} sx={{ my: 3 }}>
        <Formik
          initialValues={formFields}
          validationSchema={formValidationSchema}
          onSubmit={() => {
          }}
          innerRef={refForm}
        >
          {({ errors, handleChange, handleSubmit, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid item xs={12} sx={{ my: 3 }}>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Typography variant="h4">
                    {t("Напишите ответ")}
                  </Typography>

                  <ButtonGroup
                    variant="contained"
                    color="secondary"
                    sx={{ boxShadow: "none" }}
                  >
                    <Btn
                      size="small"
                      onClick={e => setIsMarkdownComment(false)}
                      variant={isMarkdownComment ? "outlined" : "contained"}
                      webTitle={withoutPrettyTitle}
                      mobTitle={withoutPrettyTitle}
                      icon={<Icon tablerIcon="IconYinYang"/>}
                    />

                    <Btn
                      size="small"
                      onClick={e => setIsMarkdownComment(true)}
                      variant={isMarkdownComment ? "contained" : "outlined"}
                      webTitle={withPrettyTitle}
                      mobTitle={withPrettyTitle}
                      icon={<Icon tablerIcon="IconYinYangFilled"/>}
                    />
                  </ButtonGroup>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item md={isMarkdownComment ? 6 : 12}>

                  <CustomTextarea
                    title={t("Текст ответа")}
                    name="comment"
                    showLeftChars
                    maxLength={maxCommentSymbols}
                    values={values}
                    handleBlur={handleSubmit}
                    handleChange={onChange(handleChange)}
                    errors={errors}
                    canUseMarkdown
                  />

                </Grid>
                <Grid item md={6} hidden={!isMarkdownComment}>
                  <CustomMarkdown text={comment}/>
                </Grid>
              </Grid>
              {/* @ts-ignore */}
              <Grid item xs={12} align="right">
                <Stack direction="row" justifyContent="flex-end" alignItems="center">
                  <SelectBlock
                    name="status"
                    color={statusColors[status] || statusColors[ETechSupportStatus.IN_PROGRESS]}
                    label={t("Статус запроса")}
                    variants={statusTitles}
                    onChange={onChangeStatus}
                    chosenVariant={status}
                  />

                  <Btn
                    disabled={status === none || Boolean(errors["comment"])}
                    type="submit"
                    variant="contained"
                    webTitle={answerText}
                    mobTitle={answerText}
                    icon={<Icon tablerIcon="IconSend"/>}
                    onClick={_onSubmit}
                  />
                </Stack>
              </Grid>
            </form>
          )}
        </Formik>
      </Grid>
      {confirmDialogTSX}
    </>
  );
};

export default FormAnswer;