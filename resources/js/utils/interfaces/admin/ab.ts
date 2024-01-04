export interface IABTest {
  id: number;
  key: string;
  total_percent_from_users: number;
  total_users_in_test: number;
  max_count_users_in_test: number;
  active: boolean;
  comment: string;
  created_at: string;
  updated_at: string;
  test_values?: IABTestValue[];
  // если при обновлении нажали отмену, то тут заполнится поле, чтобы стереть напечатанные данные
  randDataForUpdate?: any;
}

export interface IABTestValue {
  id: number;
  ab_test_id: number;
  total_user_with_value: number;
  value: string;
  created_at: string;
  updated_at: string;
}

// Берем все поля кроме указанных
export type IOnCreateFields = Omit<IABTest, "id" | "total_users_in_test" | "max_count_users_in_test" | "created_at" | "updated_at">;