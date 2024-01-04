import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Avatar, AvatarGroup, Badge, Divider, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { useSelector } from "react-redux";
import useCustomCarousel from "../../../hooks/useCustomCarousel";
import useMatch from "../../../hooks/useMatch";
import useTimeToRead from "../../../hooks/useTimeToRead";
import { RootState } from "../../../store/store";
import { toggleLoginPopup } from "../../../utils/funcs/event";
import { getUrl } from "../../../utils/funcs/url";
import { IInfoNews, IShortNewsInterface } from "../../../utils/interfaces/news";
import ShareIconBlock from "../../Common/Gui/Block/ShareIconBlock";
import BackBtn from "../../Common/Gui/Btn/BackBtn";
import Btn from "../../Common/Gui/Btn/Btn";
import CustomCard from "../../Common/Gui/Card/CustomCard";
import Icon from "../../Common/Gui/Common/Icon";
import CustomMarkdown from "../../Common/Gui/Text/CustomMarkdown";
import MainCard from "../../Common/MainCard/MainCard";

interface INewsInfo {
  backTo: () => void;
  newsInfo: IInfoNews;
  onToggleLike: (id: number) => void;
  totalLikes: number;
  likes: any[];
  otherNews: any[];
}

const NewsInfo = ({ backTo, newsInfo, onToggleLike, totalLikes, likes, otherNews }: INewsInfo) => {
  const theme = useTheme();
  const { t, tChoice } = useLaravelReactI18n();
  const { matchDownMd } = useMatch();
  const likeColorBtn = newsInfo.is_liked ? "secondary" : "inherit";
  const likeColorBadge = newsInfo.is_liked ? "secondary" : "default";
  const likeVariantBtn = newsInfo.is_liked ? "contained" : "text";
  const newsMainPage = "/news";
  const isLogged: boolean = useSelector((s: RootState) => s.userInfo.isLogged);

  const slideCounts = useCustomCarousel(4, otherNews, (item: IShortNewsInterface) => {
    return (
      <CustomCard
        key={item.id}
        item={item}
        prefixURL={getUrl(newsMainPage)}
        onToggleLike={onToggleLike}
        badgeSx={{
          mr: 2
        }}
      />
    );
  });

  const onToggleLikeInfoNews = (e: React.SyntheticEvent): void => {
    e && e.preventDefault();
    if (!isLogged) {
      return toggleLoginPopup();
    }

    onToggleLike(newsInfo.id);
  };

  const timeToRead = useTimeToRead(newsInfo.text);

  return (
    <>
      <MainCard>
        <Grid container>
          {(!matchDownMd) && (
            <>
              <Grid item xs={8} order={{ xs: 3, sm: 1 }} textAlign="left">
                <BackBtn defaultBackUrl={newsMainPage} onAction={backTo}/>
              </Grid>
              <Grid item xs={4} order={{ xs: 3, sm: 1 }} textAlign="right">
                <IconButton disabled sx={{ mr: 1 }}>
                  <Badge max={Number.MAX_VALUE} badgeContent={newsInfo.views} showZero color="default">
                    <VisibilityIcon/>
                  </Badge>
                </IconButton>

                <ShareIconBlock
                  title={newsInfo.title}
                  img={newsInfo.image}
                  desc={newsInfo.short_text}
                />
              </Grid>
            </>
          )}

          {(timeToRead > 0) && (
            <Grid item xs={12} order={{ xs: 3, sm: 1 }}>
              <Typography variant="caption">
                {t("Время чтения")}: {timeToRead} {tChoice("минута|минуты|минут", timeToRead)}
              </Typography>
            </Grid>
          )}

          <Grid item xs={12} order={{ xs: 3, sm: 1 }}>
            <CustomMarkdown text={newsInfo.text}/>
          </Grid>

          <Grid xs={12} item sx={{ my: 2 }} order={{ xs: 2, sm: 2 }}>
            <Divider/>
          </Grid>

          <Grid sx={{ minHeight: 45 }} item container xs={12} alignItems="center" justifyContent={"space-between"}
                order={{ xs: 1, sm: 3 }}>
            <Stack direction="row" alignItems="center">
              <Badge
                badgeContent={newsInfo.likes}
                color={likeColorBadge}
                sx={{ mr: 3 }}
              >
                <Btn
                  webTitle={t(newsInfo.is_liked ? "В избранном" : "В избранное")}
                  color={likeColorBtn}
                  icon={<FavoriteIcon/>}
                  onClick={onToggleLikeInfoNews}
                  variant={likeVariantBtn}
                  sx={{ mr: 1, p: "6px 16px" }}
                />
              </Badge>

              {(!matchDownMd && likes.length > 0) && (
                <AvatarGroup total={totalLikes}>
                  {likes.map(userLike => (
                    <Avatar
                      key={userLike.user_id}
                      alt={userLike.name}
                      src={userLike.avatar}
                    >
                      {userLike.name.charAt(0).toUpperCase()}
                    </Avatar>
                  ))}
                </AvatarGroup>
              )}

            </Stack>

            <Stack direction="row" alignItems="center">
              {matchDownMd && (
                <IconButton disabled sx={{ mr: 1 }}>
                  <Badge max={Number.MAX_VALUE} badgeContent={newsInfo.views} showZero color="default">
                    <VisibilityIcon/>
                  </Badge>
                </IconButton>
              )}

              <ShareIconBlock
                title={newsInfo.title}
                img={newsInfo.image}
                desc={newsInfo.short_text}
                titleBtn={t("Поделиться")}
              />
            </Stack>
          </Grid>
        </Grid>
      </MainCard>


      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12} sx={{ mb: 3, mt: 1 }}>
          <Stack direction="row">
            <Typography variant="caption" sx={{ ...theme.typography.h4 }}><Icon tablerIcon="IconNotes"/></Typography>
            <Typography variant="h3" sx={{ ...theme.typography.h4 }}>
              {t("Другие новости")}
            </Typography>
          </Stack>
        </Grid>

        {slideCounts}
      </Grid>
    </>
  );
};

export default NewsInfo;