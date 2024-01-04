import * as React from "react";
import AuthFormWrapper from "../Common/AuthFormWrapper";

interface ILogin {
  isLanding?: boolean;
}

const Login = ({ isLanding }: ILogin) => {
  return (
    <AuthFormWrapper isLanding={isLanding}/>
  );
};

export default Login;
