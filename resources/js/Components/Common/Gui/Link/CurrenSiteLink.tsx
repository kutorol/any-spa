import { Link } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { ELanguages } from "../../../../utils/enums/user";
import { getUrl } from "../../../../utils/funcs/url";

interface ICurrenSiteLink {
  path?: string;
}

const CurrenSiteLink = ({ path }: ICurrenSiteLink) => {
  const userLocale: ELanguages = useSelector((s: RootState) => s.userInfo.user.locale);

  const url = path ? getUrl(path) : `${window.location.origin}/${userLocale}`;

  return (
    <Link href={url} underline="hover" target="_blank">
      {window.location.origin}/{userLocale}{path ? `/${path}` : ""}
    </Link>
  );
};

export default CurrenSiteLink;