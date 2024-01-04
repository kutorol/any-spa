import { Grid, Table, TableBody, TableContainer } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { get } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import useChangePage from "../../../../hooks/useChangePage";
import { changeFullScreenLoaderState } from "../../../../store/reducers/func/common/full-screen-loader";
import { eventScrollUp } from "../../../../utils/funcs/event";
import { createSearchUrlWithPage, getPageFromUrl, getUrl, navTo } from "../../../../utils/funcs/url";
import { ILog, ILogList } from "../../../../utils/interfaces/admin/logs";
import logsRep from "../../../../utils/repository/admin/logs";
import ErrorBlock from "../../../Common/Gui/Block/ErrorBlock";
import NotFoundAlert from "../../../Common/Gui/Block/NotFoundAlert";
import Btn from "../../../Common/Gui/Btn/Btn";
import Icon from "../../../Common/Gui/Common/Icon";
import Pagination from "../../../Common/Gui/Pagination/Pagination";
import MainCard from "../../../Common/MainCard/MainCard";
import TableHead from "./Components/TableHead";
import TableRow from "./Components/TableRow";

const AdminLogsListPage = () => {
  const loc = useLocation();
  const { t } = useLaravelReactI18n();
  const [isError, setIsError] = useState<boolean>(false);
  const [logsList, setLogsList] = useState<{ [k: number]: ILogList } | null>(null);

  const { currentPage, setCurrentPage } = useChangePage((page: number): Promise<boolean> => {
    if (logsList !== null && typeof logsList[page] !== "undefined") {
      // @ts-ignore
      return new Promise<boolean>((resolve) => {
        eventScrollUp(50);
        return resolve(true);
      });
    }

    return getPageLogsList(page);
  });

  const getPageLogsList = (page: number) => {
    changeFullScreenLoaderState(true);
    return logsRep.find(page).then(res => {
      changeFullScreenLoaderState(false);

      if (!get(res, "data.logs", null)) {
        !isError && setIsError(true);
        return false;
      }

      const info = res.data as ILogList;

      isError && setIsError(false);
      setLogsList({
        ...(logsList || {}),
        [info.page as number]: {
          logs: info.logs,
          page: info.page,
          totalPages: info.totalPages
        }
      });

      if (getPageFromUrl(undefined, loc) !== info.page) {
        setCurrentPage(info.page);
        navTo(`/admin/logs${createSearchUrlWithPage(info.page, loc)}`);
      }

      eventScrollUp(50);
      return true;
    });
  };

  useEffect(() => {
    getPageLogsList(currentPage);
  }, []);

  // если еще не сделали первый запрос на сервер
  if (!isError && logsList === null) {
    return null;
  }

  const pageInfo: ILogList | null | undefined = (logsList || {})[currentPage];

  // если ошибка при первом запросе
  if (isError && !logsList || typeof pageInfo === "undefined") {
    return (
      <ErrorBlock
        errorText={t("Произошла ошибка получения логов сайта!")}
      />
    );
  }

  if (pageInfo.logs.length === 0) {
    const btnTitle = t("На первую страницу");

    return (
      <MainCard title={t("Список логов сайта")}>
        <Grid container item xs={12}>
          <NotFoundAlert subTitle={t("Не удалось найти логи сайта по этому url!")}/>
          {currentPage > 1 && (
            <Grid container item justifyContent="center" sx={{ mt: 2 }}>
              <Btn
                component={Link}
                variant="contained"
                to={getUrl("/admin/logs")}
                icon={<Icon tablerIcon="IconChevronLeft"/>}
                webTitle={btnTitle}
                mobTitle={btnTitle}
              />
            </Grid>
          )}
        </Grid>
      </MainCard>
    );
  }

  return (
    <MainCard title={t("Список логов сайта")}>
      <TableContainer sx={{ mb: 3 }}>
        <Table>
          <TableHead/>

          <TableBody>
            {pageInfo.logs.map((l: ILog) => (
              <TableRow
                key={l.path}
                log={l}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {(pageInfo.totalPages > 1) && (
        <Grid container item justifyContent="center">
          <Pagination
            urlTo="/admin/logs"
            currentPage={currentPage}
            totalPages={pageInfo.totalPages}
          />
        </Grid>
      )}
    </MainCard>
  );
};

export default AdminLogsListPage;