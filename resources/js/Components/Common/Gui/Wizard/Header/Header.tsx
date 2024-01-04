import { useMediaQuery } from "@mui/material";
import MobileStepper from "@mui/material/MobileStepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
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
  isSuccess: boolean,
}

const Header = ({
                  activeStep,
                  stepTitles,
                  getIsStepOptional,
                  getStepTextError,
                  getIsStepSkipped,
                  isSuccess
                }: IHeader) => {

  const theme = useTheme();
  const getStepProps = i => {
    const stepProps: iStepProps = {};
    if (getIsStepSkipped(i)) {
      stepProps.completed = false;
    }

    return stepProps;
  };

  const getLabelProps = (i): iLabelProps => {
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
        <StepLabel
          sx={labelProps.error ? {} : {
            "& .MuiStepIcon-root.Mui-active, & .MuiStepIcon-root.Mui-completed": {
              color: isSuccess ? theme.palette.success.dark : theme.palette.secondary[400]
            }
          }}
          {...labelProps}
        >
          {label}
        </StepLabel>
      </Step>
    );
  });

  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));

  if (matchDownMd) {
    return (
      <MobileStepper
        variant="progress"
        steps={5}
        position="static"
        activeStep={activeStep}
        sx={{ flexGrow: 1 }}
        nextButton={null}
        backButton={null}
        LinearProgressProps={{
          color: isSuccess ? "success" : "secondary",
          sx: { "&.MuiLinearProgress-root": { width: "100%" } }
        }}
      />
    );
  }

  return (
    <Stepper activeStep={activeStep}>
      {listLabels}
    </Stepper>
  );
};

export default Header;