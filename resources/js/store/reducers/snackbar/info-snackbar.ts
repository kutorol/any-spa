import { createSnackbarReduce } from "./ok-snackbar";

export const infoSnackbar = createSnackbarReduce("infoSnackbar");

// Action creators are generated for each case reducer function
export const { set, clear } = infoSnackbar.actions;

export default infoSnackbar.reducer;
