import { TABELA_IMT } from 'lib/constants';

type FormatMoney = (money: number) => string;

export const formatMoney: FormatMoney = (money) => {
  if (!money || Number.isNaN(money)) {
    return '€ 0';
  }

  return `€ ${Math.round(money)
    .toString()
    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`;
};

type GetImtValue = (valorCompra: number) => number;

export const getImtValue: GetImtValue = (valorCompra) => {
  const tier = TABELA_IMT.find(
    (tax) => valorCompra >= tax.min && valorCompra <= tax.max,
  );

  if (!tier) {
    return 0;
  }

  return valorCompra * tier.tax - tier.deduct;
};
