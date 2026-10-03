# FTECH

## Projeto Integrador II

O **FTECH** é uma plataforma web desenvolvida com o objetivo de organizar e acompanhar treinos físicos, facilitando a interação entre alunos e profissionais de Educação Física.

A proposta busca centralizar informações que muitas vezes ficam distribuídas entre mensagens, planilhas e anotações, permitindo que o aluno consulte seus treinos e registre sua execução, enquanto o professor acompanha sua evolução.

O projeto também considera objetivos relacionados à musculação, preparação física, futebol, corrida e outros contextos que utilizam o treinamento de força.

## Integrantes

- Arthur
- Emerson
- Enzo
- Heitor
- Kauã
- Rafael

**Instituição:** Fatec de Taquaritinga  
**Disciplina:** Projeto Integrador II  
**Curso:** Análise e Desenvolvimento de Sistemas  
**Ano:** 2026

## Funcionalidades

### Aluno
- Cadastro e autenticação
- Visualização e edição do perfil
- Alteração de senha
- Visualização dos treinos e exercícios
- Registro e remoção da conclusão de exercícios
- Histórico de progresso

### Professor
- Acesso aos alunos vinculados
- Criação, edição e arquivamento de treinos
- Cadastro e edição de exercícios
- Acompanhamento da evolução dos alunos

### Administrador
- Gerenciamento de usuários
- Ativação e desativação de usuários
- Gerenciamento do vínculo entre aluno e professor

## Tecnologias utilizadas

**Front-end:** HTML, CSS e JavaScript  
**Back-end:** Node.js e Express  
**Banco de dados:** MySQL  
**Autenticação e segurança:** JWT e bcryptjs

## Estrutura do projeto

```text
FTECH/
├── database/
├── middleware/
├── public/
├── routes/
├── scripts/
├── .env.example
├── .gitignore
├── db.js
├── package.json
├── package-lock.json
└── server.js
```

## Como executar o projeto

### 1. Pré-requisitos
- Node.js
- npm
- MySQL

### 2. Instalar as dependências

```powershell
npm.cmd install
```

### 3. Configurar o ambiente

Crie um arquivo `.env` na raiz do projeto usando `.env.example` como referência:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=SUA_SENHA_DO_MYSQL
DB_NAME=fithtech
JWT_SECRET=SUA_CHAVE_SECRETA
```

> O arquivo `.env` não é enviado ao GitHub por questões de segurança.

### 4. Preparar o banco de dados

Para uma instalação nova:

```powershell
npm.cmd run db
```

Os scripts de atualização do banco estão disponíveis na pasta `scripts`.

### 5. Iniciar o sistema

```powershell
npm.cmd start
```

Acesse no navegador:

```text
http://localhost:3000
```

## Banco de dados

As principais entidades do sistema são:
- Usuários
- Relacionamento entre aluno e professor
- Treinos
- Exercícios
- Progresso

Os arquivos de estrutura e atualização do banco estão disponíveis nas pastas `database` e `scripts`.

## Observação

Projeto desenvolvido para fins acadêmicos na disciplina **Projeto Integrador II** da **Fatec de Taquaritinga**.

## Versão

**FTECH V5.1 — versão final do projeto**
