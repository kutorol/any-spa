import { get } from "lodash";
// @ts-ignore
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import useSecondsLeftTimer from "../../../../hooks/useSecondsLeftTimer";
import userAuth from "../../../../utils/repository/user-auth";
import VerifyEmail from "./VerifyEmail";

const VerifyEmailWrapper = () => {
  const navigate = useNavigate();
  // @ts-ignore
  const verifiedEmail = useSelector(s => s.userInfo.user.verified_email);
  const { leftSeconds, setLeftSeconds } = useSecondsLeftTimer({
    initStorageNameLeftSeconds: "verify_email_again_action"
  });

  useEffect(() => {
    if (verifiedEmail) {
      navigate("/");
    }
    return () => {
    };
  }, [verifiedEmail]);


  const onClickSendEmail = (e): void => {
    e && e.preventDefault();
    if (leftSeconds > 0) {
      return;
    }

    userAuth.sendVerifyEmail((res: object) => get(res, "status", false) && setLeftSeconds(60));
  };

  if (verifiedEmail) {
    return null;
  }

  return (
    <VerifyEmail
      onClick={onClickSendEmail}
      leftSeconds={leftSeconds}
    />
  );
};

export default VerifyEmailWrapper;