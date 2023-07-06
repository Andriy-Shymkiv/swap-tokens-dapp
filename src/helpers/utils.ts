export const getEllipsisString = (str?: string, startChars = 4, endChars = 4): string => {
  if (!str) return '';

  if (str.length <= startChars + endChars) return str;

  return `${str.slice(0, startChars)}...${str.slice(-endChars)}`;
};
