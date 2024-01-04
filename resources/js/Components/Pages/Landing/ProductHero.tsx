import { useTheme } from "@mui/material/styles";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { Link } from "react-router-dom";
import { getUrl } from "../../../utils/funcs/url";
import Button from "./Button";
import ProductHeroLayout from "./ProductHeroLayout";
import Typography from "./Typography";

const backgroundImage =
  "https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400";

interface IProductHero {
  toggleRegister: (e: React.SyntheticEvent) => void;
}

export default function ProductHero({ toggleRegister }: IProductHero) {
  const { t } = useLaravelReactI18n();
  const theme = useTheme();

  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "#7fc7d9", // Average color of the background image.
        backgroundPosition: "center"
      }}
    >
      <img
        style={{ display: "none" }}
        src={backgroundImage}
        alt="Главная картинка лендинга"
      />
      <Typography
        color="inherit"
        align="center"
        variant="h2"
        marked="center"
        sx={{
          fontWeight: theme.typography.fontWeightMedium,
          textTransform: "uppercase",
          fontSize: 42
        }}
      >
        {t("Управляй с удовольствием")}
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{
          mb: 4,
          mt: { xs: 4, sm: 10 },
          fontSize: 20,
          fontWeight: theme.typography.fontWeightLight
        }}
      >
        {t("Наслаждайтесь секретными предложениями со скидкой до -70% в лучших роскошных отелях каждое воскресенье.")}
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component={Link}
        to={getUrl("/register")}
        sx={{ minWidth: 200 }}
        onClick={toggleRegister}
      >
        {t("Регистрация")}
      </Button>
      <Typography
        variant="body2"
        color="inherit"
        sx={{ mt: 2, fontSize: 14 }}
      >
        {t("Откройте для себя этот опыт")}
      </Typography>
    </ProductHeroLayout>
  );
}