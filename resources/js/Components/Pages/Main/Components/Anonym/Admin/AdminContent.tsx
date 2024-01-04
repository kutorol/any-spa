import { TabPanel } from "@mui/lab";
import * as React from "react";
import { EMainPageTabs } from "../../../../../../utils/enums/user";
import AppFooter from "../Footer/AppFooter";
import FreeRegister from "../FreeRegister";
import HasQuestionBtn from "../HasQuestionBtn";

const AdminContent = () => {
  const value = EMainPageTabs.ADMIN.toString();
  const sx = { p: 0 };

  return (
    <TabPanel value={value} sx={sx}>
      <FreeRegister/>
      <HasQuestionBtn/>
      <AppFooter/>
    </TabPanel>
  );
};

export default AdminContent;