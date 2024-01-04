import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

interface IShowBlockByABTest {
  testID: number;
  showByValueIDs: number[];
  children: any;
}

// По ID теста и значениям теста возвращает или пустоту или содержимое дочерних элементов
const ShowBlockByABTest = ({ testID, showByValueIDs, children }: IShowBlockByABTest) => {
  const { isAppInit, abTests } = useSelector((s: RootState) => ({
    isAppInit: s.appInit.init,
    abTests: s.userInfo.user.ab_tests || {}
  }));

  if (!isAppInit || !abTests[testID]) {
    return null;
  }

  const valueID: number = abTests[testID];
  // @ts-ignore
  if (!showByValueIDs.includes(valueID)) {
    return null;
  }

  return (
    <>
      {children}
    </>
  );
};

export default ShowBlockByABTest;