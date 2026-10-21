# Natura — Eventos de Ciências da Natureza

Projeto com frontend Next.js e API REST em Node.js/Express para divulgar eventos de Ciências da Natureza.

## Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```
Acesse http://localhost:3000. O frontend inclui página inicial, agenda, detalhe de evento, página sobre e formulário de publicação.

## Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```
Configure no `.env` os dados do MySQL. Crie o banco `eventos_ciencias` no phpMyAdmin e importe `backend/migrations/20261021_1230_criar_tabela_eventos_ciencias.sql`.

API base: http://localhost:3001/api. Rotas de eventos: GET/POST `/eventos`, GET/PUT/PATCH/DELETE `/eventos/:id`, GET `/check`.

A página inicial mostra eventos demonstrativos se a API não estiver disponível; o formulário de publicação requer a API e o banco ativos.
