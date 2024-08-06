export const ltrim = (str: string, ch = ''): string => {
  if (!ch) {
    return str.trimStart();
  }
  while (str.startsWith(ch)) {
    str = str.slice(ch.length);
  }
  return str;
};

export const rtrim = (str: string, ch = ''): string => {
  if (!ch) {
    return str.trimEnd();
  }
  while (str.endsWith(ch)) {
    str = str.slice(0, str.length - ch.length);
  }
  return str;
};

export const trim = (str: string, ch = '') => {
  if (!ch) {
    str = str.trim();
  }
  str = rtrim(str, ch);
  return ltrim(str, ch);
};
