export interface IDateChecker {
  checkDate(date?: string): boolean;

  checkIsDateFuture(date?: string, afterDate?: string): boolean;

  checkIsDatePast(date?: string, beforeDate?: string): boolean;
}
