export const removeEmpty = <T extends object>(obj: T): Partial<T> => {
  const newObj: Partial<T> = {};

  Object.keys(obj).forEach((key) => {
    const value = (obj as any)[key];

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const nested = removeEmpty(value);
      if (Object.keys(nested).length > 0) {
        (newObj as any)[key] = nested;
      }
    } else if (value !== undefined && value !== null && value !== '') {
      (newObj as any)[key] = value;
    }
  });

  return newObj;
};

export const removeKeys = <T extends object, K extends keyof T>(obj: T, ...keys: K[]) => {
  const _obj = { ...obj };
  for (const key of keys) {
    if (key in _obj) {
      delete _obj[key];
    }
  }
  return _obj;
};
