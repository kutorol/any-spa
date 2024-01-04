import r from "../../ajax";

class AdminLogsRepository {
  // Находит все логи
  public find(page: number): Promise<any> {
    return r.get(`/api/admin/logs/list?page=${page}`);
  }

  // Находит все логи
  public info(id: string): Promise<any> {
    return r.get(`/api/admin/logs/${id}`);
  }

  // Удаляем лог файл
  public delete(path: string): Promise<boolean> {
    return r.delete(`/api/admin/logs`, {
      path: path
    }).then(res => Boolean(res.status));
  }
}

const logsRep = new AdminLogsRepository();
export default logsRep;