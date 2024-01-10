export const generateUniqueKey = (pre: string) => {
  return `${pre}_${new Date().getTime()}`;
};

export const formatNumber = (numberToFormat: number | string) =>
  parseInt(`${numberToFormat}`, 10).toLocaleString("en-US");
