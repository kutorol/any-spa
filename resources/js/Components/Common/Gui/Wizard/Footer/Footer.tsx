import CloseIcon from "@mui/icons-material/Close";
import { Box, Button } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React from "react";
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
    return (
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Box sx={{ flex: "1 1 auto" }}/>

        <Button
          onClick={onClose}
          startIcon={<CloseIcon/>}
        >
          {t("Закрыть")}
        </Button>
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

      <Button
        disabled={nextIsDisabled}
        onClick={handleNext}
      >
        {nextBtnTitle}
      </Button>
    </Box>
  );
};

export default Footer;