import r from "../../ajax";

class AdminFeatureToggleRepository {
  // Находит все тоглы сайта
  public find(): Promise<any> {
    return r.get(`/api/admin/toggle/list`);
  }

  // Обновляет тогл
  public update(name: string, value: string, comment: string): Promise<boolean> {
    return this.upsert(`/api/admin/toggle/update`, name, value, comment);
  }

  // Добавляет тогл
  public create(name: string, value: string, comment: string): Promise<boolean> {
    return this.upsert(`/api/admin/toggle/create`, name, value, comment);
  }

  // Удаляет тогл
  public delete(name: string): Promise<boolean> {
    return r.delete(`/api/admin/toggle/delete`, {
      name: name,
      successMsgTimeout: 1000
    }).then(res => Boolean(res.status));
  }

  private upsert(url: string, name: string, value: string, comment: string): Promise<boolean> {
    return r.post(url, {
      name: name,
      value: value,
      comment: comment,
      successMsgTimeout: 1000
    }).then(res => Boolean(res.status));
  }
}

const toggle = new AdminFeatureToggleRepository();
export default toggle;