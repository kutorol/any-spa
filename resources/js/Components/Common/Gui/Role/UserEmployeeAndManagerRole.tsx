import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { ERoles } from "../../../../utils/enums/user";

const UserEmployeeAndManagerRole = ({ children }) => {
  const userRole: ERoles = useSelector((s: RootState) => s.userInfo.user.role);
  // @ts-ignore
  if (![ERoles.EMPLOYEE, ERoles.MANAGER, ERoles.ADMIN].includes(userRole)) {
    return null;
  }

  return (
    <>{children}</>
  );
};

export default UserEmployeeAndManagerRole;