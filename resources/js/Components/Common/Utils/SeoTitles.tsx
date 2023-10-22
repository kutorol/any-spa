import { get } from "lodash";
// @ts-ignore
import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { changeSeo, checkExistsPath, setExistsPath } from "../../../store/reducers/func/common/seo";
import r from "../../../utils/ajax";

const SeoTitles = () => {
  const location = useLocation();

  useEffect(() => {
    if (checkExistsPath(location.pathname)) {
      setExistsPath(location.pathname);
    } else {
      r.get("/api/seo-page-info", { path: location.pathname }).then(res => {
        get(res, "status", false) && changeSeo(location.pathname, get(res, "data.seo", {}));
      });
    }
  }, [location.pathname]);
  return null;
};

export default SeoTitles;