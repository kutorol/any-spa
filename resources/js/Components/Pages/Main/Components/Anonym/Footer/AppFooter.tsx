import { Container, Grid } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { cookieURL, privacyURL, termOfUseURL } from "../../../../../../routes/Components/SpecialRoutes";
import { toggleSupportTech } from "../../../../../../utils/funcs/event";
import { getUrl } from "../../../../../../utils/funcs/url";
import Typography from "../Typography";
import FooterIconCopyright from "./FooterIconCopyright";
import LinkList from "./LinkList";
import SocialBlock from "./SocialBlock";

const AppFooter = () => {
  const { t } = useLaravelReactI18n();
  const sx1 = { display: "flex", bgcolor: "secondary.light" };
  const containerSx = { my: 8, display: "flex" };

  return (
    <Typography component="footer" sx={sx1}>
      <Container sx={containerSx}>
        <Grid container spacing={5}>
          <Grid item xs={6} md={3}>
            <LinkList
              title={t("Сервисы")}
              links={[
                { title: t("Новости сайта"), url: getUrl("/news") },
                { title: t("Техническая поддержка"), url: getUrl("/support-tech"), onClick: toggleSupportTech }
              ]}
            />
          </Grid>

          <Grid item xs={6} md={3}>
            <LinkList
              title={t("Соглашения")}
              links={[
                { title: t("Использование cookie"), url: getUrl(cookieURL) },
                { title: t("Персональные данные"), url: getUrl(privacyURL) },
                { title: t("Лицензионное соглашение"), url: getUrl(termOfUseURL) }
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <SocialBlock/>
          </Grid>

          <Grid item xs={12}>
            <FooterIconCopyright/>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
};

export default AppFooter;