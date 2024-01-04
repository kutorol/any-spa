import { toNumber } from "lodash";
// @ts-ignore
import React, { useEffect, useState } from "react";

interface useSecondsLeftTimerProps {
  initStorageNameLeftSeconds?: string;
}

/**
 * Хук для получения таймера, который отсчитывает сколько секунд осталось
 * @param initStorageNameLeftSeconds - имя локального хранилища, в котором хранится отсчет секунд до 0
 *      Если не указано, то после обновления/перехода по страницам, таймер сброситься
 *      Если указать, то после обновления/перехода по страницам, таймер оставит те секунды, которые были в последний раз
 *       !!! Если нужен таймер, чтобы и после обновления правильно считал, то используйте useTimeLeftTimer
 */
const useSecondsLeftTimer = ({ initStorageNameLeftSeconds = null }: useSecondsLeftTimerProps) => {
  const initLeftSeconds = initStorageNameLeftSeconds ? localStorage.getItem(initStorageNameLeftSeconds) : 0;
  const [timer, setTimer] = useState(null);
  const [leftSeconds, setLeftSeconds] = useState<number>(initLeftSeconds ? toNumber(initLeftSeconds) : 0);

  const removeStorage = () => {
    initStorageNameLeftSeconds && localStorage.removeItem(initStorageNameLeftSeconds);
  };

  useEffect(() => {
    if (leftSeconds >= 0) {
      initStorageNameLeftSeconds && localStorage.setItem(initStorageNameLeftSeconds, String(leftSeconds));
    }

    if (isNaN(leftSeconds) || (leftSeconds <= 0 && timer)) {
      removeStorage();
      timer && clearTimeout(timer);
      setTimer(null);
    }

    return () => {
    };
  }, [leftSeconds]);

  const setTimerSeconds = (newLeftSeconds) => {
    setTimer(setTimeout(() => {
      setLeftSeconds(newLeftSeconds);
    }, 1000));
  };

  useEffect(() => {
    if (leftSeconds > 0) {
      setTimerSeconds(leftSeconds - 1);
    }

    return () => {
    };
  }, [leftSeconds]);

  const onSetLeftSeconds = (seconds: number): void => {
    if (seconds < 1) {
      return;
    }

    setLeftSeconds(seconds);
  };

  return {
    leftSeconds,
    setLeftSeconds: onSetLeftSeconds
  };
};

export default useSecondsLeftTimer;