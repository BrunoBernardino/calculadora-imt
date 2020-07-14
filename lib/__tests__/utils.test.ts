import { formatMoney, getImtValue } from '../utils';

describe('lib/utils', () => {
  it('formatMoney', () => {
    const tests = [
      {
        input: 0,
        output: '€ 0',
      },
      {
        input: NaN,
        output: '€ 0',
      },
      {
        input: 100,
        output: '€ 100',
      },
      {
        input: 100000,
        output: '€ 100.000',
      },
      {
        input: 9999999,
        output: '€ 9.999.999',
      },
    ];

    for (const test of tests) {
      const result = formatMoney(test.input);
      expect(result).toEqual(test.output);
    }
  });

  it('getImtValue', () => {
    const tests = [
      {
        input: 0,
        output: 0,
      },
      {
        input: 10000,
        output: 0,
      },
      {
        input: 100000,
        output: 152,
      },
      {
        input: 300000,
        output: 12041,
      },
      {
        input: 600000,
        output: 36000,
      },
      {
        input: 1000000,
        output: 75000,
      },
      {
        input: 10000000,
        output: 750000,
      },
    ];

    for (const test of tests) {
      const result = getImtValue(test.input);
      expect(Math.round(result)).toEqual(test.output);
    }
  });
});
