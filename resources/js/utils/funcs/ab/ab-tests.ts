import { ITests } from "../../interfaces/ab-tests";

const cacheKey = "{ab}:tests";

// getAllABTests Возвращает все тесты юзера
export const getAllABTests = (): ITests => {
  try {
    return JSON.parse(localStorage.getItem(cacheKey) || "{}");
  } catch(e) {
    return {};
  }
};

// getABTestValueID Возвращает id значения от теста
export const getABTestValueID = (testID: number): number => {
  return getAllABTests()[testID] || 0;
};

// setAllABTests Устанавливает все тесты в хранилище
export const setAllABTests = (tests: ITests) => {
  try {
    return localStorage.setItem(cacheKey, JSON.stringify(tests));
  } catch(e) {
    console.error(e);
  }
};