export interface IFeatureToggle {
  name: string;
  value: string;
  comment: string;
  created_at: string;
  updated_at: string;
  // если при обновлении нажали отмену, то тут заполнится поле, чтобы стереть напечатанные данные
  randDataForUpdate?: any;
}

export interface IOnChangeVal {
  name: string;
  value: string;
  comment: string;
}