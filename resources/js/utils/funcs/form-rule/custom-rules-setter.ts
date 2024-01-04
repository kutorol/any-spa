// @ts-ignore
import dayjs from "dayjs";
import * as Yup from "yup";
import { MinDate } from "../../../store/constant";
import store from "../../../store/store";
import { IDateChecker } from "../../interfaces/date";
import { __, __c } from "../locale";
import checker from "./checker";

interface ICheckerInterface {
  checkEmail(v?: string): boolean;

  dateChecker(): IDateChecker;
}

// Инициализатор обработки собственных правил валидации формы
class CustomRulesSetter {
  private isInit: boolean = false;


  constructor(private readonly checker: ICheckerInterface) {
  }

  public init(): void {
    if (this.isInit) {
      return;
    }

    this.isInit = true;


    this.setForStr();
    this.setEmailCustom();
    this.setDateCustom();
  }

  private setForStr(): void {
    this.setMinLenStr();
    this.setMaxLenStr();
  }

  private setDateCustom(): void {
    this.setDateRule();
  }

  // добавляет правила валидации минимального количества символов
  private setMinLenStr(): void {
    Yup.addMethod(Yup.string, "minLen", function(num) {
      const errorMessage = __c(
        "Минимум :num символ|Минимум :num символа|Минимум :num символов",
        num,
        { num: num }
      );

      return this.test(`test-min-len`, errorMessage, function(v) {
        return (
          (v && v.trim().length >= num)
          || this.createError({ path: this.path, message: errorMessage })
        );
      });
    });
  }

  // добавляет правила валидации максимального количества символов
  private setMaxLenStr(): void {
    Yup.addMethod(Yup.string, "maxLen", function(num) {
      const errorMessage = __c(
        "Максимум :num символ|Максимум :num символа|Максимум :num символов",
        num,
        { num: num }
      );

      return this.test(`test-max-len`, errorMessage, function(v) {
        return (
          ((v || "").trim().length === 0 || v.trim().length <= num)
          || this.createError({ path: this.path, message: errorMessage })
        );
      });
    });
  }

  // добавляет правила валидации email
  private setEmailCustom(): void {
    const checker = this.checker;
    Yup.addMethod(Yup.string, "emailCustom", function() {
      const errorMessage = __("E-mail не правильный");

      return this.test(`test-email-custom`, errorMessage, function(v: any) {
        return checker.checkEmail(v)
          || this.createError({ path: this.path, message: errorMessage });
      });
    });
  }

  private setDateRule() {
    const checker = this.checker;
    // проверка просто на то, что строка - это дата
    Yup.addMethod(Yup.string, "dateCustom", function() {
      const errorMessage = __("Дата является не правильной");

      return this.test(`test-date-custom`, errorMessage, function(v?: any) {
        return !v || checker.dateChecker().checkDate(v)
          || this.createError({ path: this.path, message: errorMessage });
      });
    });

    // проверка на то, что дата в будущем времени
    Yup.addMethod(Yup.string, "dateFutureCustom", function(afterDate?: string) {
      const errorMessage = __("Дата не может быть больше указанной даты: :date", {
        date: dayjs(afterDate || dayjs()).locale(store.getState().userInfo.user.locale).format("MMMM D, YYYY")
      });

      return this.test(`test-date-future-custom`, errorMessage, function(v?: any) {
        return !v || !checker.dateChecker().checkIsDateFuture(v, afterDate)
          || this.createError({ path: this.path, message: errorMessage });
      });
    });

    // проверка просто на то, что дата в прошлом времени
    Yup.addMethod(Yup.string, "datePastCustom", function(beforeDate?: string) {
      const errorMessage = __("Дата не может быть меньше указанной даты: :date", {
        date: dayjs(beforeDate || MinDate).locale(store.getState().userInfo.user.locale).format("MMMM D, YYYY")
      });

      return this.test(`test-date-past-custom`, errorMessage, function(v?: any) {
        return !v || !checker.dateChecker().checkIsDatePast(v, beforeDate)
          || this.createError({ path: this.path, message: errorMessage });
      });
    });
  }
}

export const customRulesSetter = new CustomRulesSetter(checker);