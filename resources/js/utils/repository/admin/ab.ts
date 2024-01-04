import { get } from "lodash";
import r from "../../ajax";
import { IABTest, IABTestValue } from "../../interfaces/admin/ab";

class AbTestRepository {
  // Получаем все а/б тесты
  public find(): Promise<any> {
    return r.get(`/api/admin/ab/list`);
  }

  public info(id: number): Promise<null | IABTest> {
    return r.get(`/api/admin/ab/${id}`).then(res => {
      if (!get(res, "data.ab_test", null)) {
        return null;
      }

      return res.data.ab_test;
    });
  }

  // Удаляет тест
  public delete(id: number): Promise<boolean> {
    return r.delete(`/api/admin/ab/delete`, {
      id: id,
      successMsgTimeout: 1000
    }).then(res => Boolean(res.status));
  }

  // Обновляет тест
  public update(test: IABTest): Promise<boolean> {
    return this.upsert(`/api/admin/ab/update`, test).then(res => Boolean(res.status));
  }

  // Создаем тест
  public create(test: IABTest): Promise<any> {
    return this.upsert(`/api/admin/ab/create`, test);
  }

  private upsert(url: string, test: IABTest): Promise<any> {
    return r.post(url, {
      nameTest: test.key.trim(),
      isActive: test.active ? 1 : 0,
      comment: test.comment.trim(),
      totalPercentFromUsers: test.total_percent_from_users,
      maxCountUsersInTest: test.max_count_users_in_test,
      id: test.id,
      values: (test.test_values || []).map((v: IABTestValue) => {
        return {
          id: v.id,
          value: v.value.trim()
        };
      }),

      successMsgTimeout: 1000
    });
  }
}

const abRep = new AbTestRepository();
export default abRep;