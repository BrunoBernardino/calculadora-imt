export const defaultTitle = 'Calculadora IMT — Crédito Habitação — Portugal';
export const defaultDescription =
  'Calculadora IMT - saiba quanto dinheiro precisa para a compra de uma casa. Crédito Habitação em Portugal. Simulação de valores a pagar para empréstimo imobiliário.';
export const defaultKeywords =
  'calculadora imt, crédito habitação, simulação, empréstimo imobiliário, portugal';

export const githubUrl = 'https://github.com/BrunoBernardino/calculadora-imt';

export const css = {
  purple: '#3c1143',
  pink: '#c25178',
  white: '#ffffff',
};

export const TAXA_SELO = 0.008;
export const TAXA_COMISSAO_BANCO = 0.008;
export const TAXA_COMISSAO_LEGAL = 0.005;
export const TAXA_BANCO = 0.0015;

export const TABELA_IMT = [
  {
    min: 0,
    max: 92406,
    tax: 0,
    deduct: 0,
  },
  {
    min: 92407,
    max: 126402,
    tax: 0.02,
    deduct: 1848.14,
  },
  {
    min: 126403,
    max: 172347,
    tax: 0.05,
    deduct: 5640.23,
  },
  {
    min: 172348,
    max: 287212,
    tax: 0.07,
    deduct: 9087.22,
  },
  {
    min: 287213,
    max: 574322,
    tax: 0.08,
    deduct: 11959.26,
  },
  {
    min: 574323,
    max: 999999,
    tax: 0.06,
    deduct: 0,
  },
  {
    min: 1000000,
    max: Infinity,
    tax: 0.075,
    deduct: 0,
  },
];
