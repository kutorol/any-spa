import { createSnackbarReduce } from "./ok-snackbar";

export const warningSnackbar = createSnackbarReduce("warningSnackbar");

// Action creators are generated for each case reducer function
export const { set, clear } = warningSnackbar.actions;

export default warningSnackbar.reducer;
