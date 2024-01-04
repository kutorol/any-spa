import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Badge, Grid, IconButton } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import MainCard from "../../../../Common/MainCard/MainCard";

interface ILikeAndViewBlock {
  likes: number;
  views: number;
}

const LikeAndViewBlock = ({ likes, views }: ILikeAndViewBlock) => {
  const { t } = useLaravelReactI18n();

  return (
    <Grid item xs={12} sx={{ mb: 3 }}>
      <MainCard
        headerSX={{ py: 1.5 }}
        title={t("Лайки и просмотры")}
      >
        <Grid container>
          {/* @ts-ignore */}
          <Grid item xs={6} align="left">
            <IconButton disabled>
              <Badge max={9999999} showZero badgeContent={likes}>
                <FavoriteIcon/>
              </Badge>
            </IconButton>
          </Grid>

          {/* @ts-ignore */}
          <Grid item xs={6} align="right">
            <IconButton disabled>
              <Badge max={9999900} showZero badgeContent={views}>
                <VisibilityIcon/>
              </Badge>
            </IconButton>
          </Grid>
        </Grid>
      </MainCard>
    </Grid>
  );
};

export default LikeAndViewBlock;