import CloseIcon from "@mui/icons-material/Close";
import { AppBar, Box, Container, Dialog, Theme, Toolbar, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React from "react";
import WebMobileBtnIcon from "../WebMobile/WebMobileBtnIcon";

interface IFullScreenDialog {
  title: string;
  isOpen: boolean;
  isCloseBtnSuccess: boolean;
  children: React.ReactNode;
  onCloseClick: (e?: any) => void;
  theme: Theme;
}

const FullScreenDialog = ({
                            title,
                            children,
                            isOpen,
                            onCloseClick,
                            theme,
                            isCloseBtnSuccess = false
}: IFullScreenDialog) => {
  const { t } = useLaravelReactI18n();

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={onCloseClick}
    >
      <ThemeProvider theme={theme}>
        <AppBar sx={{ position: "relative" }} color="primary">
          <Toolbar>
            <Typography
              sx={{ ml: 2, flex: 1 }}
              variant="h3"
              color="white"
            >
              {title}
            </Typography>

            <WebMobileBtnIcon
              color={isCloseBtnSuccess ? "success" : "primary"}
              size="large"
              title={t("Закрыть")}
              onClick={onCloseClick}
              icon={<CloseIcon/>}
            />
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <Container component="main" sx={{ pt: 3 }}>
        <Box sx={{ width: "100%" }}>
          {children}
        </Box>
      </Container>
    </Dialog>
  );
};

export default FullScreenDialog;