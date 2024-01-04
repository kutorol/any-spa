import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { Link } from "react-router-dom";
import { borderRadius } from "../../../../../store/constant";
import { toggleRegisterPopup } from "../../../../../utils/funcs/event";
import { getUrl } from "../../../../../utils/funcs/url";
import Button from "./Button";
import Typography from "./Typography";

const FreeRegister = () => {
  const { t } = useLaravelReactI18n();
  const theme = useTheme();

  const sxContainer = { mt: 10, display: "flex" };
  const sxBox = {
    display: "flex",
    justifyContent: "center",
    bgcolor: "warning.dark",
    py: 8,
    px: 3,
    borderRadius: borderRadius
  };

  const sxBox2 = { maxWidth: 400 };
  const sxTitle = { fontSize: 48, textTransform: "uppercase" };
  const sxDesc = { fontSize: 20, fontWeight: theme.typography.fontWeightLight };

  const sxBgImg = {
    position: "absolute",
    top: -67,
    left: -67,
    right: 0,
    bottom: 0,
    width: "100%",
    background: "url(/assets/images/landing/anonym/bg_dots.png)"
  };

  const sxImg = {
    borderRadius: borderRadius,
    position: "absolute",
    top: -28,
    left: -28,
    right: 0,
    bottom: 0,
    width: "100%",
    maxWidth: 600
  };

  const sxGrid = { display: { md: "block", xs: "none" }, position: "relative" };

  return (
    <Container component="section" sx={sxContainer}>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Box sx={sxBox}>
            <Box sx={sxBox2}>
              <Typography variant="h2" component="h2" sx={sxTitle} gutterBottom>
                {t("Не платите")}
              </Typography>

              <Typography variant="h5" sx={sxDesc}>
                {t("Первые зарегистрированные администраторы получат доступ ко всем функциям сервиса бесплатно до конца работы сервиса")}
              </Typography>

              <br/>

              <Button
                component={Link}
                color="secondary"
                variant="contained"
                fullWidth
                sx={{ borderRadius: borderRadius }}
                to={getUrl("/register")}
                onClick={toggleRegisterPopup}
              >
                {t("Создать личный кабинет")}
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={sxGrid}
        >
          <Box sx={sxBgImg}/>

          <Box
            component="img"
            src="/assets/images/landing/anonym/free_register.jpg"
            alt={t("Бесплатная регистрация")}
            sx={sxImg}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default FreeRegister;