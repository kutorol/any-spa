// @ts-ignore
import React, { useCallback, useEffect } from "react";

// Хук выполняющий onEscape(), когда нажали на ESC
const useOnEscape = (onEscape: () => void) => {
  const _onEscape = useCallback(e => {
    if (e.key === "Escape" || e.code === "Escape" || e.which === 27 || e.keyCode === 27) {
      onEscape();
    }
  }, [onEscape]);


  useEffect(() => {
    window.addEventListener("keydown", _onEscape);
    return () => {
      window.removeEventListener("keydown", _onEscape);
    };
  }, []);

  return null;
};

export default useOnEscape;