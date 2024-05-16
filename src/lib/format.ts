export const formattedNetWorth = (netWorth: number) => {
  return `${(netWorth / 1000).toFixed(0)} Billion`;
};
