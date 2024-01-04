import { Box, Container, Typography } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// @ts-ignore
import notFound404Svg from "../../../../assets/images/svg/common/404/404.svg";
import Logo from "../../../../assets/images/svg/Components/Logo";
import { NotVerifyEmailURL } from "../../../store/constant";
import { RootState } from "../../../store/store";
import { getUrl } from "../../../utils/funcs/url";
import Btn from "../../Common/Gui/Btn/Btn";
import Icon from "../../Common/Gui/Common/Icon";

const NotFoundPage = () => {
  const { t } = useLaravelReactI18n();

  const { isLogged, verifiedEmail } = useSelector((s: RootState) => ({
    verifiedEmail: s.userInfo.user.verified_email,
    isLogged: s.userInfo.isLogged
  }));

  let to = "/";
  if (isLogged && !verifiedEmail) {
    to = NotVerifyEmailURL;
  }
  to = getUrl(to);

  const titleBtn = t("На главную");

  const boxSx = {
    top: 0,
    left: 0,
    width: 1,
    lineHeight: 0,
    position: "fixed",
    p: (theme) => ({ xs: theme.spacing(3, 3, 0), sm: theme.spacing(5, 5, 0) })
  };

  const childBoxSx = {
    py: 12,
    maxWidth: 480,
    mx: "auto",
    display: "flex",
    minHeight: "100vh",
    textAlign: "center",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center"
  };

  const boxBtnSx = {
    mx: "auto",
    height: 260,
    my: { xs: 5, sm: 10 }
  };

  return (
    <>
      <Box component="header" sx={boxSx}>
        <Link to={to}>
          <Logo/>
        </Link>
      </Box>

      <Container>
        <Box sx={childBoxSx}>
          <Typography variant="h2" sx={{ mb: 3 }}>
            {t("Страница не найдена")}
          </Typography>

          <Typography sx={{ color: "text.secondary", mb: 0.5 }}>
            {t("Мы не можем найти ту страницу по указанному URL:")}
          </Typography>

          <Typography sx={{ color: "text.secondary", mb: 3 }}>
            {window.location.href}
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            {t("Возможно вы допустили ошибки при вводе URL?")}
          </Typography>

          <Box
            component="img"
            src={notFound404Svg}
            sx={boxBtnSx}
            alt={"404 Not Found Page"}
          />

          <Btn
            webTitle={titleBtn}
            mobTitle={titleBtn}
            size="large"
            variant="contained"
            component={Link}
            icon={<Icon tablerIcon="IconHome"/>}
            to={to}
          />
        </Box>
      </Container>
    </>
  );
};

export default NotFoundPage;