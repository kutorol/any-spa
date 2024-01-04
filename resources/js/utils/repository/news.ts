import r from "../ajax";

// Класс репозитория по работе с новостями сайта
class NewsRepository {
  // Возвращает новости сайта
  public find(page: number): Promise<any> {
    return r.get(`/api/news?page=${page}`);
  }

  // находит лайкнутые новости в профиль юзера
  public findFavorite(page: number): Promise<any> {
    return r.get(`/api/news/favorite?page=${page}`);
  }

  // Возвращает конкретную статью
  public getInfo(id: number): Promise<any> {
    return r.get(`/api/news/info/${id}`);
  }

  // Ставит/убирает лайк со статьи
  public toggleLike(id: number): Promise<any> {
    return r.post(`/api/news/like`, { id });
  }
}

const newsRep = new NewsRepository();
export default newsRep;