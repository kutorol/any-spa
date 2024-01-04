import { Pagination as MuiPagination, PaginationItem, PaginationRenderItemParams, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { createSearchUrlWithPage, getUrl } from "../../../../utils/funcs/url";

interface IPagination {
  urlTo: string;
  currentPage: number;
  totalPages: number;
  onChangePage?: (page: number) => void;

  [k: string]: any;
}

const Pagination = ({ urlTo, currentPage, totalPages, onChangePage, ...other }: IPagination) => {
  const theme = useTheme();
  const loc = useLocation();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const boundaryCount = matchDownMd ? 0 : 3;
  const siblingCount = matchDownMd ? 1 : 4;

  const onChange = (e: React.ChangeEvent<unknown>, page: number): void => {
    // если хотим сами управлять переключением страниц
    if (typeof onChangePage !== "undefined") {
      e.preventDefault();
    }

    if (currentPage === page || page > totalPages || page < 1) {
      return;
    }

    onChangePage && onChangePage(page);
  };

  const renderItem = (item: PaginationRenderItemParams) => (
    <PaginationItem
      component={Link}
      to={getUrl(`${urlTo}${createSearchUrlWithPage(item.page, loc)}`)}
      {...item}
    />
  );

  return (
    <MuiPagination
      color="secondary"
      count={totalPages}
      page={currentPage}
      // Сколько по бокам ссылок выводить
      boundaryCount={boundaryCount}
      // Сколько по центру выводить
      siblingCount={siblingCount}
      showFirstButton={!matchDownMd}
      showLastButton={!matchDownMd}
      onChange={onChange}
      size="large"
      renderItem={renderItem}
      {...other}
    />
  );
};

export default Pagination;