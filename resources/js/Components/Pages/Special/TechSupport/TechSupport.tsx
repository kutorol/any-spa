import { createTheme, useTheme } from "@mui/material/styles";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TechSupportTypes } from "../../../../utils/enums/common/enums";
import checker from "../../../../utils/funcs/form-rule/checker";
import techSupport from "../../../../utils/repository/tech-support";
import FullScreenDialog from "../../../Common/Gui/Dialog/FullScreenDialog";
import Wizard from "../../../Common/Gui/Wizard/Wizard";
import FinishStep from "./Content/FinishStep";
import Step1 from "./Content/Step1";
import Step2 from "./Content/Step2";
import Step3 from "./Content/Step3";
import Step4 from "./Content/Step4";

interface ITechSupport {
  isFromSupportPage?: boolean;
  isOpen: boolean;
  toggle: () => void;
}

const TechSupport = ({ toggle, isFromSupportPage = false, isOpen = false }: ITechSupport) => {
  const theme = useTheme();
  const navigate = useNavigate();
  // перекрашиваем весь попап в зеленый цвет, когда успешная отправка
  const successTheme = createTheme(theme, {
    palette: {
      primary: {
        main: theme.palette.success.dark
      }
    }
  });

  const { t } = useLaravelReactI18n();
  const [chosenVariantType, setChosenVariantType] = useState<TechSupportTypes>(TechSupportTypes.TYPE_PROBLEM);
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isSendSuccess, setIsSendSuccess] = useState<boolean>(false);
  const [timer, setTimer] = useState(null);

  const stepTitles: string[] = [t("Тип обращения"), t("E-mail"), t("Фото"), t("Обращение")];

  // задизейблена ли кнопка "далее"
  const nextIsDisabled = (activeStep === 1 && !checker.checkEmail(email))
    || (activeStep === 2 && attachments.length === 0)
    || (activeStep === 3 && comment.trim().length < 6);

  const resetForm = (): void => {
    setActiveStep(0);
    setEmail("");
    setComment("");
    setChosenVariantType(TechSupportTypes.TYPE_PROBLEM);
    setAttachments([]);
    setIsSendSuccess(false);
  };

  const onCloseOpenClick = (e?: any) => {
    e && e.preventDefault();

    // при закрытии сбрасываем форму
    isOpen && resetForm();

    toggle();

    // Если открыли со специальной страницы, то на логин перекидываем при закрытии
    if (isOpen && isFromSupportPage) {
      navigate("/");
    }
  };

  // закрытие формы через 5 секунд после успешной отправки
  useEffect(() => {
    if (isSendSuccess) {
      setTimer(setTimeout(() => {
        onCloseOpenClick();
      }, 5000));
    }

    return () => {
      timer && clearTimeout(timer);
    };
  }, [isSendSuccess]);

  // на финишном шаге отправляем запрос с обращением из формы
  useEffect(() => {
    if (activeStep === stepTitles.length && !isSendSuccess) {
      techSupport.send(attachments, chosenVariantType, email, comment).then((res: boolean): void => {
        if (res) {
          // завершили отправку
          setIsSendSuccess(true);
        } else {
          // возвращаем на шаг назад
          setActiveStep(activeStep - 1);
        }
      });
    }
  }, [activeStep, isSendSuccess]);

  // возвращает ошибку, которая отображается в хедере
  const getStepTextError = (i): string | null => {
    if (activeStep === 1 && activeStep === i && email.trim() !== "" && !checker.checkEmail(email)) {
      return t("E-mail не правильный");
    }

    if (activeStep === 3 && activeStep === i && comment.trim().length < 6) {
      return t("Минимум 6 символов");
    }

    return null;
  };

  // если нажали на enter в форме с email
  const onSubmitEmail = () => {
    !nextIsDisabled && setActiveStep(activeStep + 1);
  };

  return (
    <FullScreenDialog
      title={t("Техническая поддержка")}
      isOpen={isOpen}
      onCloseClick={onCloseOpenClick}
      theme={isSendSuccess ? successTheme : theme}
      isCloseBtnSuccess={isSendSuccess}
    >
      <Wizard
        onClose={onCloseOpenClick}
        getIsStepOptional={(step: number): boolean => step === 2}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        stepTitles={stepTitles}
        finishBtnTitle={t("Отправить")}
        nextIsDisabled={nextIsDisabled}
        getStepTextError={getStepTextError}
        showButtons={activeStep !== stepTitles.length}
        theme={isSendSuccess ? successTheme : theme}
      >
        {() => {
          if (activeStep === 0) {
            return (
              <Step1
                chosenVariant={chosenVariantType}
                setChosenVariant={setChosenVariantType}
                onNextClick={() => setActiveStep(activeStep + 1)}
              />
            );
          }

          if (activeStep === 1) {
            return (
              <Step2
                email={email}
                onChangeEmail={setEmail}
                onSubmit={onSubmitEmail}
              />
            );
          }

          if (activeStep === 2) {
            return (
              <Step3
                attachments={attachments}
                setAttachments={setAttachments}
                onNextClick={() => setActiveStep(activeStep + 1)}
              />
            );
          }

          if (activeStep === 3) {
            return (
              <Step4
                comment={comment}
                onChangeComment={setComment}
              />
            );
          }

          if (activeStep === 4) {
            return (
              <FinishStep isSuccess={isSendSuccess}/>
            );
          }
        }}
      </Wizard>
    </FullScreenDialog>
  );
};

export default TechSupport;