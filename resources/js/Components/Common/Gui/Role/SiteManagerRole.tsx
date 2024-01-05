import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { ERoles } from "../../../../utils/enums/user";

const SiteManagerRole = ({ children }) => {
  const userRole: ERoles = useSelector((s: RootState) => s.userInfo.user.role);
  // @ts-ignore
  if (![ERoles.SITE_MANAGER, ERoles.SITE_ADMIN].includes(userRole)) {
    return null;
  }

  return (
    <>{children}</>
  );
};

export default SiteManagerRole;