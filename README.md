# 🍕 Pizzaria 

## API REST para atendimento no salão

Sistema de gestão de pizzaria desenvolvido com Node.js, Express, TypeScript, Prisma e PostgreSQL.
Foco em fluxo simples e bem estruturado: mesas, funcionários, cardápio, pedidos, itens de pedido e pagamentos.

---

## Sumário

* [Visão Geral](#visão-geral)
* [Funcionalidades](#funcionalidades)
* [Arquitetura e Tecnologias](#arquitetura-e-tecnologias)
* [Estrutura do Projeto](#estrutura-do-projeto)
* [Modelagem de Dados (Resumo)](#modelagem-de-dados-resumo)
* [Fluxo de Uso](#fluxo-de-uso)
* [Endpoints (Resumo)](#endpoints-resumo)
* [Requisitos](#requisitos)
* [Como Executar](#como-executar)
* [Decisões de Design](#decisões-de-design)
* [Roadmap](#roadmap)
* [Licença](#licença)

---

## Visão Geral

Este backend oferece uma base sólida para operar o salão de uma pizzaria. A proposta é manter um MVP claro e direto, sem cupons, tamanhos, modificadores ou descontos, priorizando confiabilidade, legibilidade e expansão futura.
Frontend (interface web): com React para uma navegação rápida, intuitiva e responsiva no ambiente operacional.

---

## Funcionalidades

* **Mesas:** criação, listagem e controle de status (livre, ocupada, reservada, bloqueada).
* **Funcionários:** cadastro com cargo e turno.
* **Cardápio:** categorias e itens com preço único por item.
* **Pedidos:** abertura, acompanhamento por status e fechamento.
* **Itens do pedido:** quantidade, preço unitário (snapshot) e observações.
* **Pagamentos:** registro por pedido com múltiplos métodos.

---

## Arquitetura e Tecnologias

* **Node.js + Express:** servidor HTTP e roteamento.
* **TypeScript:** tipagem estática para segurança e manutenção.
* **Prisma ORM + PostgreSQL:** camada de dados moderna e confiável.
* **Organização por camadas:** rotas, controllers, utilitários e acesso a dados.
* **Configuração por ambiente:** variáveis para porta e conexão ao banco.
* **React com Vite:** Interface rica em detalhes e responsividade

---

## Estrutura do Projeto

* **Prisma:** definição do schema e migrações do banco.
* **Controllers:** regras de negócio de mesas, cardápio, pedidos e pagamentos.
* **Routes:** mapeamento dos endpoints públicos.
* **Utils:** funções auxiliares (ex.: recálculo de total do pedido).
* **App/DB:** inicialização do servidor e conexão ao banco de dados.

---

## Modelagem de Dados (Resumo)

* **Funcionário:** nome, email, telefone, cargo, turno, ativo.
* **Mesa:** número único, capacidade, status.
* **Cliente (opcional):** nome, telefone, email.
* **Categoria do Cardápio:** nome único, ordenação.
* **Item do Cardápio:** nome, descrição, preço, ativo, categoria.
* **Pedido:** tipo (mesa, balcão, viagem), status, mesa/cliente, aberto/fechado por, total.
* **Item do Pedido:** item de cardápio, quantidade, preço unitário (snapshot), observações.
* **Pagamento:** pedido, método, valor, data, troco (opcional).

---

## Fluxo de Uso

1. Criar mesas com número e capacidade.
2. Cadastrar categorias e itens do cardápio.
3. Abrir pedido vinculado à mesa, balcão ou viagem.
4. Adicionar itens ao pedido (quantidade e preço atual do item).
5. Registrar pagamentos até cobrir o total.
6. Fechar o pedido e liberar a mesa.

---

## Endpoints (Resumo)

* **Mesas:** listar, criar, ocupar, liberar.
* **Cardápio:** listar, criar categoria, criar item.
* **Pedidos:** abrir, detalhar, adicionar item, fechar.
* **Pagamentos:** registrar por pedido.

---

## Requisitos

* Node.js 18 ou superior.
* PostgreSQL acessível (local ou gerenciado).
* Ambiente configurado com variáveis para URL do banco e porta do servidor.
* React 

---

## Como Executar

1. Clonar o repositório e instalar dependências.
2. Definir variáveis de ambiente (URL do banco e porta do servidor).
3. Criar a base e aplicar migrações para gerar as tabelas.
4. Iniciar o servidor em modo desenvolvimento e verificar o healthcheck.

---

## Decisões de Design

* **Simplicidade do domínio:** sem áreas, tamanhos, modificadores, cupons ou descontos.
* **Preço snapshot:** o preço do item é copiado para o item do pedido para manter histórico fiel.
* **Total do pedido:** calculado pela soma de (quantidade × preço unitário) dos itens.
* **Fechamento controlado:** só fecha quando o total estiver quitado pelos pagamentos.
* **Estados claros:** mesas e pedidos possuem enums de status para lógica previsível.

---

## Roadmap

* Reservas integradas ao fluxo de pedidos.
* Painel de cozinha para pedidos em preparo.
* Relatórios de vendas e indicadores operacionais.
* Autenticação e perfis de acesso para funcionários.
.

---
