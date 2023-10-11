import { useDispatch, useSelector } from "react-redux";
import Snackbar from './Snackbar';
import { clear } from "../../../store/reducers/snackbar/warning-snackbar"
import MuiAlert from "@mui/material/Alert";
import React from "react";

const WarningSnackbar = () => {
  const messageObj = useSelector(state => state.warningSnackbar)
  const d = useDispatch();
  const isOpen = messageObj.value.trim() !== ""
  const autoHideMs = messageObj.duration || 5000
  const elevation = 6;
  const _clear = () => d(clear());

  return (
    <Snackbar
      isOpen={isOpen}
      autoHideMs={autoHideMs}
      onClose={clear}
    >
      <MuiAlert
        elevation={elevation}
        variant="filled"
        severity="warning"
        onClose={_clear}
      >
        {messageObj.value}
      </MuiAlert>
    </Snackbar>
  );
}

export default WarningSnackbar
