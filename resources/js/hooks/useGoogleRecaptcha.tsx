import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React, { useCallback, useEffect } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { changeFullScreenLoaderState } from "../store/reducers/func/common/full-screen-loader";
import { createErrMgs } from "../store/reducers/func/snackbar/error-snackbar";

const useGoogleRecaptcha = ({
                              fromAction = "login", actionOnSubmit = (captchaToken, values) => {
  }
                            }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { t } = useLaravelReactI18n();

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.info("Execute recaptcha not yet available");
      return;
    }
    console.log("Recaptcha available");

    return await executeRecaptcha(fromAction);
  }, [executeRecaptcha]);

  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  return {
    handleReCaptchaVerify: handleReCaptchaVerify,
    // @ts-ignore
    onSubmit: async (values = {}, {
      resetForm = () => {
      }, setSubmitting = (v) => {
      }
    }) => {
      setSubmitting(true);
      handleReCaptchaVerify().then(captchaToken => {
        changeFullScreenLoaderState(true);
        return actionOnSubmit(captchaToken, values);
      }).catch(e => {
        console.error("System error", e);
        let errs = t("Не удалось пройти проверку каптчи от Google. Попробуйте еще раз или обновите страницу");
        if (e.message || "") {
          errs = `${t("Ошибка сайта")}: ${e.toString()}`;
        }

        createErrMgs(errs);
        return false;
      }).then(res => {
        changeFullScreenLoaderState(false);
        setSubmitting(false);
        res && resetForm();
      });
    }
  };
};

export default useGoogleRecaptcha;