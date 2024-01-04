import MuiAlert from "@mui/material/Alert";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "../../../store/reducers/snackbar/ok-snackbar";
import { RootState } from "../../../store/store";
import Snackbar from "./Snackbar";

const SuccessSnackbar = () => {
  // @ts-ignore
  const messageObj = useSelector((s: RootState) => s.successSnackbar);
  const d = useDispatch();
  const isOpen = messageObj.value.trim() !== "";
  const autoHideMs = messageObj.duration || 5000;
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
        <div dangerouslySetInnerHTML={{ __html: messageObj.value }}/>
      </MuiAlert>
    </Snackbar>
  );
};

export default SuccessSnackbar;
