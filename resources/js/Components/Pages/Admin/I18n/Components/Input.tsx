import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { useState } from "react";
import { createWarningMgs } from "../../../../../store/reducers/func/snackbar/warning-snackbar";
import { ELanguages } from "../../../../../utils/enums/user";
import { II18n } from "../../../../../utils/interfaces/admin/i18n";
import CustomTextarea from "../../../../Common/Inputs/CustomTextarea";

interface IInput {
  item: II18n;
  onChangeVal: (label: string, locale: ELanguages, val: string) => void;
}

const Input = ({ item, onChangeVal }: IInput) => {
  const { t } = useLaravelReactI18n();
  const [val, setVal] = useState<string>(item.value);

  // @ts-ignore
  const onChange = (e: React.SyntheticEvent): void => setVal(e.target.value);

  const onBlur = (): void => {
    const v = val.trim();
    if (v === item.value) {
      return;
    }

    if (!v) {
      createWarningMgs(t("Вы не указали значение перевода"), 800);
      setVal(item.value);
      return;
    }

    onChangeVal(item.label, item.locale, v);
  };

  return (
    <CustomTextarea
      name={item.label}
      title={t("Перевод")}
      handleChange={onChange}
      handleBlur={onBlur}
      value={val}
      minRows={2}
      shrink
      placeholder={t("Ваш перевод")}
    />
  );
};

export default Input;