import { Grid, Link, Typography } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { privacyURL } from "../../../../routes/Components/SpecialRoutes";
import { getUrl } from "../../../../utils/funcs/url";
import CurrenSiteLink from "../../Gui/Link/CurrenSiteLink";

interface ITermsOfUseCookie {
  onChangeDocument?: (e: React.SyntheticEvent) => void;
}

const TermsOfUseCookie = ({ onChangeDocument }: ITermsOfUseCookie) => {
  const { t } = useLaravelReactI18n();

  return (
    <Grid
      container
      direction="column"
      spacing={2}
    >
      {/* @ts-ignore */}
      <Grid item align="center" sx={{ mb: 1 }}>
        <Typography variant="h2">
          {t("Условия использования файлов cookie")}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2">
          {t("На сайте")}
          &nbsp;<CurrenSiteLink/>&nbsp;
          {t("и его поддоменах (далее — Сайт) используются файлы cookie. Файлы cookie — это небольшие текстовые файлы, которые после просмотра Пользователем фрагментов Сайта сохраняются на его устройстве.")}
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="body2">
          {t("Использование файлов cookie позволяет :operator (далее - Оператор) контролировать доступность Сайта, анализировать данные, а также понимать, как развивать оказываемые услуги.", {
            operator: t("Дмитриеву Николаю Дмитриевичу")
          })}
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {t("На Сайте используются следующие типы файлов cookie:")}
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {t("1. Технические файлы cookie")}
        </Typography>

        <Typography variant="body2" sx={{ ml: 2.5 }}>
          {t("Они необходимы для корректной работы Сайта и вспомогательных сервисов. Такие файлы cookie позволяют определять аппаратное и программное обеспечение устройства Пользователя; выявлять ошибки при работе Сайта; тестировать новые функции для повышения производительности Сайта.")}
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {t("2. Файлы cookie для аутентификации")}
        </Typography>

        <Typography variant="body2" sx={{ ml: 2.5 }}>
          {t("Они необходимы, чтобы запоминать Пользователей. Благодаря таким файлам Пользователю при новом посещении Сайта не нужно заново вводить авторизационные данные.")}
        </Typography>

      </Grid>

      <Grid item>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {t("3. Аналитические файлы cookie")}
        </Typography>

        <Typography variant="body2" sx={{ ml: 2.5 }}>
          {t("Они позволяют подсчитывать количество Пользователей Сайта; определять, какие действия Пользователь совершает на Сайте (посещаемые страницы, время и количество просмотренных страниц). Сбор аналитических данных осуществляется через партнеров, в том числе Google Analytics, Yandex Metrika.")}
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {t("4. Рекламные файлы cookie")}
        </Typography>


        <Typography variant="body2" sx={{ ml: 2.5, mb: 2 }}>
          {t("Они помогают анализировать, из каких источников Пользователь перешел на Сайт, а также персонализировать рекламные сообщения. Срок хранения файлов cookie зависит от конкретного типа, но в любом случае не превышает срока, необходимого")}
          &nbsp;
          {onChangeDocument ? (
            <Typography
              variant="body2"
              sx={{ mb: 2 }}
              underline="hover"
              color={"primary"}
              component={Link}
              href={getUrl(privacyURL)}
              onClick={onChangeDocument}
            >
              {t("для достижения целей обработки персональных данных.")}
            </Typography>
          ) : t("для достижения целей обработки персональных данных.")}
        </Typography>

        <Typography variant="body2" sx={{ ml: 2.5 }}>
          {t("При посещении Сайта Оператор запрашивает согласие Пользователя на использование файлов cookie.")}
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="body2">
          {t("Для прекращения обработки файлов cookie Пользователь может изменить настройки используемых браузеров на всех устройствах (компьютер, мобильные устройства).")}
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="body2">
          {t("При отказе от использования файлов cookie отдельные функции Сайта могут быть недоступными, что повлияет на возможность использования Сайта.")}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default TermsOfUseCookie;