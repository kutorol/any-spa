// Возвращает мерж двух массивов и возвращает уникальные значения по ключу объекта внутри массива
export const mergeUniqArrays = (arr1: any[], arr2: any[], uniqField: string): any[] => {
  const a = [].concat(arr1, arr2);
  return uniqByField(a, uniqField);
};

// Возвращает уникальные значения по ключу объекта внутри массива
export const uniqByField = (arr: any[], uniqField: string): any[] => {
  // @ts-ignore
  return [...new Map(arr.map(v => [v[ uniqField ], v])).values()];
};