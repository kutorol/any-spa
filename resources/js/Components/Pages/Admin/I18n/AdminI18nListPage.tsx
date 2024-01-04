import { Grid, Table, TableContainer } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { get } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import useChangePage from "../../../../hooks/useChangePage";
import { changeFullScreenLoaderState } from "../../../../store/reducers/func/common/full-screen-loader";
import { ELanguages } from "../../../../utils/enums/user";
import { eventScrollUp } from "../../../../utils/funcs/event";
import { createSearchUrlWithPage, getPageFromUrl, navTo } from "../../../../utils/funcs/url";
import { II18n, II18nList } from "../../../../utils/interfaces/admin/i18n";
import i18nRep from "../../../../utils/repository/admin/i18n";
import ErrorBlock from "../../../Common/Gui/Block/ErrorBlock";
import Pagination from "../../../Common/Gui/Pagination/Pagination";
import MainCard from "../../../Common/MainCard/MainCard";
import TableBodyList from "./Components/TableBodyList";
import TableHead from "./Components/TableHead";

const AdminI18nListPage = () => {
  const loc = useLocation();
  const { t } = useLaravelReactI18n();
  const [isError, setIsError] = useState<boolean>(false);
  const [i18nList, setI18nList] = useState<{ [k: number]: II18nList } | null>(null);


  const { currentPage, setCurrentPage } = useChangePage((page: number): Promise<boolean> => {
    if (i18nList !== null && typeof i18nList[page] !== "undefined") {
      // @ts-ignore
      return new Promise<boolean>((resolve) => {
        eventScrollUp(50);
        return resolve(true);
      });
    }

    return getPageI18nList(page);
  });

  const getPageI18nList = (page: number) => {
    changeFullScreenLoaderState(true);
    return i18nRep.find(page).then(res => {
      changeFullScreenLoaderState(false);

      if (!get(res, "data.i18n_list", null)) {
        setIsError(true);
        return false;
      }

      const info = res.data as II18nList;

      setIsError(false);
      setI18nList({
        ...(i18nList || {}),
        [info.page as number]: info
      });

      if (getPageFromUrl(undefined, loc) !== info.page) {
        setCurrentPage(info.page);
        navTo(`/admin/page-i18n${createSearchUrlWithPage(info.page, loc)}`);
      }

      eventScrollUp(50);
      return true;
    });
  };

  useEffect(() => {
    getPageI18nList(currentPage);
  }, []);

  const onChangeVal = (label: string, locale: ELanguages, val: string): void => {
    i18nRep.upsert(label, locale, val).then(res => {
      if (!res) {
        return;
      }
      const data = { ...i18nList };
      const pageData = get(data, `${currentPage}.i18n_list`, []) as II18n[];

      setI18nList({
        ...data,
        [currentPage]: {
          ...(data[currentPage] || {}) as II18nList,
          i18n_list: [
            ...pageData.map((d: II18n) => {
              if (d.label !== label) {
                return d;
              }

              if (d.locale === locale) {
                d.value = val;
                return d;
              }

              let isFound = false;
              d.other_langs = (d.other_langs || []).map((d2: II18n) => {
                if (d2.locale !== locale) {
                  return d2;
                }

                isFound = true;
                d2.value = val;
                return d2;
              });

              if (!isFound) {
                d.other_langs.push({
                  id: 0,
                  label: label,
                  value: val,
                  locale: locale
                } as II18n);
              }

              return d;
            })
          ]
        }
      });
    });
  };

  // если еще не сделали первый запрос на сервер
  if (!isError && i18nList === null) {
    return null;
  }

  const pageInfo: II18nList | null | undefined = (i18nList || {})[currentPage];

  // если ошибка при первом запросе
  if (isError && !i18nList || typeof pageInfo === "undefined") {
    return (
      <ErrorBlock
        errorText={t("Произошла ошибка получения переводов страниц сайта!")}
        actionOnReload={e => {
          setI18nList(null);
          setIsError(false);
          getPageI18nList(currentPage);
        }}
      />
    );
  }

  return (
    <MainCard title={t("Все переводы страниц сайта")}>
      <TableContainer sx={{ maxHeight: 900, mb: 3 }}>
        <Table stickyHeader>
          <TableHead/>
          <TableBodyList
            items={pageInfo.i18n_list}
            onChangeVal={onChangeVal}
          />
        </Table>
      </TableContainer>

      {(pageInfo.totalPages > 1) && (
        <Grid container item justifyContent="center">
          <Pagination
            urlTo="/admin/page-i18n"
            currentPage={currentPage}
            totalPages={pageInfo.totalPages}
          />
        </Grid>
      )}
    </MainCard>
  );
};

export default AdminI18nListPage;