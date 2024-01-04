// @ts-ignore
import dayjs from "dayjs";
import { MinDate } from "../../../store/constant";

class DateChecker {
  // checkDate Проверяет дату
  public checkDate(date?: string): boolean {
    return dayjs(date).isValid();
  }

  // checkIsDateFuture Проверяет дату, что она в будущем времени (true, если дата в будущем)
  public checkIsDateFuture(date?: string, afterDate?: string): boolean {
    return this.checkDate(date) && dayjs(this.getDayjsFormat(date)).isAfter(afterDate ? this.getDayjsFormat(afterDate) : dayjs());
  }

  // checkIsDatePast Проверяет дату, что она в прошлом времени до указанного времени (true - если в прошлом времени от указанной даты)
  public checkIsDatePast(date?: string, beforeDate?: string): boolean {
    return this.checkDate(date) && dayjs(this.getDayjsFormat(date)).isBefore(this.getDayjsFormat(beforeDate || MinDate));
  }

  // getDayjsFormat возвращает форматированную дату
  private getDayjsFormat(date?: string): string {
    return dayjs(date || null).format("YYYY-MM-DD 00:00:00");
  }
}

const dateChecker = new DateChecker();
export default dateChecker;

