import { get } from "lodash";
// @ts-ignore
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import useSecondsLeftTimer from "../../../../hooks/useSecondsLeftTimer";
import { RootState } from "../../../../store/store";
import { navTo } from "../../../../utils/funcs/url";
import userAuth from "../../../../utils/repository/user-auth";
import VerifyEmail from "./VerifyEmail";

const VerifyEmailWrapper = () => {
  const { isLogged, verifiedEmail } = useSelector((s: RootState) => ({
    isLogged: s.userInfo.isLogged,
    verifiedEmail: s.userInfo.user.verified_email
  }));

  const { leftSeconds, setLeftSeconds } = useSecondsLeftTimer({
    initStorageNameLeftSeconds: "verify_email_again_action"
  });

  useEffect(() => {
    if (!isLogged || (isLogged && verifiedEmail)) {
      navTo("/");
    }
    return () => {
    };
  }, [isLogged, verifiedEmail]);

  const onClickSendEmail = (e): void => {
    e && e.preventDefault();
    if (leftSeconds > 0) {
      return;
    }

    userAuth.sendVerifyEmail((res: object) => get(res, "status", false) && setLeftSeconds(60));
  };

  if (!isLogged || verifiedEmail) {
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