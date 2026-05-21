const bdtFormatter = new Intl.NumberFormat('bn-BD', {
  style: 'currency',
  currency: 'BDT',
  maximumFractionDigits: 0,
});

export const formatBDTPrice = (value) => bdtFormatter.format(Number(value) || 0);