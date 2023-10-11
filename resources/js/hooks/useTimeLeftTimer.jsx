import React, { useEffect, useState } from 'react'

/**
 * Хук с возвращением сколько секунд остались между датами
 * @param initFutureDate - инициализация сразу датой в будущем времени
 * @param initStorageNameFutureDate - инициализация даты в будущем, которая берется из локального хранилища
 */
const useTimeLeftTimer = ({ initFutureDate = null, initStorageNameFutureDate = null }) => {
  if (!initFutureDate && !initStorageNameFutureDate) {
    throw new Error("no futureDate or storageName");
  }

  const [timer, setTimer] = useState(null);
  const [nowTime, setNowTime] = useState(new Date());
  const [futureDate, setFutureDate] = useState(
    initFutureDate ? initFutureDate : localStorage.getItem(initStorageNameFutureDate)
  );

  let leftSeconds = 0;
  if (futureDate) {
    const timeDiffMs = futureDate - nowTime;
    leftSeconds = Math.floor(timeDiffMs / 1000);
  }

  useEffect(() => {
    if (leftSeconds <= 0 && (timer || futureDate)) {
      initStorageNameFutureDate && localStorage.removeItem(initStorageNameFutureDate)
      timer && clearInterval(timer);
      setTimer(null)
    }

    return () => {
    };
  }, [leftSeconds]);

  useEffect(() => {
    if (!timer && futureDate) {
      setTimer(setInterval(() => {
        setNowTime(new Date())
      }, 1000))
    }

    return () => {
    };
  }, [futureDate]);

  const onSetFutureDate = (futureDate) => {
    initStorageNameFutureDate && localStorage.setItem(initStorageNameFutureDate, futureDate)
    setFutureDate(futureDate)
  };

  return {
    leftSeconds,
    setFutureDate: onSetFutureDate,
  };
};

export default useTimeLeftTimer;