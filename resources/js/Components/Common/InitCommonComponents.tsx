import * as React from "react";
import ErrorSnackbar from "./Snackbar/ErrorSnackbar";
import InfoSnackbar from "./Snackbar/InfoSnackbar";
import SuccessSnackbar from "./Snackbar/OkSnackbar";
import WarningSnackbar from "./Snackbar/WarningSnackbar";
import CookieConfirm from "./Utils/Cookie/CookieConfirm";
import FullLoader from "./Utils/FullLoader";
import LocalizatorSetter from "./Utils/LocalizatorSetter";
import NavigateSetter from "./Utils/NavigateSetter";
import SeoTitles from "./Utils/SeoTitles";
import YumCustomRulesSetter from "./Utils/YumCustomRulesSetter";

export default function InitCommonComponents() {
  return (
    <>
      {/* Разноцветные уведомлялки */}
      <ErrorSnackbar/>
      <InfoSnackbar/>
      <WarningSnackbar/>
      <SuccessSnackbar/>
      {/* Создаем хук для управления роутами в любом месте */}
      <NavigateSetter/>
      {/* Создаем хук для управления локализацией в любом месте */}
      <LocalizatorSetter/>
      {/* Устанавливает кастомные обработчики ошибок формы */}
      <YumCustomRulesSetter/>
      {/* Создаем div, который на весь экран ставит загрузку */}
      <FullLoader/>
      {/* При обновлении каждой страницы ставим seo текст */}
      <SeoTitles/>
      {/* Подтверждение использования cookie */}
      <CookieConfirm/>
    </>
  );
}
