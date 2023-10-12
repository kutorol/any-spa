// @ts-ignore
import React from "react";
import { useSelector } from "react-redux";

// На весь экран полупрозрачный блок накладывает и спинер крутящийся в середине
const FullLoader = () => {
  // @ts-ignore
  const active = useSelector(s => s.fullScreenLoader.active);
  if (!active) {
    return null;
  }

  return (
    <div
      id="shadow_preloader"
      className="rjs-loading background_load_ajax"
    />
  );
};

export default FullLoader;