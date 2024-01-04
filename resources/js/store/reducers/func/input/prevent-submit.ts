import * as React from "react";

// Если передали true, то при нажатии на ENTER стандартное действие отменяется
export const preventOnSubmit = (noSubmit?: boolean) => (e: React.KeyboardEvent): void => {
  if (!noSubmit) {
    return;
  }

  if (e.key === "Enter" || e.which === 13 || e.keyCode === 13) {
    e.preventDefault();
  }
};