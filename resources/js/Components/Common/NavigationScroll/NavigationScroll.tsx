import * as React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SCROLL_UP_EVENT } from "../../../utils/funcs/event";
import { saveCurrentPage } from "../../../utils/funcs/url";

interface INavigationScroll {
  children: any;
}

const NavigationScroll = ({ children }: INavigationScroll) => {
  const location = useLocation();
  const { pathname, search } = location;

  const doScroll = (): void => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    (window.scrollY > 20 || window.pageYOffset > 20) && doScroll();
  }, [pathname]);
  useEffect(() => saveCurrentPage(), [pathname, search]);

  useEffect(() => {
    document.addEventListener(SCROLL_UP_EVENT, doScroll);
    return () => document.removeEventListener(SCROLL_UP_EVENT, doScroll);
  }, [pathname]);

  return children || null;
};

export default NavigationScroll;
