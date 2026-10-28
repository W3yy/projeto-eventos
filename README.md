# 🌿 Natura — Eventos de Ciências

Sistema web para divulgação, organização e gerenciamento de eventos científicos e educacionais. O projeto permite visualizar eventos, consultar informações e administrar seus cadastros por meio de uma interface moderna e responsiva.

## 📌 Sobre o projeto

O **Natura — Eventos de Ciências** foi desenvolvido como um projeto individual, utilizando tecnologias modernas de desenvolvimento web. A aplicação é dividida em frontend e backend, facilitando a organização do código e a comunicação entre a interface e a API.

## ✨ Funcionalidades

- 🏠 Página inicial com apresentação do projeto.
- 📅 Listagem de eventos científicos.
- 🔎 Visualização dos detalhes de cada evento.
- ➕ Cadastro de novos eventos.
- ✏️ Edição de eventos existentes.
- 🗑️ Exclusão de eventos.
- 📝 Formulários para gerenciamento das informações.
- 📄 Página institucional sobre o projeto.
- 🔌 API para comunicação entre frontend e backend.

## 🛠️ Tecnologias utilizadas

### Frontend
- **Next.js** — framework React para desenvolvimento da interface.
- **React** — construção de componentes e páginas.
- **JavaScript / JSX** — lógica e estrutura da aplicação.
- **CSS** — estilização e responsividade.

### Backend
- **Node.js** — ambiente de execução JavaScript.
- **Express** — criação das rotas e da API REST.
- **NPM** — gerenciamento de dependências.

## 📂 Estrutura do projeto

```text
ATV_PFEND1_INDIVIDUAL-main/
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── admin/
│   │       ├── eventos/
│   │       │   └── [id]/
│   │       │       └── editar/
│   │       ├── sobre/
│   │       ├── globals.css
│   │       ├── layout.jsx
│   │       └── page.jsx
│   ├── package.json
│   └── next.config.mjs
│
└── README.md
```

## ⚙️ Pré-requisitos

Antes de executar o projeto, instale:

- [Node.js](https://nodejs.org/) — preferencialmente uma versão LTS compatível com as dependências.
- NPM, instalado junto com o Node.js.
- [Git](https://git-scm.com/), caso queira clonar o repositório.

## 🚀 Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/W3yy/projeto-eventos.git
```

Entre na pasta do projeto:

```bash
cd projeto-eventos
```

### 2. Configure e inicie o backend

Abra um terminal na pasta principal e execute:

```bash
cd backend
npm install
npm run dev
```

O servidor da API deverá iniciar em:

**http://localhost:3001**

Mantenha esse terminal aberto enquanto utilizar a aplicação.

### 3. Configure e inicie o frontend

Abra um segundo terminal na pasta principal do projeto:

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em:

**http://localhost:3000**

Acesse o endereço pelo navegador para utilizar o sistema.

## 🔗 Endereços locais

| Serviço | Endereço |
|---|---|
| Frontend | http://localhost:3000 |
| Backend / API | http://localhost:3001 |

## 🧪 Testando a API

Com o backend em execução, você pode testar uma rota pelo PowerShell:

```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/eventos" -Method Get
```

Para cadastrar ou atualizar eventos, utilize as rotas e os métodos HTTP definidos no backend.

## 💻 Desenvolvimento

O frontend e o backend são executados em terminais separados. Durante o desenvolvimento, o Next.js atualiza a interface conforme os arquivos são alterados, enquanto o Node.js executa a API.

Antes de testar o cadastro, a edição ou a exclusão de eventos, confirme que os dois servidores estão ativos.

## 📌 Observações

- As portas `3000` e `3001` devem estar disponíveis.
- As configurações de ambiente devem corresponder ao ambiente local.
- Não compartilhe senhas, tokens ou arquivos `.env` que contenham informações privadas.
- Os dados cadastrados podem depender da implementação atual do modelo de eventos; confirme como a persistência está configurada antes de utilizar o sistema em produção.

## 👨‍💻 Autor

**Desenvolvido como projeto individual — Natura: Eventos de Ciências.**

## 📄 Licença

Projeto acadêmico. A licença de uso e distribuição deve ser definida conforme os objetivos do autor.
