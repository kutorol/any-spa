import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { ERoles } from "../../../../utils/enums/user";

const UserEmployeeRole = ({ children }) => {
  const userRole: ERoles = useSelector((s: RootState) => s.userInfo.user.role);
  if (ERoles.EMPLOYEE !== userRole) {
    return null;
  }

  return (
    <>{children}</>
  );
};

export default UserEmployeeRole;