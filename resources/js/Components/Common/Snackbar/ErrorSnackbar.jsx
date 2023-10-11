import { useDispatch, useSelector } from "react-redux";
import { clear } from "../../../store/reducers/snackbar/error-snackbar";
import Snackbar from "./Snackbar";
import MuiAlert from "@mui/material/Alert";
import React from "react";

const ErrorSnackbar = () => {
  const errorsObj = useSelector(state => state.errSnackbar)

  const isOpen = Array.isArray(errorsObj.errors)
  const autoHideMs = errorsObj.duration || 5000
  const elevation = 6;
  const d = useDispatch();

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
        severity="error"
        onClose={_clear}
      >
        <div>
          <div>Произошла ошибка запроса</div>

          <ul>
            {errorsObj.errors && errorsObj.errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      </MuiAlert>
    </Snackbar>
  );
}

export default ErrorSnackbar
