import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import Btn from "../../Btn/Btn";
import Icon from "../../Common/Icon";

interface IBack {
  backIsDisabled: boolean;
  handleBack: () => void;
}

const Back = ({ backIsDisabled, handleBack }: IBack) => {
  const { t } = useLaravelReactI18n();

  const title = t("Назад");
  if (backIsDisabled) {
    return null;
  }

  return (
    <Btn
      webTitle={title}
      onClick={handleBack}
      sx={{ mr: 1 }}
      startIcon={<Icon tablerIcon="IconChevronLeft"/>}
    />
  );
};

export default Back;