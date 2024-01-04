import * as React from "react";
import { useMemo } from "react";

// Возвращает сколько минут читать указанный текст
const useTimeToRead = (str: string): number => {
  return useMemo<number>((): number => {
    const totalWords = str.split(" ").length;
    return Math.ceil(totalWords / 140);
  }, [str]);
};

export default useTimeToRead;