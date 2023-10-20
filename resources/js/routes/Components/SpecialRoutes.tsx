// @ts-ignore
import React, { lazy } from "react";
import Loadable from "../../Components/Common/Utils/Loadable";
import MinimalLayout from "../../Components/Layout/MinimalLayout/MinimalLayout";
// @ts-ignore
const TechSupportPage = Loadable(lazy(() => import("../../Components/Pages/Special/TechSupport/TechSupportPage")));

const SpecialRoutes = {
  path: "/",
  element: <MinimalLayout/>,
  children: [
    {
      path: "/support-tech",
      element: <TechSupportPage/>
    }
  ]
};

export default SpecialRoutes;