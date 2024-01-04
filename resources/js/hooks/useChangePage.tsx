// @ts-ignore
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getPageFromUrl } from "../utils/funcs/url";

interface IUseChangePage {
  currentPage: number;
  setCurrentPage: (p: number) => void;
}

// Хук переключения выбранной страницы
const useChangePage = (onChange: (page: number) => Promise<boolean>, initPage?: number): IUseChangePage => {
  const [currentPage, setCurrentPage] = useState<number>(
    typeof initPage === "undefined" ? getPageFromUrl() : initPage
  );

  const loc = useLocation();
  const nowPage = getPageFromUrl(undefined, loc);

  useEffect(() => {
    if (nowPage !== currentPage) {
      onChange(nowPage).then((res: boolean) => res && setCurrentPage(nowPage));
    }

  }, [loc, nowPage]);

  return {
    currentPage,
    setCurrentPage
  };
};

export default useChangePage;