import { Grid } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { cloneDeep } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import useFinderNews from "../../../hooks/news/useFinderNews";
import useToggleLikeNews from "../../../hooks/news/useToggleLikeNews";
import useChangePage from "../../../hooks/useChangePage";
import { INewsList, IShortNewsInterface } from "../../../utils/interfaces/news";
import newsRep from "../../../utils/repository/news";
import ErrorBlock from "../../Common/Gui/Block/ErrorBlock";
import CardSkeleton from "../../Common/Gui/Card/CardSkeleton";
import Pagination from "../../Common/Gui/Pagination/Pagination";
import CardList from "./CardList";

const SiteNewsPageList = () => {
  const { t } = useLaravelReactI18n();

  const [isError, setIsError] = useState<boolean>(false);
  const [newsList, setNewsList] = useState<{ [k: number]: INewsList } | null>(null);

  const { currentPage, setCurrentPage } = useChangePage((page: number): Promise<boolean> => {
    return getPageNewsList(page);
  });

  const onToggleLike = useToggleLikeNews((oneNews: IShortNewsInterface): void => {
    const list: INewsList = cloneDeep(newsList[currentPage]);
    setNewsList({
      ...newsList,
      [currentPage]: {
        ...newsList[currentPage],
        news: list.news.map((item: IShortNewsInterface): IShortNewsInterface => item.id === oneNews.id ? oneNews : item)
      }
    });
  });

  const { getPageNewsList } = useFinderNews({
    pageUrl: "/news",
    finderPromise: (page: number): Promise<any> => {
      return newsRep.find(page);
    },
    onErrorFind: (page: number): void => {
      !isError && setIsError(true);
    },
    onFound: (data: INewsList): void => {
      isError && setIsError(false);
      setNewsList({
        ...(newsList || {}), ...{
          [data.page as number]: {
            news: data.news as IShortNewsInterface[],
            page: data.page,
            totalPages: data.totalPages
          }
        }
      });
    },
    setCurrentPage: setCurrentPage,
    existsPage: (page: number): boolean => {
      return newsList !== null && typeof newsList[page] !== "undefined";
    }
  });

  useEffect(() => {
    getPageNewsList(currentPage);
  }, []);

  // если еще не сделали первый запрос на сервер
  if (!isError && newsList === null) {
    return (
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <CardSkeleton
          withGridItem
          countSkeleton={8}
        />
      </Grid>
    );
  }

  const pageInfo: INewsList | null | undefined = (newsList || {})[currentPage];

  // если ошибка при первом запросе
  if (isError && !newsList || typeof pageInfo === "undefined") {
    return (
      <ErrorBlock
        errorText={t("Произошла ошибка получения новостей!")}
      />
    );
  }

  return (
    <>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <CardList
          list={pageInfo.news}
          onToggleLike={onToggleLike}
        />
      </Grid>

      {(pageInfo.totalPages > 1) && (
        <Grid container item justifyContent="center">
          <Pagination
            urlTo="/news"
            currentPage={currentPage}
            totalPages={pageInfo.totalPages}
          />
        </Grid>
      )}
    </>
  );
};


export default SiteNewsPageList;