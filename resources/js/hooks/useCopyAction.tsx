import * as React from "react";
import { createSuccessMgs } from "../store/reducers/func/snackbar/ok-snackbar";
import { createWarningMgs } from "../store/reducers/func/snackbar/warning-snackbar";

const useCopyAction = (successMsg?: string, errorMsg?: string): ((text: string, onSuccess?: () => void) => void) => {
  return (text: string, onSuccess?: () => void): void => {
    window.navigator.clipboard.writeText(text).then(() => {
      createSuccessMgs(successMsg, 1000);
      onSuccess && onSuccess();
    }, () => {
      createWarningMgs(errorMsg, 2000);
    });
  };
};

export default useCopyAction;