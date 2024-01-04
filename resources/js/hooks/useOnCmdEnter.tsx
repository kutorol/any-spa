import * as React from "react";

const useOnCmdEnter = (onAction: (e: any) => void): ((e: any) => void) => {
  return (e: any) => {
    // Проверяем, нажата ли клавиша Enter
    if (e.key === "Enter" || e.which === 13 || e.keyCode === 13) {
      // Проверяем, нажата ли клавиша Cmd (Mac) или Ctrl (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && !e.altKey && !e.shiftKey) {
        onAction(e);
      }
    }
  };
};

export default useOnCmdEnter;