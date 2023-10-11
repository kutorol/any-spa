import React from 'react'
import ErrorSnackbar from "./Snackbar/ErrorSnackbar";
import InfoSnackbar from "./Snackbar/InfoSnackbar";
import WarningSnackbar from "./Snackbar/WarningSnackbar";
import SuccessSnackbar from "./Snackbar/OkSnackbar";
import NavigateSetter from "./Utils/NavigateSetter";
import LocalizatorSetter from "./Utils/LocalizatorSetter";
import FullLoader from "./Utils/FullLoader";
import YumCustomRulesSetter from "./Utils/YumCustomRulesSetter";

export default function InitCommonComponents() {
  return (
    <>
      {/*Разноцветные уведомлялки*/}
      <ErrorSnackbar/>
      <InfoSnackbar/>
      <WarningSnackbar/>
      <SuccessSnackbar/>
      {/*Создаем хук для управления роутами в любом месте*/}
      <NavigateSetter/>
      {/*Создаем хук для управления локализацией в любом месте*/}
      <LocalizatorSetter/>
      {/*Устанавливает кастомные обработчики ошибок формы*/}
      <YumCustomRulesSetter/>
      {/*Создаем div, который на весь экран ставит загрузку*/}
      <FullLoader/>
    </>
  );
}
