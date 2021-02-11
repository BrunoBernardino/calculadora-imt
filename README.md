# Calculadora IMT — Crédito Habitação — Portugal

[![](https://github.com/BrunoBernardino/calculadora-imt/workflows/Run%20Tests/badge.svg)](https://github.com/BrunoBernardino/calculadora-imt/actions?workflow=Run+Tests)

Calculadora IMT, para Crédito Habitação em Portugal. Simulação de valores a pagar para empréstimo imobiliário.

Disponível em [calculadora-imt.onbrn.com](https://calculadora-imt.onbrn.com).

## Development

```bash
make install  # installs dependencies
make start  # starts the app
make pretty  # prettifies the code
make test  # runs linting and tests
make test/update  # runs tests, updating snapshots
make deploy  # deploys to calculadora-imt.onbrn.com (requires `serverless` to be installed globally)
```
