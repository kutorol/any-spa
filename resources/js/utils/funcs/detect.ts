import { load } from "@fingerprintjs/botd";
import { get } from "lodash";

// Возвращает 1, если это бот
// использовать как `const is = await isCrawler();`
export const isCrawler = async () => {
  const promise = load().then((botd) => botd.detect())
    .then(res => {
      return Boolean(get(res, "bot", false));
    })
    .catch((e) => {
      console.error("bot (crawlers) detected error", e);
      return false;
    });

  const isCrawler = await promise;

  return isCrawler ? 1 : 0;
};