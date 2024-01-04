import { get } from "lodash";
import r from "../ajax";
import { ETechSupportTypes } from "../enums/tech-support";
import { getLastPage } from "../funcs/url";

class TechSupportRepository {
  // Отправляем запрос в тех. поддержку
  public send(files: File[], type: ETechSupportTypes, email: string, comment: string): Promise<boolean> {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("attachments[]", files[i]);
    }

    formData.append("email", email);
    formData.append("comment", comment);
    formData.append("type", type);
    formData.append("from_url", getLastPage());

    return r.post("/api/tech-support", {
      formData: formData,
      headers: {
        "Accept": "multipart/form-data"
      }
    }).then(res => get(res, "status", false));
  };
}

const techSupport = new TechSupportRepository();
export default techSupport;