import React from 'react'
import { BrowserView, MobileView } from 'react-device-detect';

const WebOrMobileBox = ({ children, mobileComponent = null }) => {
  mobileComponent = mobileComponent || children
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