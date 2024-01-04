import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import Btn from "../../Btn/Btn";
import Icon from "../../Common/Icon";

interface IOptional {
  isOptional?: boolean;
  handleSkip: () => void;
}

const Optional = ({ isOptional, handleSkip }: IOptional) => {
  const { t } = useLaravelReactI18n();

  if (!isOptional) {
    return null;
  }

  return (
    <Btn
      webTitle={t("Пропустить")}
      onClick={handleSkip}
      sx={{ mr: 1 }}
      endIcon={<Icon tablerIcon="IconPlayerSkipForward"/>}
    />
  );
};

export default Optional;