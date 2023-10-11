// @ts-ignore
import value from "../../../assets/scss/themes-vars.module.scss";
import Locale from "./locale";

// has number
const hasNumber = (number) => new RegExp(/[0-9]/).test(number);

// has mix of small and capitals
const hasMixed = (number) => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

// has special chars
const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

// set color based on password strength
export const strengthColor = (count) => {
  const { t } = Locale.locale;
  const notSafe = t("Не безопасный");
  if (count < 2) return { label: notSafe, color: value.errorMain };
  if (count < 3) return { label: notSafe, color: value.errorMain };
  if (count < 4) return { label: t("Слабый"), color: value.warningDark };
  if (count < 5) return { label: t("Нормальный"), color: value.orangeMain };
  if (count < 6) return { label: t("Отличный"), color: value.successMain };
  if (count < 7) return { label: t("Великолепный"), color: value.successDark };

  return { label: notSafe, color: value.errorMain };
};

// password strength indicator
export const strengthIndicator = (number) => {
  let strengths = 0;
  if (number.length > 0) strengths += 1;
  if (number.length > 5) strengths += 1;
  if (number.length > 7) strengths += 1;
  if (hasNumber(number)) strengths += 1;
  if (hasSpecial(number)) strengths += 1;
  if (hasMixed(number)) strengths += 1;
  return strengths;
};
