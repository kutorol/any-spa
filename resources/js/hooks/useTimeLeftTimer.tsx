// @ts-ignore
import React, { useEffect, useState } from "react";

interface useTimeLeftTimerProps {
  initFutureDate?: Date;
  initStorageNameFutureDate?: string;
}

/**
 * Хук с возвращением сколько секунд остались между датами
 * @param initFutureDate - инициализация сразу датой в будущем времени
 * @param initStorageNameFutureDate - инициализация даты в будущем, которая берется из локального хранилища
 */
const useTimeLeftTimer = ({ initFutureDate = null, initStorageNameFutureDate = null }: useTimeLeftTimerProps) => {
  if (!initFutureDate && !initStorageNameFutureDate) {
    throw new Error("no futureDate or storageName");
  }

  const [timer, setTimer] = useState(null);
  const [nowTime, setNowTime] = useState<Date>(new Date());
  const [futureDate, setFutureDate] = useState<Date>(
    // @ts-ignore
    initFutureDate ? initFutureDate : localStorage.getItem(initStorageNameFutureDate)
  );

  let leftSeconds = 0;
  if (futureDate) {
    // @ts-ignore
    const timeDiffMs = futureDate - nowTime;
    leftSeconds = Math.floor(timeDiffMs / 1000);
  }

  useEffect(() => {
    if (leftSeconds <= 0 && (timer || futureDate)) {
      initStorageNameFutureDate && localStorage.removeItem(initStorageNameFutureDate);
      timer && clearInterval(timer);
      setTimer(null);
    }

    return () => {
    };
  }, [leftSeconds]);

  useEffect(() => {
    if (!timer && futureDate) {
      setTimer(setInterval(() => {
        setNowTime(new Date());
      }, 1000));
    }

    return () => {
    };
  }, [futureDate]);

  const onSetFutureDate = (futureDate: Date): void => {
    initStorageNameFutureDate && localStorage.setItem(initStorageNameFutureDate, String(futureDate));
    setFutureDate(futureDate);
  };

  return {
    leftSeconds,
    setFutureDate: onSetFutureDate
  };
};

export default useTimeLeftTimer;