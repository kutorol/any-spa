import { Box, Card, Grid, Typography } from "@mui/material";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import { useTheme } from "@mui/material/styles";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { cloneDeep } from "lodash";
// @ts-ignore
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { ISeoFields } from "../../../store/reducers/func/common/seo";
import { RootState } from "../../../store/store";
import { ELanguages } from "../../../utils/enums/user";
import { getUrl } from "../../../utils/funcs/url";
import { IBreadcrumbsUrlVal, IResponseFuncBreadcrumbs } from "../../../utils/interfaces/breadcrumbs";
import { IUserInterface } from "../../../utils/interfaces/user";
import Icon from "../Gui/Common/Icon";
import breadcrumbsUrls from "./breadcrumbs-urls";

const linkSX = {
  display: "flex",
  color: "grey.900",
  textDecoration: "none",
  alignContent: "center",
  alignItems: "center"
};


interface IBreadcrumbs {
  [k: string]: any;
}

const Breadcrumbs = ({ ...others }: IBreadcrumbs) => {
  const theme = useTheme();
  const loc = useLocation();

  const params = useParams();
  const { t } = useLaravelReactI18n();
  const { user, seo } = useSelector((s: RootState): { user: IUserInterface, seo: ISeoFields } => ({
    user: s.userInfo.user,
    seo: s.seo
  }));

  const cardSx = {
    marginBottom: theme.spacing(3),
    border: "1px solid",
    borderColor: theme.palette.secondary[200] + 75,
    background: theme.palette.background.default
  };

  const boxSx = { p: 2, pl: 2 };
  const title = seo.h1 || seo.title;
  const titleSx = {
    ...theme.typography.h3,
    fontWeight: 500
  };
  const breadcrumbsSx = { "& .MuiBreadcrumbs-separator": { width: 16, ml: 1.25, mr: 1.25 } };
  const maxItems = 6;

  const iconStyle = {
    marginRight: theme.spacing(0.75),
    marginTop: `-${theme.spacing(0.25)}`,
    width: "1rem",
    height: "1rem",
    color: theme.palette.secondary.main
  };

  if (user.uid > 0 && !user.verified_email) {
    return null;
  }

  // @ts-ignore
  const allLangs = Object.values(ELanguages).map((l: ELanguages) => l.toString().toLowerCase()).join("|");
  // @ts-ignore
  const foundPath = Object.keys(breadcrumbsUrls).find(re => {
    const reg = new RegExp(`^\/(${allLangs})\/${re}$`, "gi");
    return reg.test(loc.pathname);
  });

  if (!foundPath) {
    return null;
  }

  const otherBreadcrumbs = [];

  const setComputesBreadcrumbs = (isLast: boolean, sx: object, v: IBreadcrumbsUrlVal, url: string, nextBreadcrumbs: IResponseFuncBreadcrumbs[] | null): void => {
    if (nextBreadcrumbs === null) {
      return;
    }

    nextBreadcrumbs.map((bc: IResponseFuncBreadcrumbs, j: number) => {
      const sx2 = cloneDeep(sx);
      // если не последняя хлебная крошка
      if (isLast && (j + 1) !== nextBreadcrumbs.length) {
        // нужно удалить серый цвет
        delete sx2.color;
      }

      let icon = null;
      if (bc.icon) {
        icon = bc.icon;
      } else if (v.icon) {
        icon = v.icon;
      }

      otherBreadcrumbs.push(
        <Typography
          key={`inner_${j}`}
          component={Link}
          to={bc.url ? getUrl(bc.url) : url}
          variant="subtitle1"
          sx={sx2}
        >
          {icon && <Icon tablerIcon={icon} style={iconStyle}/>}
          {t(bc.title, bc.titleLangParams)}
        </Typography>
      );
    });
  };

  const getTitle = (v: IBreadcrumbsUrlVal): string => {
    if (typeof v.title == "function") {
      const computeTitle = v.title(loc, params);
      return t(computeTitle.title, computeTitle.titleLangParams);
    }

    return t(v.title);
  };

  breadcrumbsUrls[foundPath].map((v: IBreadcrumbsUrlVal, i) => {
    const isLast = (i + 1) === breadcrumbsUrls[foundPath].length;

    let url = `${loc.pathname}${loc.search}`;

    if (!isLast) {
      const r = new RegExp(v.url, "gi");
      const findUrl = r.exec(url);
      if (findUrl && typeof findUrl[0] !== "undefined") {
        url = findUrl[0];
      } else {
        url = v.url;
      }

      url = getUrl(url);
    }

    const k = `${foundPath}_${i}`;
    const sx = {
      ...linkSX,
      ...(isLast ? { color: "grey.500" } : {})
    };

    if (typeof v.breadcrumbs === "function") {
      setComputesBreadcrumbs(isLast, sx, v, url, v.breadcrumbs(loc, params));
      return;
    }


    otherBreadcrumbs.push(
      <Typography
        key={k}
        component={Link}
        to={url}
        variant="subtitle1"
        sx={sx}
      >
        {v.icon && <Icon tablerIcon={v.icon} style={iconStyle}/>}
        {getTitle(v)}
      </Typography>
    );
  });

  const breadcrumbsHome = (
    <Typography component={Link} to={getUrl("/")} color="inherit" variant="subtitle1" sx={linkSX}>
      <Icon tablerIcon="IconHome" style={iconStyle}/>
      {t("Главная")}
    </Typography>
  );

  return (
    <Card sx={cardSx} {...others}>
      <Box sx={boxSx}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Grid item>
            <Typography variant="h1" sx={titleSx}>
              {title}
            </Typography>
          </Grid>

          <Grid item>
            <MuiBreadcrumbs
              sx={breadcrumbsSx}
              separator={<Icon tablerIcon="IconChevronRight"/>}
              maxItems={maxItems}
            >
              {breadcrumbsHome}
              {otherBreadcrumbs}
            </MuiBreadcrumbs>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default Breadcrumbs;