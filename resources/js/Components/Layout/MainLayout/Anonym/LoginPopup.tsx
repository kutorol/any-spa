import { Dialog, DialogTitle } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useMatch from "../../../../hooks/useMatch";
import { RootState } from "../../../../store/store";
import { TOGGLE_LOGIN_POPUP_EVENT } from "../../../../utils/funcs/event";
import Btn from "../../../Common/Gui/Btn/Btn";
import Icon from "../../../Common/Gui/Common/Icon";
import Login from "../../../Pages/Auth/Login/Login";

const LoginPopup = () => {
  const [isOpenLogin, setIsOpenLogin] = useState<boolean>(false);
  const { matchDownMd } = useMatch();
  const isLogged: boolean = useSelector((s: RootState) => s.userInfo.isLogged);

  const toggleLogin = (e?: React.SyntheticEvent): void => {
    if (isLogged) {
      return;
    }

    e && e.preventDefault();
    setIsOpenLogin(!isOpenLogin);
  };

  const onEvenToggleLoginDialog = e => toggleLogin(e);
  useEffect(() => {
    document.addEventListener(TOGGLE_LOGIN_POPUP_EVENT, onEvenToggleLoginDialog);
    return () => document.removeEventListener(TOGGLE_LOGIN_POPUP_EVENT, onEvenToggleLoginDialog);
  }, [isLogged]);

  if (isLogged) {
    return null;
  }

  return (
    <Dialog
      fullScreen={matchDownMd}
      onClose={toggleLogin}
      open={isOpenLogin}
    >
      {matchDownMd && (
        <DialogTitle align={"right"} sx={{ p: 0, pt: 1 }}>
          <Btn
            onClick={toggleLogin}
            icon={<Icon tablerIcon={"IconX"}/>}
          />
        </DialogTitle>
      )}

      <Login isLanding/>
    </Dialog>
  );
};

export default LoginPopup;