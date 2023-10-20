import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
// @ts-ignore
import React from "react";
import Error from "./Error";
import Optional from "./Optional";

interface iStepProps {
  completed?: boolean;
}

interface iLabelProps {
  optional?: React.ReactNode;
  error?: boolean;
}

interface IHeader {
  activeStep: number;
  stepTitles: string[];
  getIsStepOptional: (i: number) => boolean;
  getStepTextError: (i: number) => string | null;
  getIsStepSkipped: (i: number) => boolean;
}

const Header = ({ activeStep, stepTitles, getIsStepOptional, getStepTextError, getIsStepSkipped }: IHeader) => {
  const getStepProps = i => {
    const stepProps: iStepProps = {};
    if (getIsStepSkipped(i)) {
      stepProps.completed = false;
    }

    return stepProps;
  };

  const getLabelProps = i => {
    const labelProps: iLabelProps = {};

    if (getIsStepOptional(i)) {
      labelProps.optional = <Optional/>;
    }

    const textErr = getStepTextError(i);
    if (textErr) {
      labelProps.optional = <Error textErr={textErr}/>;
      labelProps.error = true;
    }

    return labelProps;
  };

  const listLabels = stepTitles.map((label, i) => {
    const stepProps = getStepProps(i);
    const labelProps = getLabelProps(i);

    return (
      <Step key={label} {...stepProps}>
        <StepLabel {...labelProps}>
          {label}
        </StepLabel>
      </Step>
    );
  });

  return (
    <Stepper activeStep={activeStep}>
      {listLabels}
    </Stepper>
  );
};

export default Header;