import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { ERoles } from "../../../../utils/enums/user";

const SiteAdminRole = ({ children }) => {
  const userRole: ERoles = useSelector((s: RootState) => s.userInfo.user.role);
  if (userRole !== ERoles.SITE_ADMIN) {
    return null;
  }

  return (
    <>{children}</>
  );
};

export default SiteAdminRole;