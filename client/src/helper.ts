export const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export function calcPercent(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}