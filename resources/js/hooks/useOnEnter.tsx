// @ts-ignore
import React, { useCallback, useEffect } from "react";

// Хук выполняющий onEnter(), когда нажали на Enter
const useOnEnter = (onEnter: () => void) => {
  const _onEnter = useCallback(e => {
    if (e.key === "Enter" || e.which === 13 || e.keyCode === 13) {
      onEnter();
    }
  }, [onEnter]);


  useEffect(() => {
    window.addEventListener("keypress", _onEnter);
    return () => {
      window.removeEventListener("keypress", _onEnter);
    };
  }, []);

  return null;
};

export default useOnEnter;