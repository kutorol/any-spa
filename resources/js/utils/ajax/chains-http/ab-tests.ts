import { get } from "lodash";
import { userDataParam } from "../../../store/constant";
import { changeUserInfoChunkData } from "../../../store/reducers/func/common/user";
import { setAllABTests } from "../../funcs/ab/ab-tests";
import { ChainCheckHTTPResponse } from "../interfaces";

// Проверка на приход а/б тестов
export class ChainCheckAbTestsHTTP implements ChainCheckHTTPResponse {
  public check(res: any): any {
    const abTests = get(res, `data.${userDataParam}.ab_tests`, get(res, "data.ab_tests", null));
    if (!abTests) {
      return res;
    }

    // сохраняем а/б тесты
    setAllABTests(abTests);

    // изменяем у юзера только а/б тесты
    changeUserInfoChunkData({
      ab_tests: abTests
    });

    return res;
  }
}