import { reduce } from "lodash";
import * as Yup from "yup";
import Locale from "../locale";

interface IFieldDefaultRule {
  rule?: Yup.StringSchema;
  val?: string;
}

interface IPrepareRule {
  [ key: string ]: IFieldDefaultRule;
}

interface IGetFormFieldsResponse {
  [ key: string ]: string;
}

// Дефолтные правила валидации формы и подготовка данных для Formik
class InputRulesClass {
  // возвращает правила валидации и значения input для Formik
  public prepareRulesFormik(inputs: IPrepareRule = {}): object {
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
      rule: Yup.string().trim().minLen(6).maxLen(255).required(requireMsg || Locale.locale.t("Пароль обязателен"))
    };
  }

  // Дефолтная валидация для текстовых полей
  public commentDefaultRule(requireMsg?: string, maxCommentSymbols: number = 2500): IFieldDefaultRule {
    return {
      // @ts-ignore
      rule: Yup.string().trim().minLen(6).maxLen(maxCommentSymbols).required(requireMsg || Locale.locale.t("Комментарий обязателен"))
    };
  }

  // Возвращает [{key: val}] для Formik
  private getFormFields(inputs: IPrepareRule): IGetFormFieldsResponse {
    return reduce(inputs, (r, v: IFieldDefaultRule, k: string) => {
      r[ k ] = v.val || "";
      return r;
    }, {});
  }

  // Возвращает правила валидации [{key: rule}] для Formik
  private getYupShape(inputs: IPrepareRule = {}): object {
    return Yup.object().shape(reduce(inputs, (r, v: IFieldDefaultRule, k: string) => {
      if (typeof v.rule !== "undefined") {
        r[ k ] = v.rule;
      }
      return r;
    }, {}));
  }
}

export const inputRules = new InputRulesClass();