# ✅ Task Manager

Aplicação **Full Stack para gerenciamento de tarefas**, desenvolvida com **Next.js, React, TypeScript e PrimeReact**, integrada a uma **ASP.NET Core Web API**.

O projeto foi desenvolvido com foco em organização de código, experiência do usuário, responsividade e integração entre frontend e backend.

---

## 📸 Preview

> Screenshots da aplicação serão adicionados nesta seção.

### Dashboard

<!-- Adicionar screenshot do Dashboard -->

### Gerenciamento de tarefas

<!-- Adicionar screenshot da listagem -->

### Dark Mode

<!-- Adicionar screenshot do tema escuro -->

---

## 🚀 Funcionalidades

### 📊 Dashboard

- Indicadores resumidos das tarefas
- Distribuição de tarefas por status
- Distribuição de tarefas por prioridade
- Gráficos para acompanhamento das tarefas
- Resumo geral das atividades

### ✅ Gerenciamento de tarefas

- Cadastro de novas tarefas
- Edição de tarefas existentes
- Exclusão com confirmação
- Listagem das tarefas
- Pesquisa de tarefas por título
- Filtros
- Paginação

### 🎨 Interface

- Layout responsivo
- Tema claro e escuro
- Sidebar de navegação
- Feedback visual com Toast
- Indicadores de carregamento
- Validação de formulários
- Componentes reutilizáveis

---

## 🛠️ Tecnologias utilizadas

### Frontend

- Next.js
- React
- TypeScript
- PrimeReact
- PrimeFlex
- Axios
- Chart.js

### Backend

A aplicação frontend consome uma API desenvolvida utilizando:

- ASP.NET Core Web API
- C#
- Swagger / OpenAPI

> O backend pode ser mantido em um repositório separado.

---

## 📁 Estrutura do projeto

```text
task-manager-nextjs/
│
├── public/
│   └── themes/
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── dashboard/
│   │   └── tarefas/
│   │
│   ├── enums/
│   ├── hooks/
│   ├── models/
│   ├── pages/
│   ├── services/
│   └── styles/
│
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Configuração do ambiente

### Pré-requisitos

Para executar o frontend localmente, é necessário ter instalado:

- Node.js
- npm
- Git

Também é necessário que a API do Task Manager esteja disponível para que os dados sejam carregados.

---

## 📥 Clonando o projeto

```bash
git clone https://github.com/leaodiego/task-manager-nextjs.git
```

Entre no diretório:

```bash
cd task-manager-nextjs
```

Instale as dependências:

```bash
npm install
```

---

## 🔐 Variáveis de ambiente

Crie um arquivo:

```text
.env.local
```

na raiz do projeto.

Utilize o arquivo `.env.example` como referência:

```env
NEXT_PUBLIC_API_URL=http://localhost:5161
```

A variável:

```text
NEXT_PUBLIC_API_URL
```

define o endereço utilizado pelo frontend para comunicação com a API.

> O arquivo `.env.local` não deve ser versionado.

---

## ▶️ Executando o projeto

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Depois, abra a aplicação no navegador utilizando o endereço informado pelo Next.js no terminal.

---

## 🧪 Validação do projeto

Para executar o ESLint:

```bash
npm run lint
```

Para gerar o build de produção:

```bash
npm run build
```

---

## 🔄 Integração com a API

A comunicação com o backend está centralizada na camada de serviços:

```text
src/services/
```

A URL base da API é obtida através da variável:

```ts
process.env.NEXT_PUBLIC_API_URL
```

Isso evita manter o endereço da API diretamente no código
