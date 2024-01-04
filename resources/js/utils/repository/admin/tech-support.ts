import { get } from "lodash";
import r from "../../ajax";
import { ETechSupportStatus } from "../../enums/admin/tech-support";

class AdminTechSupportRepository {
  // Находит все запросы
  public find(page: number): Promise<any> {
    return r.get(`/api/admin/tech-support/list?page=${page}`);
  }

  // Выводит конкретный запрос
  public info(problemID: number): Promise<any> {
    return r.get(`/api/admin/tech-support/${problemID}`);
  }

  // Отвечаем на запрос / меняем статус
  public changeStatus(problemID: number, status: ETechSupportStatus, comment?: string): Promise<any> {
    return r.post(`/api/admin/tech-support/change-status`, {
      id: problemID,
      comment: comment,
      status: status
    });
  }

  // Удаляем прикрепленные картинки
  public deleteAttach(attachID: number): Promise<boolean> {
    return r.delete(`/api/admin/tech-support/attach`, {
      id: attachID
    }).then(res => Boolean(get(res, "status", false)));
  }
}

const techSupport = new AdminTechSupportRepository();
export default techSupport;