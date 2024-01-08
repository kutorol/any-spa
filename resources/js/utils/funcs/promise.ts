export const boolPromise = (v: boolean = true): Promise<boolean> => {
  // @ts-ignore
  return new Promise<boolean>(r => r(true));
};