import * as React from "react";
import { customRulesSetter } from "../../../utils/funcs/form-rule/custom-rules-setter";

// Инициализируем после установки локализатора, чтобы после выводить уже валидацию на разных языках
const YumCustomRulesSetter = () => {
  customRulesSetter.init();
  return null;
};

export default YumCustomRulesSetter;