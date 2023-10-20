// @ts-ignore
import React, { useState } from "react";

interface IUseOpen {
  isOpen: boolean,
  toggle: () => void
}

// Хук переключалки открытия/закрытия
const useOpen = (initIsOpen: boolean = false): IUseOpen => {
  const [isOpen, setIsOpen] = useState<boolean>(initIsOpen);

  return {
    isOpen: isOpen,
    toggle: () => {
      setIsOpen(!isOpen);
    }
  };
};

export default useOpen;