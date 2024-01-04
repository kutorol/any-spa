import { AppBar as MuiAppBar, Link } from "@mui/material";
import Box from "@mui/material/Box";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { Link as LinkRouter } from "react-router-dom";
import { SiteName } from "../../../store/constant";
import { getUrl } from "../../../utils/funcs/url";
import Toolbar from "./Toolbar";

const rightLink = {
  fontSize: 16,
  ml: 3,
  textTransform: "uppercase"
};

interface IAppBar {
  toggleLogin: (e: React.SyntheticEvent) => void;
  toggleRegister: (e: React.SyntheticEvent) => void;
}

function AppBar({ toggleLogin, toggleRegister }: IAppBar) {
  const { t } = useLaravelReactI18n();
  return (
    <div>
      <MuiAppBar
        elevation={0}
        position="fixed"
        color="secondary"
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ flex: 1 }}/>
          <Link
            component={LinkRouter}
            variant="h6"
            underline="none"
            color="inherit"
            to={getUrl("/")}
            sx={{ fontSize: 24, textTransform: "uppercase" }}
          >
            {SiteName}
          </Link>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Link
              component={LinkRouter}
              color="inherit"
              variant="h6"
              underline="hover"
              to="/login"
              sx={{ ...rightLink }}
              onClick={toggleLogin}
            >
              {t("Войти")}
            </Link>
            <Link
              color="inherit"
              component={LinkRouter}
              variant="h6"
              underline="hover"
              to="/register"
              sx={{ ...rightLink }}
              onClick={toggleRegister}
            >
              {t("Регистрация")}
            </Link>
          </Box>
        </Toolbar>
      </MuiAppBar>
      <Toolbar/>
    </div>
  );
}

export default AppBar;