import * as React from "react";
import useOpen from "../../../../hooks/useOpen";
import TechSupport from "./TechSupport";

const TechSupportPage = () => {
  const { isOpen, toggle } = useOpen(true);

  return (
    <TechSupport
      isFromSupportPage
      isOpen={isOpen}
      toggle={toggle}
    />
  );
};

export default TechSupportPage;