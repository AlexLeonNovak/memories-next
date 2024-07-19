export const random = (min: number, max: number) => {
  if (min > max) {
    const tmp = min;
    min = max;
    max = tmp;
  }
  return min + (max - min) * Math.random();
};
