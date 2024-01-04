import { Grid, Table, TableBody, TableContainer } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { get } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import useChangePage from "../../../../../hooks/useChangePage";
import { changeFullScreenLoaderState } from "../../../../../store/reducers/func/common/full-screen-loader";
import { eventScrollUp } from "../../../../../utils/funcs/event";
import { createSearchUrlWithPage, getPageFromUrl, getUrl, navTo } from "../../../../../utils/funcs/url";
import { IProblemInterface, IProblemsList } from "../../../../../utils/interfaces/admin/tech-support";
import techSupport from "../../../../../utils/repository/admin/tech-support";
import ErrorBlock from "../../../../Common/Gui/Block/ErrorBlock";
import NotFoundAlert from "../../../../Common/Gui/Block/NotFoundAlert";
import Btn from "../../../../Common/Gui/Btn/Btn";
import Icon from "../../../../Common/Gui/Common/Icon";
import Pagination from "../../../../Common/Gui/Pagination/Pagination";
import MainCard from "../../../../Common/MainCard/MainCard";
import TableHead from "./Components/TableHead";
import TableRow from "./Components/TableRow";

const AdminTechSupportListPage = () => {
  const loc = useLocation();
  const { t } = useLaravelReactI18n();
  const [isError, setIsError] = useState<boolean>(false);
  const [problemList, setProblemList] = useState<{ [k: number]: IProblemsList } | null>(null);

  const { currentPage, setCurrentPage } = useChangePage((page: number): Promise<boolean> => {
    if (problemList !== null && typeof problemList[page] !== "undefined") {
      // @ts-ignore
      return new Promise<boolean>((resolve) => {
        eventScrollUp(50);
        return resolve(true);
      });
    }

    return getPageProblemList(page);
  });

  const getPageProblemList = (page: number) => {
    changeFullScreenLoaderState(true);
    return techSupport.find(page).then(res => {
      changeFullScreenLoaderState(false);

      if (!get(res, "data.problems", null)) {
        !isError && setIsError(true);
        return false;
      }

      const info = res.data as IProblemsList;

      isError && setIsError(false);
      setProblemList({
        ...(problemList || {}),
        [info.page as number]: {
          problems: info.problems as IProblemInterface[],
          page: info.page,
          totalPages: info.totalPages
        }
      });

      if (getPageFromUrl(undefined, loc) !== info.page) {
        setCurrentPage(info.page);
        navTo(`/admin/tech-support/list${createSearchUrlWithPage(info.page, loc)}`);
      }

      eventScrollUp(50);
      return true;
    });
  };

  useEffect(() => {
    getPageProblemList(currentPage);
  }, []);

  // если еще не сделали первый запрос на сервер
  if (!isError && problemList === null) {
    return null;
  }

  const pageInfo: IProblemsList | null | undefined = (problemList || {})[currentPage];

  // если ошибка при первом запросе
  if (isError && !problemList || typeof pageInfo === "undefined") {
    return (
      <ErrorBlock
        errorText={t("Произошла ошибка получения запросов в техническую поддержку!")}
      />
    );
  }


  if (pageInfo.problems.length === 0) {
    const titleBtn = t("На первую страницу");

    return (
      <MainCard title={t("Список запросов в техническую поддержку")}>
        <Grid container item xs={12}>
          <NotFoundAlert subTitle={t("Не удалось найти запросы в техническую поддержку по этому url!")}/>
          {currentPage > 1 && (
            <Grid container item justifyContent="center" sx={{ mt: 2 }}>
              <Btn
                component={Link}
                variant="contained"
                to={getUrl("/admin/tech-support/list")}
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
    <MainCard title={t("Список запросов в техническую поддержку")}>
      <TableContainer sx={{ mb: 3 }}>
        <Table>
          <TableHead withShortComment/>
          <TableBody>
            {pageInfo.problems.map((p: IProblemInterface) => (
              <TableRow
                key={p.id}
                problem={p}
                withShortComment
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {(pageInfo.totalPages > 1) && (
        <Grid container item justifyContent="center">
          <Pagination
            urlTo="/admin/tech-support/list"
            currentPage={currentPage}
            totalPages={pageInfo.totalPages}
          />
        </Grid>
      )}
    </MainCard>
  );
};

export default AdminTechSupportListPage;