import { TabContext } from "@mui/lab";
import * as React from "react";
import { useEffect, useState } from "react";
import { EMainPageTabs } from "../../../utils/enums/user";
import { navTo } from "../../../utils/funcs/url";
import MainCard from "../../Common/MainCard/MainCard";
import AdminContent from "./Components/Anonym/Admin/AdminContent";
import TabHeader from "./Components/Anonym/TabHeader";
import UserContent from "./Components/Anonym/User/UserContent";

interface IMainPageAnonym {
  isAdminTab?: boolean;
}

const MainPageAnonym = ({ isAdminTab }: IMainPageAnonym) => {
  const [value, setValue] = useState<EMainPageTabs>(isAdminTab ? EMainPageTabs.ADMIN : EMainPageTabs.USER);
  const mainCardSx = { "& > .MuiCardContent-root": { p: 0, py: 0 } };
  const handleTabChange = (e: React.SyntheticEvent, newValue: EMainPageTabs) => {
    navTo(newValue === EMainPageTabs.USER ? "/" : "/administrator");
    setValue(newValue);
  };

  useEffect(() => {
    if (isAdminTab && value !== EMainPageTabs.ADMIN) {
      setValue(EMainPageTabs.ADMIN);
    } else if (!isAdminTab && value !== EMainPageTabs.USER) {
      setValue(EMainPageTabs.USER);
    }
  }, [value, isAdminTab]);

  const contentSX = { pb: "0 !important;" };

  return (
    <MainCard
      sx={mainCardSx}
      contentSX={contentSX}
    >
      <TabContext value={value}>
        <TabHeader
          onChange={handleTabChange}
        />

        <UserContent/>
        <AdminContent/>
      </TabContext>
    </MainCard>
  );
};

export default MainPageAnonym;