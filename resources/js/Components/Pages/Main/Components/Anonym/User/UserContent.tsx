import { TabPanel } from "@mui/lab";
import * as React from "react";
import { EMainPageTabs } from "../../../../../../utils/enums/user";
// import { toggleRegisterPopup } from "../../../../../../utils/funcs/event";
// import ProductCategories from "../../../../Landing/ProductCategories";
// import ProductHowItWorks from "../../../../Landing/ProductHowItWorks";
// import ProductValues from "../../../../Landing/ProductValues";
import AppFooter from "../Footer/AppFooter";
import HasQuestionBtn from "../HasQuestionBtn";

const UserContent = () => {
  const value = EMainPageTabs.USER.toString();
  const sx = { p: 0 };

  return (
    <TabPanel value={value} sx={sx}>
      {/*<ProductValues/>*/}
      {/*<ProductCategories/>*/}
      {/*<ProductHowItWorks toggleRegister={toggleRegisterPopup}/>*/}

      <HasQuestionBtn/>
      <AppFooter/>
    </TabPanel>
  );
};

export default UserContent;