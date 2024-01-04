import { Dialog, DialogTitle } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useMatch from "../../../../hooks/useMatch";
import { RootState } from "../../../../store/store";
import { TOGGLE_REGISTER_POPUP_EVENT } from "../../../../utils/funcs/event";
import Btn from "../../../Common/Gui/Btn/Btn";
import Icon from "../../../Common/Gui/Common/Icon";
import Register from "../../../Pages/Auth/Register/Register";

const RegisterPopup = () => {
  const [isOpenRegister, setIsOpenRegister] = useState<boolean>(false);
  const { matchDownMd } = useMatch();
  const isLogged: boolean = useSelector((s: RootState) => s.userInfo.isLogged);

  const toggleRegister = (e?: React.SyntheticEvent): void => {
    if (isLogged) {
      return;
    }

    e && e.preventDefault();
    setIsOpenRegister(!isOpenRegister);
  };

  const onEvenToggleRegisterDialog = e => toggleRegister(e);
  useEffect(() => {
    document.addEventListener(TOGGLE_REGISTER_POPUP_EVENT, onEvenToggleRegisterDialog);
    return () => document.removeEventListener(TOGGLE_REGISTER_POPUP_EVENT, onEvenToggleRegisterDialog);
  }, [isLogged]);

  if (isLogged) {
    return null;
  }

  return (
    <Dialog
      fullScreen={matchDownMd}
      onClose={toggleRegister}
      open={isOpenRegister}
    >
      {matchDownMd && (
        <DialogTitle align={"right"} sx={{ p: 0, pt: 1 }}>
          <Btn
            onClick={toggleRegister}
            icon={<Icon tablerIcon={"IconX"}/>}
          />
        </DialogTitle>
      )}

      <Register isLanding/>
    </Dialog>
  );
};

export default RegisterPopup;