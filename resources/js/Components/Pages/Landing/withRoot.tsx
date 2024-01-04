import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import * as React from "react";
// import theme from './theme';

export default function withRoot<P extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P>
) {
  function WithRoot(props: P) {
    const theme = useTheme();

    return (
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline/>
        <Component {...props} />
      </ThemeProvider>
    );
  }

  return WithRoot;
}