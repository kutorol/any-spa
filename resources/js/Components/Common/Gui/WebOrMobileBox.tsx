// @ts-ignore
import React from "react";
import { BrowserView, MobileView } from "react-device-detect";

interface IWebOrMobileBox {
  children: React.ReactNode;
  mobileComponent?: React.ReactNode | string | any;
}

const WebOrMobileBox = ({ children, mobileComponent = null }: IWebOrMobileBox) => {
  return (
    <>
      <BrowserView>
        {children}
      </BrowserView>
      <MobileView>
        {mobileComponent}
      </MobileView>
    </>
  );
};

export default WebOrMobileBox;