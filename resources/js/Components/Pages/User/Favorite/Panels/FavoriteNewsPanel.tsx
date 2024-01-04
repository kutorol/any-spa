import TabPanel from "@mui/lab/TabPanel";
import { Grid } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { Link } from "react-router-dom";
import { getUrl } from "../../../../../utils/funcs/url";
import { IShortNewsInterface } from "../../../../../utils/interfaces/news";
import Pagination from "../../../../Common/Gui/Pagination/Pagination";
import CardList from "../../../SiteNews/CardList";

interface INotificationPanel {
  value: string;
  currentPage: number;
  totalPages: number;
  onToggleLike: (id: number) => void;
  items: IShortNewsInterface[];
  cardSx?: object;
}

const FavoriteNewsPanel = ({ value, onToggleLike, items, currentPage, totalPages, cardSx }: INotificationPanel) => {
  const { t } = useLaravelReactI18n();

  return (
    <TabPanel
      value={value}
      sx={{ "&": { p: 0 } }}
    >
      <Grid
        container
        sx={{ m: 0, pt: 2, mb: 4 }}
      >
        <CardList
          list={items}
          onToggleLike={onToggleLike}
          notFoundText={<>
            {t("Вы еще не добавляли новости в избранное со страницы")} <Link to={getUrl("/news")}>{t("новостей")}</Link>!
          </>}
          cardSx={cardSx}
        />
      </Grid>

      {(totalPages > 1) && (
        <Grid container item justifyContent="center">
          <Pagination
            urlTo="/favorite/news"
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </Grid>
      )}
    </TabPanel>
  );
};

export default FavoriteNewsPanel;