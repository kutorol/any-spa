import { reduce } from "lodash";
import * as Yup from "yup";
import Locale, { __ } from "../locale";

interface IFieldDefaultRule {
  rule?: Yup.Schema;
  val?: string | number | any;
}

interface IPrepareRule {
  [key: string]: IFieldDefaultRule;
}

interface IGetFormFieldsResponse {
  [key: string]: string;
}

interface IPrepareRulesFormik {
  formFields: IGetFormFieldsResponse;
  formValidationSchema: object;
}

// Дефолтные правила валидации формы и подготовка данных для Formik
class InputRulesClass {
  // возвращает правила валидации и значения input для Formik
  public prepareRulesFormik(inputs: IPrepareRule = {}): IPrepareRulesFormik {
    return {
      formFields: this.getFormFields(inputs),
      formValidationSchema: this.getYupShape(inputs)
    };
  }

  // Дефолтная валидация для email
  public emailDefaultRule(): IFieldDefaultRule {
    const { t } = Locale.locale;
    return {
      // @ts-ignore
      rule: Yup.string().emailCustom(t("Введен некорректный E-mail")).maxLen(255).required(t("E-mail обязателен"))
    };
  }

  // Дефолтная валидация для паролей
  public passDefaultRule(requireMsg?: string): IFieldDefaultRule {
    return {
      // @ts-ignore
      rule: Yup.string().trim().minLen(6).maxLen(255).required(requireMsg || __("Пароль обязателен"))
    };
  }

  // Дефолтная валидация для текстовых полей
  public commentDefaultRule(requireMsg?: string, maxCommentSymbols: number = 2500, minLen: number = 6): IFieldDefaultRule {
    return {
      // @ts-ignore
      rule: Yup.string().trim().minLen(minLen).maxLen(maxCommentSymbols).required(requireMsg || __("Комментарий обязателен"))
    };
  }

  // Дефолтная валидация для полей с датами
  // beforeDate и afterDate - YYYY-MM-DD
  public dateDefaultRule(beforeDate?: string, afterDate?: string): IFieldDefaultRule {
    return {
      // @ts-ignore
      rule: Yup.string().trim().nullable().dateCustom().dateFutureCustom(afterDate).datePastCustom(beforeDate)
    };
  }

  // Возвращает [{key: val}] для Formik
  private getFormFields(inputs: IPrepareRule): IGetFormFieldsResponse {
    return reduce(inputs, (r, v: IFieldDefaultRule, k: string) => {
      r[k] = v.val || "";
      return r;
    }, {});
  }

  // Возвращает правила валидации [{key: rule}] для Formik
  private getYupShape(inputs: IPrepareRule = {}): object {
    return Yup.object().shape(reduce(inputs, (r, v: IFieldDefaultRule, k: string) => {
      if (typeof v.rule !== "undefined") {
        r[k] = v.rule;
      }
      return r;
    }, {}));
  }
}

export const inputRules = new InputRulesClass();