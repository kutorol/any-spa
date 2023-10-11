import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { get } from "lodash";
import r from "../../../../utils/ajax";
import token from "../../../../utils/ajax/token";
import { changeUserInfo } from "../../../../store/reducers/common/user";

const Logout = () => {
  const [isLogged, setIsLogged] = useState(useSelector(s => s.userInfo.isLogged));

  useEffect(() => {
    if (isLogged) {
      r.post("/api/logout").then(res => {
        if (!get(res, "status", false)) {
          return;
        }

        token.clearToken()
        changeUserInfo(null)
        setIsLogged(false);
      })
    }

    return () => {};
  }, [isLogged]);

  return null
};

export default Logout;