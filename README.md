# 🍕 Pizzaria — Aplicação Fullstack

**Gestão completa de pedidos, mesas e contas** para pizzaria, com **Node.js/Express + TypeScript + Prisma + PostgreSQL** no backend e **React + Vite** no frontend. Autenticação por **JWT**, organização por controladores e modelo de dados claro, pensando em operação de salão (mesas/reservas), cardápio, pedidos/contas e pagamentos.

---

## Sumário

* [Visão Geral](#visão-geral)
* [Funcionalidades](#funcionalidades)
* [Arquitetura & Tecnologias](#arquitetura--tecnologias)
* [Modelagem de Dados (Resumo)](#modelagem-de-dados-resumo)
* [Fluxo de Uso](#fluxo-de-uso)
* [Autenticação & Autorização](#autenticação--autorização)
* [Endpoints (Resumo)](#endpoints-resumo)
* [Variáveis de Ambiente](#variáveis-de-ambiente)
* [Decisões de Design](#decisões-de-design)



---

## Visão Geral

Aplicação **fullstack** com foco em **operar o salão** de uma pizzaria: criação e gerenciamento de **mesas** e **reservas**, **cardápio** por categorias/itens, **pedidos (contas/comanda)** com itens e **pagamentos**. O frontend em React+Vite fornece um painel rápido e responsivo; o backend em Node+Express expõe uma API REST enxuta e segura (JWT).

---

## Funcionalidades

* **Mesas**: criar, listar, atualizar status (livre/ocupada/reservada/bloqueada).
* **Reservas**: marcação por mesa/horário, status (ativa, concluída, cancelada).
* **Funcionários**: cadastro (nome/email/telefone), **cargo** e **turno**, controle de acesso por **perfil**.
* **Cardápio**: categorias (ordenadas) e itens (nome, descrição, preço único, ativo).
* **Pedidos/Contas**: abrir (mesa/balcão/viagem), adicionar itens (snapshot de preço), acompanhar status, fechar.
* **Pagamentos**: múltiplos métodos por pedido/conta, fechar somente quando total quitado.


---

## Arquitetura & Tecnologias

* **Backend**: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL, JWT.
* **Frontend**: React + Vite (TypeScript), React Router, React Query, Axios, CSS Modules.
* **Qualidade**: ESLint, Prettier (opcional), Zod/React Hook Form (forms no front).
* **Padrões**: camadas (routes → controllers → services → prisma), DTOs, interceptors HTTP, variáveis de ambiente.

```
client (React/Vite)  ⇄  API REST (Express/TS)  ⇄  Prisma ORM  ⇄  PostgreSQL
```

---

## Modelagem de Dados (Resumo)



* **Employee** (Funcionário): `id`, `name`, `email`, `phone?`, `role` (`ADMIN`|`MANAGER`|`WAITER`|`KITCHEN`), `shift`, `active`.
* **Table** (Mesa): `id`, `number` (único), `capacity`, `status` (`FREE`|`OCCUPIED`|`RESERVED`|`BLOCKED`).
* **Reservation** (Reserva): `id`, `tableId`, `customerName`, `customerPhone?`, `startsAt`, `endsAt?`, `status`.
* **Category** (Categoria): `id`, `name` (único), `sortIndex`.
* **MenuItem** (Item do Menu): `id`, `name`, `description?`, `price` (decimal), `active`, `categoryId`.
* **Order** (Pedido/Conta): `id`, `type` (`TABLE`|`COUNTER`|`TAKEAWAY`), `tableId?`, `status` (`OPEN`|`IN_PROGRESS`|`CLOSED`|`CANCELLED`), `openedById`, `closedById?`, `openedAt`, `closedAt?`, `total` (cache).
* **OrderItem** (Item do Pedido): `id`, `orderId`, `menuItemId`, `nameSnapshot`, `unitPriceSnapshot`, `quantity`, `notes?`.
* **Payment** (Pagamento): `id`, `orderId`, `method` (`CASH`|`CARD`|`PIX`|... ), `amount`, `change?`, `paidAt`.
* **Auth**: pode reutilizar **Employee** para login; senha/claims fora do escopo do Prisma (hash armazenado em tabela `Auth` ou no próprio Employee).


---

## Fluxo de Uso

1. Criar mesas e, se necessário, reservas.
2. Cadastrar categorias e itens do menu.
3. Abrir **pedido/conta** para uma mesa/balcão/viagem.
4. Adicionar **itens** (com snapshot de preço) e acompanhar status.
5. Registrar **pagamentos** até cobrir o total.
6. **Fechar** a conta e liberar a mesa.

---

## Autenticação & Autorização

* **Login** → `/auth/login` retorna **JWT**.
* Cliente envia `Authorization: Bearer <token>`.
* Middleware **auth** valida token e injeta `req.user` (id, role).
* **RBAC simples**: rotas sensíveis exigem `role` (ex.: `MANAGER` para gerenciar funcionários; `WAITER` para abrir/fechar conta).

---

## Endpoints (Resumo)

### Auth

* `POST /auth/login` — recebe `{ email, senha }` → `{ token, user }`

### Funcionários

* `GET /employees` — lista
* `POST /employees` — cria (admin)
* `PUT /employees/:id` — atualiza (admin)
* `PATCH /employees/:id/toggle` — ativa/inativa (admin)

### Mesas

* `GET /tables` — lista
* `POST /tables` — cria
* `PATCH /tables/:id/status` — muda status (ex.: ocupar/liberar/bloquear)

### Reservas

* `GET /reservations` — lista (filtros por data/mesa)
* `POST /reservations` — cria
* `PATCH /reservations/:id/cancel` — cancela

### Cardápio

* `GET /menu/categories` — lista categorias
* `POST /menu/categories` — cria categoria
* `GET /menu/items` — lista itens (filtros: `active`, `categoryId`)
* `POST /menu/items` — cria item
* `PUT /menu/items/:id` — atualiza
* `PATCH /menu/items/:id/toggle` — ativa/inativa

### Pedidos/Contas

* `POST /orders` — abre pedido `{ type, tableId? }`
* `GET /orders/:id` — detalhe (itens + pagamentos)
* `POST /orders/:id/items` — add item `{ menuItemId, quantity, notes? }`
* `PATCH /orders/:id/status` — muda status (ex.: `IN_PROGRESS`)
* `POST /orders/:id/close` — tenta fechar (valida pagamentos == total)

### Pagamentos

* `POST /orders/:id/payments` — registra pagamento `{ method, amount, change? }`
* `GET /orders/:id/payments` — lista pagamentos

## Variáveis de Ambiente

### Backend (`server/.env`)

```
DATABASE_URL=postgresql://user:pass@localhost:5432/pizzaria
PORT=3333
JWT_SECRET=sua_chave_segura
JWT_EXPIRES_IN=20h
```
## Decisões de Design

* **Simplicidade do domínio**: sem tamanhos/modificadores/cupons no MVP; favorece estabilidade.
* **Total do pedido** calculado via service (soma de itens) e persistido no `Order.total`.
* **Fechamento controlado**: só fecha com pagamentos suficientes.
* **Enums de status** para mesas, pedidos e reservas.
* **JWT + RBAC**: segurança simples e eficiente, extensível para perfis.




