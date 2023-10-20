import { Theme } from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

interface IWizard {
  activeStep: number;
  setActiveStep: (i: number) => void;
  stepTitles: string[];
  getStepTextError: (i: number) => string | null;
  children: () => React.ReactNode;
  getIsStepOptional: (i: number) => boolean;
  nextIsDisabled: boolean;
  isShowCloseBtn?: boolean;
  finishBtnTitle: string;
  onClose: () => void;
  showButtons?: boolean;
  theme?: Theme;
}

const Wizard = ({
                  activeStep,
                  setActiveStep,
                  stepTitles,
                  finishBtnTitle,
                  nextIsDisabled,
                  children,
                  getStepTextError,
                  getIsStepOptional,
                  onClose,
                  isShowCloseBtn = false,
                  showButtons = true,
                  theme
}: IWizard) => {
  const { t } = useLaravelReactI18n();
  theme = theme || useTheme();

  // @ts-ignore
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const getIsStepSkipped = (step: number): boolean => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (getIsStepSkipped(activeStep)) {
      // @ts-ignore
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(activeStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    setActiveStep(activeStep + 1);
  };

  const nextBtnTitle = activeStep === stepTitles.length - 1 ? finishBtnTitle : t("Далее");

  return (
    <ThemeProvider theme={theme}>
      <Header
        activeStep={activeStep}
        stepTitles={stepTitles}
        getIsStepOptional={getIsStepOptional}
        getStepTextError={getStepTextError}
        getIsStepSkipped={getIsStepSkipped}
      />

      {children()}

      {showButtons && (
        <Footer
          onClose={onClose}
          nextIsDisabled={nextIsDisabled}
          backIsDisabled={activeStep === 0}
          isNeedOptional={getIsStepOptional(activeStep)}
          handleBack={handleBack}
          handleSkip={handleSkip}
          handleNext={handleNext}
          nextBtnTitle={nextBtnTitle}
          isShowCloseBtn={isShowCloseBtn}
        />
      )}
    </ThemeProvider>
  );
};

export default Wizard;