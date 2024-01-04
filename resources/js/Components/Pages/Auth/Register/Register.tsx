import * as React from "react";
import AuthFormWrapper from "../Common/AuthFormWrapper";

interface IRegister {
  isLanding?: boolean;
}

const Register = ({ isLanding }: IRegister) => {
  return (
    <AuthFormWrapper
      isRegister
      isLanding={isLanding}
    />
  );
};

export default Register;
