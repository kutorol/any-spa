import r from "../../ajax";
import { ELanguages } from "../../enums/user";
import { IDataCreate, IDataEdit } from "../../interfaces/admin/news";

// Класс репозитория по работе с новостями сайта
class AdminNewsRepository {
  // Возвращает новости сайта
  public findAdmin(page: number): Promise<any> {
    return r.get(`/api/admin/news?page=${page}`);
  }

  // Возвращает конкретную новость
  public getInfo(id: number): Promise<any> {
    return r.get(`/api/admin/news/${id}`);
  }

  // Загружает картиночки в новости в редакторе новостей
  public uploadImage(newsID: number, f: File): Promise<any> {
    const formData = new FormData();
    formData.append("id", newsID.toString());
    formData.append("image", f);

    return r.post("/api/admin/news/upload-image", {
      formData: formData,
      headers: {
        "Accept": "multipart/form-data"
      }
    });
  }

  // Удаляет картинку
  public deleteImage(src: string): Promise<boolean> {
    return r.delete("/api/admin/news/delete-image", {
      src
    }).then(res => Boolean(res.status));
  }

  // Удаляет картинки, которые больше не нужны в новости
  public clearUnUsedImages(newsID: number): Promise<boolean> {
    return r.delete("/api/admin/news/clear-unused-images", {
      id: newsID
    });
  }

  // Находит по id и языку новость, которая будет дублировать текущую новость на другом языке
  public findDuplicate(newsID: number, l: ELanguages): Promise<any> {
    return r.get(`/api/admin/news/duplicate/${newsID}/${l.toString()}`);
  }

  // Создает новость
  public create(data: IDataCreate): Promise<any> {
    const formData = new FormData();
    Object.keys(data).map((k: string) => {
      if (k === "duplicates") {
        Object.keys(data[k]).map((l: ELanguages) => {
          formData.append(`duplicates[${l.toString()}]`, data[k][l]);
        });
        return;
      }

      formData.append(k, data[k]);
    });

    return r.post("/api/admin/news", {
      formData: formData,
      headers: {
        "Accept": "multipart/form-data"
      }
    });
  }

  // Редактирование новости
  public edit(newsID: number, data: IDataEdit): Promise<any> {
    const formData = new FormData();
    formData.append("id", newsID.toString());
    Object.keys(data).map((k: string) => {
      if (k === "duplicates") {
        Object.keys(data[k]).map((l: ELanguages) => {
          formData.append(`duplicates[${l.toString()}]`, data[k][l]);
        });
        return;
      }

      formData.append(k, data[k]);
    });

    return r.post("/api/admin/news/edit", {
      formData: formData,
      headers: {
        "Accept": "multipart/form-data"
      }
    });
  }

  // Возвращает используемые картинки в новости
  public getUploadedNewsImages(newsID: number): Promise<any> {
    return r.get(`/api/admin/news/uploaded-news-images/${newsID}`);
  }

  // Удаляет новость
  public delete(newsID: number): Promise<boolean> {
    return r.delete(`/api/admin/news/delete`, {
      id: newsID
    }).then(res => Boolean(res.status));
  }
}

const newsRep = new AdminNewsRepository();
export default newsRep;