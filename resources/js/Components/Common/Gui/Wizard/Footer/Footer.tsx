import { Box } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import Btn from "../../Btn/Btn";
import Icon from "../../Common/Icon";
import Back from "./Back";
import Optional from "./Optional";

interface IFooter {
  nextBtnTitle: string;
  backIsDisabled: boolean;
  nextIsDisabled: boolean;
  isShowCloseBtn?: boolean;
  isNeedOptional?: boolean;
  onClose: () => void;
  handleBack: () => void;
  handleSkip: () => void;
  handleNext: () => void;
}

const Footer = ({
                  isShowCloseBtn,
                  onClose,
                  backIsDisabled,
                  nextIsDisabled,
                  isNeedOptional,
                  handleBack,
                  handleSkip,
                  handleNext,
                  nextBtnTitle
                }: IFooter) => {
  const { t } = useLaravelReactI18n();

  if (isShowCloseBtn) {
    const closeTitle = t("Закрыть");

    return (
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Box sx={{ flex: "1 1 auto" }}/>

        <Btn
          onClick={onClose}
          icon={<Icon tablerIcon="IconX"/>}
          webTitle={closeTitle}
          mobTitle={closeTitle}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
      <Back
        backIsDisabled={backIsDisabled}
        handleBack={handleBack}
      />

      <Box sx={{ flex: "1 1 auto" }}/>

      <Optional
        isOptional={isNeedOptional}
        handleSkip={handleSkip}
      />

      <Btn
        webTitle={nextBtnTitle}
        disabled={nextIsDisabled}
        onClick={handleNext}
        endIcon={<Icon tablerIcon="IconChevronRight"/>}
      />
    </Box>
  );
};

export default Footer;