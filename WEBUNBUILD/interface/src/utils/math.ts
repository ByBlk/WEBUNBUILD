export function twoDecimal(value: number | string) {
  if (typeof value === "string") value = parseFloat(value);
  if (typeof value !== "number") return '';
  const result = value.toFixed(2);
  return result;
};

export function round(value: number, precision: number = 0) {
  if (!precision) return Math.round(value);
  return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
};