import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

import Layout from 'components/Layout';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import {
  defaultTitle,
  defaultDescription,
  defaultKeywords,
  TAXA_SELO,
  TAXA_COMISSAO_BANCO,
  TAXA_COMISSAO_LEGAL,
  TAXA_BANCO,
} from 'lib/constants';
import { formatMoney, getImtValue } from 'lib/utils';

import 'styles/index.scss';

const layoutProps = {
  title: defaultTitle,
  description: defaultDescription,
  keywords: defaultKeywords,
};

const Paragraph = styled.p.attrs({
  className: 'main__description',
})``;

const IndexPage = () => {
  const [totalImpostos, setTotalImpostos] = useState(0);
  const [totalComissoes, setTotalComissoes] = useState(0);
  const [totalNecessario, setTotalNecessario] = useState(0);
  const [valorCompra, setValorCompra] = useState('150000');
  const [percentagemEmprestimo, setPercentagemEmprestimo] = useState(80);

  const calculate = useCallback(
    (event?) => {
      if (event && typeof event.preventDefault === 'function') {
        event.preventDefault();
      }

      const valorCompraInt = parseInt(valorCompra, 10);

      const valorEmprestimo = valorCompraInt * (percentagemEmprestimo / 100);

      const valorSelo = valorCompraInt * TAXA_SELO;
      const valorImt = getImtValue(valorCompraInt);
      const valorBanco = valorEmprestimo * TAXA_BANCO;
      let totalImpostosInterno = valorImt + valorSelo + valorBanco;

      const comissaoBanco = valorEmprestimo * TAXA_COMISSAO_BANCO;
      const comissaoLegal = valorCompraInt * TAXA_COMISSAO_LEGAL;
      let totalComissoesInterno = comissaoBanco + comissaoLegal;

      let totalNecessarioInterno =
        valorCompraInt +
        totalImpostosInterno +
        totalComissoesInterno -
        valorEmprestimo;

      if (valorCompraInt < 120000) {
        // Round numbers up to hundreds
        totalImpostosInterno = Math.ceil(totalImpostosInterno / 100) * 100;
        totalComissoesInterno = Math.ceil(totalComissoesInterno / 100) * 100;
        totalNecessarioInterno =
          valorCompraInt +
          totalImpostosInterno +
          totalComissoesInterno -
          valorEmprestimo;
        totalNecessarioInterno = Math.ceil(totalNecessarioInterno / 100) * 100;
      } else {
        // Round numbers up to thousands
        totalImpostosInterno = Math.ceil(totalImpostosInterno / 1000) * 1000;
        totalComissoesInterno = Math.ceil(totalComissoesInterno / 1000) * 1000;
        totalNecessarioInterno =
          valorCompraInt +
          totalImpostosInterno +
          totalComissoesInterno -
          valorEmprestimo;
        totalNecessarioInterno =
          Math.ceil(totalNecessarioInterno / 1000) * 1000;
      }

      setTotalImpostos(totalImpostosInterno);
      setTotalComissoes(totalComissoesInterno);
      setTotalNecessario(totalNecessarioInterno);
    },
    [valorCompra, percentagemEmprestimo],
  );

  const validateAndSetPercentagemEmprestimo = useCallback(
    (value) => {
      if (Number.isNaN(value)) {
        value = 0;
      }

      if (value > 100) {
        value = 100;
      }

      setPercentagemEmprestimo(parseInt(value, 10));
    },
    [setPercentagemEmprestimo],
  );

  useEffect(() => {
    calculate();
  }, [valorCompra, percentagemEmprestimo]);

  return (
    <Layout {...layoutProps}>
      <div className="main common">
        <section className="main__section">
          <h1 className="main__title">
            Calculadora IMT - saiba quanto dinheiro precisa para a compra de uma
            casa em Portugal.
          </h1>
          <Paragraph>
            Aqui pode calcular quanto dinheiro precisa para a compra de uma casa
            (habitação própria e permanente em Portugal Continental), incluindo
            impostos e comissões.
          </Paragraph>
          <Paragraph>
            Os dados introduzidos e os cálculos efetuados nunca saem do seu
            computador.
          </Paragraph>
          <form name="calculadora" onSubmit={calculate}>
            <label className="label" htmlFor="valorCompra">
              Valor escritura (em €)
            </label>
            <TextInput
              className="input"
              type="number"
              name="valorCompra"
              onChange={(event) => {
                setValorCompra(event.target.value);
              }}
              id="valorCompra"
              placeholder="150000"
              min="0"
              value={Number.isNaN(valorCompra) ? '' : valorCompra}
              required
            />
            <label htmlFor="percentagemEmprestimo">
              Percentagem de empréstimo bancário (de 0 a 100)
            </label>
            <TextInput
              className="input"
              type="number"
              name="percentagemEmprestimo"
              onChange={(event) =>
                validateAndSetPercentagemEmprestimo(event.target.value)
              }
              id="percentagemEmprestimo"
              placeholder="80"
              min="0"
              max="100"
              value={
                Number.isNaN(percentagemEmprestimo) ? '' : percentagemEmprestimo
              }
              required
            />
            <Button onClick={calculate}>Calcular</Button>
          </form>
        </section>

        <section className="main__section main__section--no-border">
          <p className="main__title">
            <strong>Total necessário:</strong>{' '}
            <span>{formatMoney(totalNecessario)}</span>
          </p>
          <p className="main__title">
            <strong>Total impostos:</strong>{' '}
            <span>{formatMoney(totalImpostos)}</span>
          </p>
          <p className="main__title">
            <strong>Total comissões:</strong>{' '}
            <span>{formatMoney(totalComissoes)}</span>
          </p>
        </section>
        <section className="main__section main__section--small">
          <h3 className="main__title main__title--small">NOTA</h3>
          <p className="main__description main__description--small">
            Os valores são calculados com uma pequena margem (a mais) e servem
            apenas para referência.
            <br />A única fonte de verdade será a instituição com que trabalhar
            e deve sempre informar-se com a mesma sobre todos os valores a
            pagar.
          </p>
        </section>
        <section className="main__section" />
        <section className="main__section">
          <h3 className="main__title">Como são feitos os cálculos?</h3>
          <Paragraph>
            O Imposto de Selo é {TAXA_SELO * 100}% do valor da escritura.
          </Paragraph>
          <Paragraph>
            O IMT depende do{' '}
            <a
              href="http://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/cimt/Pages/cimt17.aspx"
              target="_blank"
              rel="noopener noreferrer"
            >
              valor da taxa de tabela de IMT
            </a>
            .
          </Paragraph>
          <Paragraph>
            Outros impostos pagos pelo empréstimo bancário são estimados em{' '}
            {TAXA_BANCO * 100}% do valor do empréstimo.
          </Paragraph>
          <Paragraph>
            A comissão do banco é estimada em {TAXA_COMISSAO_BANCO * 100}% do
            valor do empréstimo.
          </Paragraph>
          <Paragraph>
            A comissão legal (notariado e advogados) é estimada em{' '}
            {TAXA_COMISSAO_LEGAL * 100}% do valor da escritura.
          </Paragraph>
          <Paragraph>
            O total necessário é a diferença do empréstimo para o total da
            escritura mais os impostos e comissões.
          </Paragraph>
        </section>
      </div>
    </Layout>
  );
};

export default IndexPage;
