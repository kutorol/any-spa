import { Languages } from "../../../../utils/enums/common/enums";
import store from "../../../store";
import { set } from "../../common/locale";

export const changeLocale = (locale: Languages = Languages.RU) => {
  store.dispatch(set({
    val: locale
  }));
};