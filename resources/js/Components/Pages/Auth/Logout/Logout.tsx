// @ts-ignore
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userAuth from "../../../../utils/repository/user-auth";

const Logout = () => {
  // @ts-ignore
  const [isLogged, setIsLogged] = useState(useSelector(s => s.userInfo.isLogged));

  useEffect(() => {
    isLogged && userAuth.logout()
      .then((res: boolean) => res && setIsLogged(false));

    return () => {
    };
  }, [isLogged]);

  return null;
};

export default Logout;