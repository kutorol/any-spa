import { reduce } from "lodash";
import * as Yup from "yup";
import Locale from "../locale";

// Дефолтные правила валидации формы и подготовка данных для Formik
class InputRulesClass {
  public prepareRulesFormik(inputs: object = {}): object {
    return {
      formFields: this.getFormFields(inputs),
      formValidationSchema: this.getYupShape(inputs)
    };
  }

  public emailDefaultRule() {
    const { t } = Locale.locale;
    return {
      // @ts-ignore
      rule: Yup.string().email(t("Введен некорректный E-mail")).maxLen(255).required(t("E-mail обязателен"))
    };
  }

  public passDefaultRule(requireMsg?: string) {
    return {
      // @ts-ignore
      rule: Yup.string().trim().minLen(6).maxLen(255).required(Locale.locale.t(requireMsg || "Пароль обязателен"))
    };
  }

  private getFormFields(inputs: object = {}): object {
    return reduce(inputs, (r, v, k) => {
      r[ k ] = typeof v.val === "undefined" ? "" : v.val;
      return r;
    }, {});
  }

  private getYupShape(inputs: object = {}): object {
    return Yup.object().shape(reduce(inputs, (r, v, k) => {
      if (typeof v.rule !== "undefined") {
        r[ k ] = v.rule;
      }
      return r;
    }, {}));
  }
}

export const inputRules = new InputRulesClass();