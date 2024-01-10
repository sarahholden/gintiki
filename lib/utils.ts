export const generateUniqueKey = (pre: string) => {
  return `${pre}_${new Date().getTime()}`;
};
