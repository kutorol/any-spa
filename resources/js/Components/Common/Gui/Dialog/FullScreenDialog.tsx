import { AppBar, Box, Container, Dialog, Theme, Toolbar, Typography } from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React, { ForwardedRef } from "react";
import Btn from "../Btn/Btn";
import Icon from "../Common/Icon";

interface IFullScreenDialog {
  title: string;
  isOpen: boolean;
  isCloseBtnSuccess?: boolean;
  children: React.ReactNode;
  onCloseClick: (e?: any, reason?: "escapeKeyDown" | "backdropClick") => void;
  theme?: Theme;
  refDiv?: ForwardedRef<any>;
}

const FullScreenDialog = ({
                            title,
                            children,
                            isOpen,
                            onCloseClick,
                            theme,
                            isCloseBtnSuccess = false,
                            refDiv
                          }: IFullScreenDialog) => {
  const { t } = useLaravelReactI18n();
  theme = theme || useTheme();

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={onCloseClick}
    >
      {/* refDiv нужен для скроллинга вверх страницы, если ее изменяем*/}
      <div ref={refDiv}>
        <ThemeProvider theme={theme}>
          <AppBar
            color="secondary"
            position="sticky"
          >
            <Toolbar>
              <Typography
                sx={{ ml: 2, flex: 1 }}
                variant="h3"
                color="white"
              >
                {title}
              </Typography>

              <Btn
                color={isCloseBtnSuccess ? "success" : "inherit"}
                size={"large"}
                webTitle={t("Закрыть")}
                icon={<Icon tablerIcon="IconX"/>}
                onClick={onCloseClick}
              />
            </Toolbar>
          </AppBar>
        </ThemeProvider>
        <Container component="main" sx={{ pt: 3 }}>
          <Box sx={{ width: "100%" }}>
            {children}
          </Box>
        </Container>
      </div>
    </Dialog>
  );
};

export default FullScreenDialog;