import MuiAlert from "@mui/material/Alert";
// @ts-ignore
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "../../../store/reducers/snackbar/warning-snackbar";
import Snackbar from "./Snackbar";

const WarningSnackbar = () => {
  // @ts-ignore
  const messageObj = useSelector(s => s.warningSnackbar);
  const d = useDispatch();
  const isOpen = messageObj.value.trim() !== "";
  const autoHideMs = messageObj.duration || 5000;
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
};

export default WarningSnackbar;
