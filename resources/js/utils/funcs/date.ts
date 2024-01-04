// @ts-ignore
import dayjs, { QUnitType } from "dayjs";
import { startCase } from "lodash";
import store from "../../store/store";
import dateChecker from "./form-rule/date-checker";

export const isAmPm = (): boolean => {
  return store.getState().userInfo.user.is_am_pm;
};

// humanDate Возвращает "Февраль 5, 2023"
export const humanDate = (dateFormat: string): string => {
  const date = dayjs(dateFormat);
  return `${startCase(date.format("MMMM"))} ${date.format("D, YYYY")}`;
};

// humanDate Возвращает "Февраль 5, 2023 15:30:42"
export const humanDateTime = (dateFormat?: string): string => {
  const date = dayjs(dateFormat);

  const headDate = `${startCase(date.format("MMMM"))} ${date.format("D, YYYY")}`;
  if (isAmPm()) {
    return `${headDate} ${date.format("hh:mm:ss A")}`;
  }

  return `${headDate} ${date.format("HH:mm:ss")}`;
};

// humanTime Возвращает время даты
export const humanTime = (dateFormat?: string): string => {
  const date = dayjs(dateFormat);
  return date.format(isAmPm() ? "hh:mm:ss A" : "HH:mm:ss");
};

/**
 * Возвращает сколько прошло времени между двумя датами
 * @param returnType - seconds | days | minutes | ...
 * @param date - дата, между которой нужно высчитать разницу времени
 * @param fromDate - от какой даты вычитать {date}. Если не указана, то возьмется now()
 */
export const dateDiff = (returnType: QUnitType, date: string, fromDate?: string): number | null => {
  if (!checkDate(date) || (fromDate && !checkDate(fromDate))) {
    return null;
  }

  const dateForSub = dayjs(date);
  const dateFromSub = dayjs(fromDate);

  return dateFromSub.diff(dateForSub, returnType);
};

// checkIsDatePast Проверяет дату, что она в прошлом времени до указанного времени (true - если в прошлом времени от указанной даты)
export const checkIsDatePast = (date?: string, beforeDate?: string): boolean => {
  return dateChecker.checkIsDatePast(date, beforeDate);
};

// checkIsDateFuture Проверяет дату, что она в будущем времени (true, если дата в будущем)
export const checkIsDateFuture = (date?: string, afterDate?: string): boolean => {
  return dateChecker.checkIsDateFuture(date, afterDate);
};

// checkDate Проверяет дату
export const checkDate = (date?: string): boolean => {
  return dateChecker.checkDate(date);
};