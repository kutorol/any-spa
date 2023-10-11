import { useDispatch, useSelector } from "react-redux";
import Snackbar from './Snackbar';
import { clear } from "../../../store/reducers/snackbar/ok-snackbar"
import MuiAlert from "@mui/material/Alert";
import React from "react";

const SuccessSnackbar = () => {
  const messageObj = useSelector(state => state.successSnackbar)
  const d = useDispatch();
  const isOpen = messageObj.value.trim() !== ""
  const autoHideMs = messageObj.duration || 5000
  const elevation = 6;

  const _clear = () => d(clear());

  return (
    <Snackbar
      isOpen={isOpen}
      autoHideMs={autoHideMs}
      onClose={_clear}
    >
      <MuiAlert
        elevation={elevation}
        variant="filled"
        severity="success"
        onClose={_clear}
      >
        {messageObj.value}
      </MuiAlert>
    </Snackbar>
  );
}

export default SuccessSnackbar
