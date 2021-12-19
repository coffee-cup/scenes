export const rand = (min = 0, max = 1): number => Math.random() * max + min;

export const randItem = <T>(arr: T[]): T => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};
