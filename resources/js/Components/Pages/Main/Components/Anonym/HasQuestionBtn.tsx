import { Box, Button, Container } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { borderRadius } from "../../../../../store/constant";
import { toggleSupportTech } from "../../../../../utils/funcs/event";
import Typography from "./Typography";

const HasQuestionBtn = () => {
  const { t } = useLaravelReactI18n();
  const sxContainer = { display: "flex", flexDirection: "column", alignItems: "center", my: 9 };
  const sxBtn = {
    border: "4px solid currentColor",
    borderRadius: borderRadius,
    height: "auto",
    py: 2,
    px: 5
  };

  const sxTitle = { color: "secondary.main", fontSize: 26, textTransform: "uppercase" };
  const sxImg = { width: 60 };

  return (
    <Container
      component="section"
      sx={sxContainer}
    >
      <Button
        color="secondary"
        sx={sxBtn}
        onClick={toggleSupportTech}
      >
        <Typography variant="h4" component="span" sx={sxTitle}>
          {t("Остались вопросы? Жми!")}
        </Typography>
      </Button>

      <Typography variant="subtitle1" sx={{ my: 3, fontSize: 18 }}>
        {t("Мы обязательно поможем вам")}
      </Typography>

      <Box
        component="img"
        src="/assets/svg/landing/anonym/buoy.svg"
        alt="Buoy"
        sx={sxImg}
      />
    </Container>
  );
};

export default HasQuestionBtn;