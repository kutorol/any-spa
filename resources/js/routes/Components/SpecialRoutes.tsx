import * as React from "react";
import { lazy } from "react";
import Loadable from "../../Components/Common/Utils/Loadable";
import MinimalLayout from "../../Components/Layout/MinimalLayout/MinimalLayout";
import { IRoute } from "../../utils/interfaces/route";
// @ts-ignore
const TechSupportPage = Loadable(lazy(() => import("../../Components/Pages/Special/TechSupport/TechSupportPage")));
// @ts-ignore
const TermOfUsePrivatePolicyPage = Loadable(lazy(() => import("../../Components/Pages/Special/TermOfUse/TermOfUsePrivatePolicy")));

// privacyURL - Соглашение об обработки данных
export const privacyURL = "privacy";
// cookieURL - Соглашение об использовании кук
export const cookieURL = "cookie";
// termOfUseURL - Соглашение-оферта
export const termOfUseURL = "term-of-use-private-policy";

const SpecialRoutes: IRoute = {
  path: ":lang",
  element: <MinimalLayout/>,
  children: [
    { path: "support-tech", element: <TechSupportPage/> },
    { path: privacyURL, element: <></> },
    { path: cookieURL, element: <></> },
    { path: termOfUseURL, element: <TermOfUsePrivatePolicyPage/> }
  ]
};

export default SpecialRoutes;