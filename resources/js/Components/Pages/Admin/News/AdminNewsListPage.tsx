import { Grid, Table, TableBody, TableContainer } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFinderNews from "../../../../hooks/news/useFinderNews";
import useChangePage from "../../../../hooks/useChangePage";
import { changeFullScreenLoaderState } from "../../../../store/reducers/func/common/full-screen-loader";
import { getUrl } from "../../../../utils/funcs/url";
import { INewsList, IShortNewsInterface } from "../../../../utils/interfaces/news";
import newsRep from "../../../../utils/repository/admin/news";
import ErrorBlock from "../../../Common/Gui/Block/ErrorBlock";
import NotFoundAlert from "../../../Common/Gui/Block/NotFoundAlert";
import Btn from "../../../Common/Gui/Btn/Btn";
import Icon from "../../../Common/Gui/Common/Icon";
import Pagination from "../../../Common/Gui/Pagination/Pagination";
import MainCard from "../../../Common/MainCard/MainCard";
import TableHead from "./Components/TableHead";
import TableRow from "./Components/TableRow";

const AdminNewsListPage = () => {
  const { t } = useLaravelReactI18n();
  const [isError, setIsError] = useState<boolean>(false);
  const [newsList, setNewsList] = useState<{ [k: number]: INewsList } | null>(null);

  const { currentPage, setCurrentPage } = useChangePage((page: number): Promise<boolean> => {
    return getPageNewsList(page);
  });

  const pageURL = "/admin/news/list";
  const { getPageNewsList } = useFinderNews({
    pageUrl: pageURL,
    finderPromise: (page: number): Promise<any> => {
      changeFullScreenLoaderState(true);
      return newsRep.findAdmin(page).then(res => {
        changeFullScreenLoaderState(false);
        return res;
      });
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
    return null;
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

  if (pageInfo.news.length === 0) {
    const titleBtn = t("На первую страницу");

    return (
      <MainCard title={t("Список новостей")}>
        <Grid container item xs={12}>
          <NotFoundAlert subTitle={t("Не удалось найти новости по этому url!")}/>
          {currentPage > 1 && (
            <Grid container item justifyContent="center" sx={{ mt: 2 }}>
              <Btn
                component={Link}
                variant="contained"
                to={getUrl(pageURL)}
                icon={<Icon tablerIcon="IconChevronLeft"/>}
                webTitle={titleBtn}
                mobTitle={titleBtn}
              />
            </Grid>
          )}
        </Grid>
      </MainCard>
    );
  }

  return (
    <MainCard title={t("Список новостей")}>
      <TableContainer sx={{ mb: 3 }}>
        <Table>
          <TableHead/>
          <TableBody>
            {pageInfo.news.map((n: IShortNewsInterface) => (
              <TableRow
                key={n.id}
                news={n}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {(pageInfo.totalPages > 1) && (
        <Grid container item justifyContent="center">
          <Pagination
            urlTo={pageURL}
            currentPage={currentPage}
            totalPages={pageInfo.totalPages}
          />
        </Grid>
      )}
    </MainCard>
  );
};

export default AdminNewsListPage;