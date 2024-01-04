import { ELogLevel } from "../../enums/admin/logs";

export interface ILog {
  path: string;
  date: string;
  id: string;
  content?: string;
}

export interface ILogList {
  logs: ILog[];
  page: number;
  totalPages: number;
}

export interface IPreparedLog {
  level: ELogLevel;
  datetime: string;
  prettyJSON: string;
}

export interface IListPreparedLog {
  // @ts-ignore
  [k in ELogLevel]: IPreparedLog;
}