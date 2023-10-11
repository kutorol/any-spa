import React from 'react'
import { useSelector } from "react-redux";

// На весь экран полупрозрачный блок накладывает и спинер крутящийся в середине
const FullLoader = () => {
  const {active} = useSelector(state => state.fullScreenLoader)
  if(!active) {
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