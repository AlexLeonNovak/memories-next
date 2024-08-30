export const getArrayObjectValues = <T, K extends keyof T>(array: T[], key: K): NonNullable<T[K]>[] =>
  array
    .map((item) => item[key])
    .filter((keyItem, index, self): keyItem is NonNullable<T[K]> => !!keyItem && self.indexOf(keyItem) === index);
