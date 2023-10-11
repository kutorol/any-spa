import React from 'react'
import AuthForm from "../../Common/AuthForm";

const AuthFormPasswordReset = () => {
  return (
    <AuthForm
      isRegister={false}
      isPasswordReset
    />
  );
};

export default AuthFormPasswordReset;