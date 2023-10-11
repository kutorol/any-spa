import * as Yup from "yup";
import Locale from "../locale";

// Инициализатор обработки собственных правил валидации формы
class CustomRulesSetter {
  private isInit: boolean = false;

  public init(): void {
    if (this.isInit) {
      return;
    }

    this.isInit = true;


    this.setForStr();
    this.setForNum();
  }

  private setForStr(): void {
    this.setMinLenStr();
    this.setMaxLenStr();
  }

  private setForNum(): void {

  }

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
}

export const customRulesSetter = new CustomRulesSetter();