export const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export function calcPercent(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}

export const getNumericValue = (
  value: string | number,
  fullSize: number
): number => {
  if (typeof value === "string" && value.trimEnd().endsWith("%")) {
    const cleaned = value.trimEnd().replace(/\s+%$/, "%").slice(0, -1);
    const percent = parseFloat(cleaned);
    if (!isNaN(percent)) {
      return (fullSize * percent) / 100;
    }
  }
  return Number(value);
};
