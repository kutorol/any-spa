import r from "../../ajax";
import { ELanguages } from "../../enums/user";

class AdminI18nRepository {
  // Находит все слова для перевода
  public find(page: number): Promise<any> {
    return r.get(`/api/admin/i18n/list?page=${page}`);
  }

  // Добавляет или обновляет запись перевода
  public upsert(label: string, locale: ELanguages, val: string): Promise<boolean> {
    return r.post(`/api/admin/i18n/upsert`, {
      label: label,
      locale: locale,
      val: val,
      successMsgTimeout: 1000
    }).then(res => Boolean(res.status));
  }
}

const i18nRep = new AdminI18nRepository();
export default i18nRep;