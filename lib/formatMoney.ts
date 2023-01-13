const formatMoney = (value: number): string => {
  return `$${value.toFixed(2)}`;
};

export { formatMoney };
