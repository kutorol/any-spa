import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Badge, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../../store/store";
import { dateDiff, humanDate } from "../../../../utils/funcs/date";
import { toggleLoginPopup } from "../../../../utils/funcs/event";
import { IShortNewsInterface } from "../../../../utils/interfaces/news";
import { IUserInterface } from "../../../../utils/interfaces/user";
import ShareIconBlock from "../Block/ShareIconBlock";

interface ICustomCard {
  prefixURL: string;
  item: IShortNewsInterface,
  onToggleLike: (id: number) => void;
  badgeSx?: object;
}

const CustomCard = ({ item, prefixURL, onToggleLike, badgeSx = {} }: ICustomCard) => {
  const theme = useTheme();
  const { t } = useLaravelReactI18n();
  const user: IUserInterface = useSelector((s: RootState) => s.userInfo.user);

  const daysFromCreated = dateDiff("days", item.created_at);
  const sx = {
    "& a": {
      textDecoration: "none",
      color: "inherit"
    },
    "& a:hover": {
      textDecoration: "underline"
    }
  };

  const fullLink = `${prefixURL}/${item.id}/${item.slug}`;

  const _onToggleLike = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    if (user.uid === 0) {
      return toggleLoginPopup();
    }

    onToggleLike(item.id);
  };

  const likeColor = item.is_liked ? "secondary" : "default";

  const title = item.title.length > 26 ? item.title.slice(0, 26) + "..." : item.title;
  const sxTitle = {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.fontWeightRegular
  };

  return (
    <Badge
      component="div"
      sx={{
        "& .MuiPaper-root + .MuiBadge-badge": {
          right: "auto"
        },
        ...badgeSx
      }}
      badgeContent={t("Новая")}
      color="error"
      invisible={daysFromCreated === null || daysFromCreated > 2}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          sx={sx}
          disableTypography
          title={
            <Link to={fullLink}>
              <Typography
                variant="h2"
                color="inherit"
                sx={sxTitle}
              >
                {title}
              </Typography>
            </Link>
          }
          subheader={
            <Typography variant="subtitle2">
              {humanDate(item.created_at)}
            </Typography>
          }
        />

        <Link to={fullLink}>
          <CardMedia
            component="img"
            height="190"
            image={item.image}
            alt={item.title}
          />
        </Link>

        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            gutterBottom
            sx={{
              maxHeight: 90,
              overflow: "hidden"
            }}
          >
            {item.short_text}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton
            color={likeColor}
            sx={{ mr: 1 }}
            onClick={_onToggleLike}
          >
            <Badge
              max={99999}
              badgeContent={item.likes}
              color={likeColor}
            >
              <FavoriteIcon/>
            </Badge>
          </IconButton>

          <ShareIconBlock
            title={item.title}
            img={item.image}
            shareLink={fullLink}
            desc={item.short_text}
          />

          <IconButton disabled sx={{ marginLeft: "auto" }}>
            <Badge max={99999} badgeContent={item.views} showZero color="default">
              <VisibilityIcon/>
            </Badge>
          </IconButton>

        </CardActions>
      </Card>
    </Badge>
  );
};

export default CustomCard;