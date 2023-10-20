import { get } from "lodash";
import r from "../ajax";
import { TechSupportTypes } from "../enums/common/enums";

class TechSupportRepository {
  // Отправляем запрос в тех. поддержку
  public send = (files: File[], type: TechSupportTypes, email: string, comment: string): Promise<boolean> => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("attachments[]", files[ i ]);
    }

    formData.append("email", email);
    formData.append("comment", comment);
    formData.append("type", type);

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