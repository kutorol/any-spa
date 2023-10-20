import * as Yup from "yup";
import Locale from "../locale";
import checker from "./checker";

interface checkerInterface {
  checkEmail(v?: string): boolean;
}

// Инициализатор обработки собственных правил валидации формы
class CustomRulesSetter {
  private isInit: boolean = false;


  constructor(private readonly checker: checkerInterface) {
  }

  public init(): void {
    if (this.isInit) {
      return;
    }

    this.isInit = true;


    this.setForStr();
    this.setEmailCustom();
  }

  private setForStr(): void {
    this.setMinLenStr();
    this.setMaxLenStr();
  }

  // добавляет правила валидации минимального количества символов
  private setMinLenStr(): void {
    Yup.addMethod(Yup.string, "minLen", function(num) {
      const errorMessage = Locale.locale.tChoice(
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
      const errorMessage = Locale.locale.tChoice(
        "Максимум :num символ|Максимум :num символа|Максимум :num символов",
        num,
        { num: num }
      );

      return this.test(`test-max-len`, errorMessage, function(v) {
        return (
          (v && v.trim().length <= num)
          || this.createError({ path: this.path, message: errorMessage })
        );
      });
    });
  }

  // добавляет правила валидации email
  private setEmailCustom(): void {
    const checker = this.checker;
    Yup.addMethod(Yup.string, "emailCustom", function() {
      const errorMessage = Locale.locale.t("E-mail не правильный");

      return this.test(`test-email-custom`, errorMessage, function(v: any) {
        return checker.checkEmail(v)
          || this.createError({ path: this.path, message: errorMessage });
      });
    });
  }
}

export const customRulesSetter = new CustomRulesSetter(checker);