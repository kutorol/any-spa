import { ETechSupportStatus } from "../../enums/admin/tech-support";
import { ETechSupportTypes } from "../../enums/tech-support";
import { ELanguages } from "../../enums/user";

export interface IProblemInterface {
  id: number;
  email: string;
  user_id?: number;
  type: ETechSupportTypes;
  status: ETechSupportStatus;
  locale: ELanguages;
  comment: string;
  from_url?: string;
  user_agent?: string;
  ip?: string;
  created_at: string;
  updated_at: string;
}

export interface IResponseAdminTechSupport {
  comment: string;
  created_at: string;
  user_id: number;
  avatar?: string;
  admin_name: string;
  status: ETechSupportStatus;
}

export interface IInfoProblemData {
  problem: IProblemInterface;
  attachments?: IProblemAttachment[];
  comments: IResponseAdminTechSupport[];
}

export interface IProblemAttachment {
  id: number;
  url: string;
  file_name: string;
}

export interface IProblemsList {
  problems: IProblemInterface[];
  page: number;
  totalPages: number;
}
