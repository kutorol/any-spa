// @ts-ignore
import dayjs from "dayjs";
import { CountryCode, isPossiblePhoneNumber, parsePhoneNumber } from "libphonenumber-js/min";
import { IDateChecker } from "../../interfaces/date";
import dateChecker from "./date-checker";

class Checker {
  constructor(private readonly dateCheckerHandle: IDateChecker) {
  }

  // возвращает объект проверщика дат
  public dateChecker(): IDateChecker {
    return this.dateCheckerHandle;
  }

  // Кастомные правила валидации email
  public checkEmail(email?: string): boolean {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      .test((email || "").trim());
  }

  // Кастомные правила валидации телефона
  public checkPhone(phoneFormat: string, defaultCountry?: CountryCode | { defaultCountry?: CountryCode, defaultCallingCode?: string }): boolean {
    if (!defaultCountry) {
      const phoneData = parsePhoneNumber(`+${phoneFormat}`);
      defaultCountry = {
        defaultCallingCode: phoneData.countryCallingCode,
        defaultCountry: phoneData.country
      };
    }

    return isPossiblePhoneNumber(phoneFormat, defaultCountry);
  }
}

const checker = new Checker(
  dateChecker
);

export default checker;