import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
import HomeIcon from "@mui/icons-material/Home";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import { Box, Card, Divider, Grid, Typography } from "@mui/material";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import { useTheme } from "@mui/material/styles";
import { get } from "lodash";
import { IconBrandChrome, IconHelp, IconTallymark1 } from "@tabler/icons-react";

// @ts-ignore
import PropTypes from "prop-types";
// @ts-ignore
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import config from "../../../store/config";
import { gridSpacing } from "../../../store/constant";

const linkSX = {
  display: "flex",
  color: "grey.900",
  textDecoration: "none",
  alignContent: "center",
  alignItems: "center"
};

// ==============================|| BREADCRUMBS ||============================== //

const Breadcrumbs = ({
 card,
 divider,
 icon,
 icons,
 maxItems,
 menuItems,
 rightAlign,
 separator,
 title,
 titleBottom,
 ...others
}) => {
  const theme = useTheme();

  const iconStyle = {
    marginRight: theme.spacing(0.75),
    marginTop: `-${theme.spacing(0.25)}`,
    width: "1rem",
    height: "1rem",
    color: theme.palette.secondary.main
  };

  const [main, setMain] = useState({
    id: "sample-docs-roadmap",
    type: "collapse",
    title: "some",
    children: [
      {
        id: "sample-page",
        title: "Sample Page",
        type: "item",
        url: "/sample-page",
        icon: IconBrandChrome,
        breadcrumbs: false
      },
      {
        id: "documentation",
        title: "Documentation",
        type: "item",
        url: "https://codedthemes.gitbook.io/berry/",
        icon: IconHelp,
        external: true,
        target: true
      }
    ]
  });
  const [item, setItem] = useState({
    id: "sample-page",
    title: "Sample Pag12e",
    type: "item",
    url: "/sample-page",
    icon: IconBrandChrome,
    breadcrumbs: true
  });

  // set active item state
  const getCollapse = (menu) => {
    if (menu.children) {
      menu.children.filter((collapse) => {
        if (collapse.type && collapse.type === "collapse") {
          getCollapse(collapse);
        } else if (collapse.type && collapse.type === "item") {
          if (document.location.pathname === config.basename + collapse.url) {
            setMain(menu);
            setItem(collapse);
          }
        }
        return false;
      });
    }
  };

  useEffect(() => {
    menuItems?.items?.map((menu) => {
      if (menu.type && menu.type === "group") {
        getCollapse(menu);
      }
      return false;
    });
  });

  // @ts-ignore
  const user = useSelector(s => s.userInfo.user);
  if (!user.verified_email) {
    return null;
  }
  // item separator
  const SeparatorIcon = separator;
  const separatorIcon = separator ? <SeparatorIcon stroke={1.5} size="1rem"/> :
    <IconTallymark1 stroke={1.5} size="1rem"/>;

  let mainContent;
  let itemContent;
  let breadcrumbContent = <Typography/>;
  let itemTitle = "";
  let CollapseIcon;
  let ItemIcon;


  // collapse item
  if (main && main.type === "collapse") {
    CollapseIcon = get(main, "icon", AccountTreeTwoToneIcon);
    mainContent = (
      <Typography component={Link} to="#" variant="subtitle1" sx={linkSX}>
        {icons && <CollapseIcon style={iconStyle}/>}
        {main.title}
      </Typography>
    );
  }


  // items
  if (item && item.type === "item") {
    itemTitle = item.title;

    ItemIcon = item.icon ? item.icon : AccountTreeTwoToneIcon;
    itemContent = (
      <Typography
        variant="subtitle1"
        sx={{
          display: "flex",
          textDecoration: "none",
          alignContent: "center",
          alignItems: "center",
          color: "grey.500"
        }}
      >
        {icons && <ItemIcon style={iconStyle}/>}
        {itemTitle}
      </Typography>
    );

    // main
    if (item.breadcrumbs !== false) {
      breadcrumbContent = (
        <Card
          sx={{
            marginBottom: card === false ? 0 : theme.spacing(gridSpacing),
            border: card === false ? "none" : "1px solid",
            borderColor: theme.palette.primary[ 200 ] + 75,
            background: card === false ? "transparent" : theme.palette.background.default
          }}
          {...others}
        >
          <Box sx={{ p: 2, pl: card === false ? 0 : 2 }}>
            <Grid
              container
              direction={rightAlign ? "row" : "column"}
              justifyContent={rightAlign ? "space-between" : "flex-start"}
              alignItems={rightAlign ? "center" : "flex-start"}
              spacing={1}
            >
              {title && !titleBottom && (
                <Grid item>
                  <Typography variant="h3" sx={{ fontWeight: 500 }}>
                    {item.title}
                  </Typography>
                </Grid>
              )}
              <Grid item>
                <MuiBreadcrumbs
                  sx={{ "& .MuiBreadcrumbs-separator": { width: 16, ml: 1.25, mr: 1.25 } }}
                  aria-label="breadcrumb"
                  maxItems={maxItems || 8}
                  separator={separatorIcon}
                >
                  <Typography component={Link} to="/" color="inherit" variant="subtitle1" sx={linkSX}>
                    {icons && <HomeTwoToneIcon sx={iconStyle}/>}
                    {icon && <HomeIcon sx={{ ...iconStyle, mr: 0 }}/>}
                    {!icon && "Dashboard"}
                  </Typography>
                  {mainContent}
                  {itemContent}
                </MuiBreadcrumbs>
              </Grid>
              {title && titleBottom && (
                <Grid item>
                  <Typography variant="h3" sx={{ fontWeight: 500 }}>
                    {item.title}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
          {card === false && divider !== false &&
            <Divider sx={{ borderColor: theme.palette.primary.main, mb: gridSpacing }}/>}
        </Card>
      );
    }
  }

  return breadcrumbContent;
};

Breadcrumbs.propTypes = {
  card: PropTypes.bool,
  divider: PropTypes.bool,
  icon: PropTypes.bool,
  icons: PropTypes.bool,
  maxItems: PropTypes.number,
  menuItems: PropTypes.object,
  rightAlign: PropTypes.bool,
  separator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  title: PropTypes.bool,
  titleBottom: PropTypes.bool
};

export default Breadcrumbs;