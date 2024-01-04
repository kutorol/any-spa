import { AppBar, Container, Grid, Toolbar, Typography } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { Link } from "react-router-dom";
import { getUrl } from "../../../../utils/funcs/url";
import Btn from "../../../Common/Gui/Btn/Btn";
import Icon from "../../../Common/Gui/Common/Icon";
import TermsOfUseCookie from "../../../Common/Utils/Cookie/TermsOfUseCookie";
import DynamicImportLocaleComponent from "../../../Common/Utils/DynamicImportLocaleComponent";

const TermOfUsePrivatePolicy = () => {
  const { t } = useLaravelReactI18n();
  const titleBtnBack = t("На главную страницу");

  return (
    <Grid container>
      <Grid item xs={12}>
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
              {t("Лицензионное соглашение")}
            </Typography>

            <Btn
              color={"inherit"}
              variant={"text"}
              size={"large"}
              icon={<Icon tablerIcon="IconHome"/>}
              webTitle={titleBtnBack}
              mobTitle={t("На главную")}
              component={Link}
              to={getUrl("/")}
            />
          </Toolbar>
        </AppBar>

        <DynamicImportLocaleComponent
          pathToFiles="../../../Components/Pages/Special/TermOfUse/Locales"
          nameFile="TermOfUse"
        />

        <Container component="main" sx={{ p: 4, pr: 1.5 }}>
          <Grid container spacing={0} direction="column">
            <DynamicImportLocaleComponent
              pathToFiles="../../Common/Utils/Cookie/Locales"
              nameFile="DocumentAgreement"
            />
          </Grid>
        </Container>

        <Container component="main" sx={{ p: 4, pr: 1.5 }}>
          <Grid container spacing={2}>
            <TermsOfUseCookie/>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
};

export default TermOfUsePrivatePolicy;