import TabContext from "@mui/lab/TabContext";
import { Grid, Skeleton, Stack } from "@mui/material";
// @ts-ignore
import dayjs from "dayjs";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import useFinderNews from "../../../../hooks/news/useFinderNews";
import useToggleLikeNews from "../../../../hooks/news/useToggleLikeNews";
import useChangePage from "../../../../hooks/useChangePage";
import { EFavorite } from "../../../../utils/enums/user";
import { navTo } from "../../../../utils/funcs/url";
import { INewsList, IShortNewsInterface } from "../../../../utils/interfaces/news";
import newsRep from "../../../../utils/repository/news";
import ErrorBlock from "../../../Common/Gui/Block/ErrorBlock";
import CardSkeleton from "../../../Common/Gui/Card/CardSkeleton";
import MainCard from "../../../Common/MainCard/MainCard";
import ListHeader from "./ListHeader";
import FavoriteNewsPanel from "./Panels/FavoriteNewsPanel";

const getCurrentItems = (value: string, page: number, items?: object): (INewsList | undefined) => {
  return ((items || {})[value] || {})[page];
};

interface IUserFavoritePage {
  favorite: EFavorite;
}

const UserFavoritePage = ({ favorite }: IUserFavoritePage) => {
  const { t } = useLaravelReactI18n();

  const loc = useLocation();
  const [isError, setIsError] = useState<boolean>(false);
  const [value, setValue] = useState<EFavorite>(favorite);
  const [favoriteItems, setFavoriteItems] = useState<any>(null);

  const { currentPage, setCurrentPage } = useChangePage((page: number): Promise<boolean> => {
    return getPageNewsList(page);
  });

  const onToggleLike = useToggleLikeNews((oneNews: IShortNewsInterface): void => {
    const currentData: INewsList | undefined = getCurrentItems(value, currentPage, favoriteItems);
    setFavoriteItems({
      ...favoriteItems,
      [value]: {
        ...((favoriteItems || {})[value] || {}),
        [currentPage]: {
          ...currentData,
          news: (currentData.news || []).map((item: IShortNewsInterface): IShortNewsInterface => item.id === oneNews.id ? oneNews : item)
        }
      }
    });
  });

  const { getPageNewsList } = useFinderNews({
    pageUrl: "/favorite/news",
    finderPromise: (page: number): Promise<any> => {
      return newsRep.findFavorite(page);
    },
    onErrorFind: (page: number): void => {
      !isError && setIsError(true);
    },
    onFound: (data: INewsList): void => {
      isError && setIsError(false);

      setFavoriteItems({
        ...favoriteItems,
        [value]: {
          ...((favoriteItems || {})[value] || {}),
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
      return typeof getCurrentItems(value, page, favoriteItems) !== "undefined";
    }
  });

  const handleTabChange = (e: React.SyntheticEvent, newValue: EFavorite) => {
    navTo(`/favorite/${newValue.toString()}`);
    setValue(newValue);
  };

  useEffect(() => {
    if (value !== favorite) {
      handleTabChange(undefined, favorite);
    }
  }, [value, favorite, loc.pathname]);

  useEffect(() => {
    if (value === EFavorite.NEWS) {
      getPageNewsList(currentPage);
    }
  }, [value]);


  const mainCardSx = { "& > .MuiCardContent-root": { p: 0, pb: "0 !important;" } };
  const isNews = value === EFavorite.NEWS;


  if (!isError && (favoriteItems === null || typeof (favoriteItems || {})[value] === "undefined")) {
    return (
      <>
        <MainCard sx={{ ...mainCardSx, p: 1, mb: 2 }}>
          <Stack direction="row">
            <Skeleton height={55} width="10.5%" sx={{ mr: 2 }} animation="wave" variant="rectangular"/>
            <Skeleton height={55} width="10.5%" animation="wave" variant="rectangular"/>
          </Stack>
        </MainCard>

        {isNews && (
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <CardSkeleton
              withGridItem
              countSkeleton={4}
            />
          </Grid>
        )}
      </>
    );
  }

  const pageInfo: INewsList | undefined = getCurrentItems(value, currentPage, favoriteItems);

  // если ошибка при первом запросе
  if (isError && favoriteItems === null || typeof pageInfo === "undefined") {
    return (
      <ErrorBlock
        errorText={t(`Произошла ошибка получения избранных :what!`, { what: t(isNews ? "новостей" : "") })}
      />
    );
  }

  return (
    <TabContext value={value}>
      <MainCard sx={mainCardSx}>
        <ListHeader
          handleChange={handleTabChange}
        />
      </MainCard>

      {isNews && (
        <FavoriteNewsPanel
          value="news"
          items={pageInfo.news}
          onToggleLike={onToggleLike}
          totalPages={pageInfo.totalPages}
          currentPage={currentPage}
          cardSx={{ mb: 3 }}
        />
      )}
    </TabContext>
  );
};

export default UserFavoritePage;