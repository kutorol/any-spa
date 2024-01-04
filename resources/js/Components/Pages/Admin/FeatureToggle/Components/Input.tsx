import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { useEffect, useState } from "react";
import { createWarningMgs } from "../../../../../store/reducers/func/snackbar/warning-snackbar";
import { IFeatureToggle } from "../../../../../utils/interfaces/admin/toggle";
import CustomTextarea from "../../../../Common/Inputs/CustomTextarea";

interface IInput {
  item: IFeatureToggle;
  field: "name" | "value" | "comment";
  onChangeVal: (name: string, value: string, comment: string) => void;
}

const Input = ({ item, field, onChangeVal }: IInput) => {
  const { t } = useLaravelReactI18n();
  const [val, setVal] = useState<IFeatureToggle>(item);
  const isVal = field === "value";
  const isName = field === "name";

  useEffect(() => {
    setVal(item);
  }, [item]);

  // @ts-ignore
  const onChange = (e: React.SyntheticEvent): void => setVal({ ...val, [field]: e.target.value });

  const onBlur = (): void => {
    const v = val[field].trim();
    if (v === item[field]) {
      return;
    }

    if (!v) {
      let title = t(isVal ? "Вы не указали значение" : "Вы не указали комментарий");
      if (isName) {
        title = t("Вы не указали название");
      }
      createWarningMgs(title, 800);
      setVal(item);
      return;
    }

    onChangeVal(val.name, val.value, val.comment);
  };

  const title = isName ? t("Название") : t(isVal ? "Значение" : "Комментарий");

  return (
    <CustomTextarea
      name={field}
      title={title}
      handleChange={onChange}
      handleBlur={onBlur}
      value={val[field]}
      minRows={2}
      shrink
      placeholder={title}
    />
  );
};

export default Input;