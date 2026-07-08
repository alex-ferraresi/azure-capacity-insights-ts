# Azure Capacity Insights TS

Projeto demonstrativo em **TypeScript** para apresentar conhecimentos de arquitetura, APIs, boas práticas, testes e regras de negócio.

A proposta simula uma API corporativa para inventário e análise de capacidade de VMs em Microsoft Azure, classificando recursos como **subdimensionados**, **superdimensionados** ou **adequados**, com recomendações técnicas.

## Objetivo

Demonstrar domínio em:

- TypeScript com `strict mode`
- Clean Architecture simplificada
- Fastify
- DTOs e validação com Zod
- Separação entre domínio, aplicação, infraestrutura e apresentação
- Regras de negócio testáveis
- Repository Pattern
- Testes unitários com Vitest
- Docker
- ESLint e Prettier
- Tratamento padronizado de erros
- Código orientado a manutenção corporativa

## Como executar

```bash
npm install
cp .env.example .env
npm run dev
```

API disponível em:

```bash
http://localhost:3000
```

## Endpoints

### Healthcheck

```http
GET /health
```

### Listar VMs

```http
GET /vms
```

### Analisar capacidade

```http
POST /capacity/analyze
```

Payload:

```json
{
  "vmName": "prd-app-01",
  "resourceGroup": "rg-production",
  "location": "brazilsouth",
  "sku": "Standard_B2ms",
  "metrics": {
    "cpuAverage": 12.5,
    "cpuPeak": 88.2,
    "memoryAverage": 72.3,
    "memoryPeak": 91.1,
    "diskReadGb": 120.5,
    "diskWriteGb": 260.8
  }
}
```

## Exemplo de resposta

```json
{
  "vmName": "prd-app-01",
  "classification": "UNDER_PROVISIONED",
  "severity": "HIGH",
  "recommendation": "Avaliar resize para SKU superior devido a pico elevado de CPU ou memória.",
  "score": 86
}
```

## Estrutura

```text
src/
  application/
  domain/
  infrastructure/
  presentation/
  shared/
tests/
```

## Sugestão para GitHub

Nome do repositório:

```text
azure-capacity-insights-ts
```

Descrição:

```text
TypeScript API for Azure VM capacity analysis using Clean Architecture, Fastify, Zod and Vitest.
```

## Próximas evoluções

- Integração real com Azure Resource Graph
- Persistência em PostgreSQL
- Autenticação JWT
- Exportação CSV/Excel
- Dashboard com React
- Pipeline GitHub Actions
