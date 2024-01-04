import MuiAlert from "@mui/material/Alert";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "../../../store/reducers/snackbar/warning-snackbar";
import { RootState } from "../../../store/store";
import Snackbar from "./Snackbar";

const WarningSnackbar = () => {
  // @ts-ignore
  const messageObj = useSelector((s: RootState) => s.warningSnackbar);
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
        <div dangerouslySetInnerHTML={{ __html: messageObj.value }}/>
      </MuiAlert>
    </Snackbar>
  );
};

export default WarningSnackbar;
