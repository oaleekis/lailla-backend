# Sistema de Cadastro de Finanças com Auth JWT

Este projeto é um backend simples desenvolvido com **NestJS**, utilizando **JWT** para autenticação. 

## Funcionalidades

- **Login** de usuario com autenticação via JWT.
- **Cadastro de usuario** (nome, email, senha).
- **CRUD de Receitas/Despessas**:
  - Criação, leitura, atualização e remoção.
  - Filtragem simples.

## Instalação

### Pré-requisitos

- **Node.js V20+**
- **Postgre**
- **TypeORM**

### Passos para Instalar

1. **Clone o repositório**:
    ```bash
    git clone https://github.com/oaleekis/lailla-backend
    cd lailla-backend
    ```

2. **Instale as dependências**:
    ```bash
    npm install
    ```

3. **Crie um arquivo `.env` com base no env.example** com as seguintes variáveis de ambiente:
    ```env
    DB_HOST=
    DB_PORT=
    DB_USERNAME=
    DB_PASSWORD=
    DB_DATABASE=sua_database
    JWT_SECRET=sua_secret
    JWT_EXPIRATION_TIME='1h'
    DB_SSL=false
    ```


4. **Execute as migrações do banco de dados** para configurar as tabelas:
    ```bash
    npm run migration:run
    ```
5. **Execute as seeds** para ter categorias padrões.
    ```bash
    npm run seed:categories
    ```

6. **Inicie o servidor**:
    ```bash
    npm run start
    ```

## Endpoints

### 1. **Login**
- **Método**: `POST`
- **Rota**: `/auth/login`
- **Descrição**: Realiza o login retorna um token JWT.
- **Corpo da Requisição**:
  ```json
  {
    "email": "user@example.com",
    "password": "senha123"
  }

### 2. **Cadastro de User**
- **Método**: `POST`
- **Rota**: `/users`
- **Descrição**: Cria um novo usuario.
- **Corpo da Requisição**:
  ```json
  {
  "name": "Nome do usuario",
  "email": "user@example.com",
  "password": "senha123"
  }

### 3. **Gerenciamento de Categorias**

- **Método**: `POST`
- **Rota**: `/categories`
- **Descrição**: Cria uma nova categoria (requer autenticação JWT).
- **Corpo da Requisição**:
  ```json
  {
    "name": "Categoria"
  }

---

- **Método**: `GET`
- **Rota**: `/categories`
- **Descrição**: Lista todas as categoria.

---

- **Método**: `GET`
- **Rota**: `/categories/:id`
- **Descrição**: Retorna os detalhes de uma categoria específica.

---

- **Método**: `PUT`
- **Rota**: `/categories/:id`
- **Descrição**: Atualiza os dados de uma categoria.
  ```json
  {
    "name": "Categoria"
  }

---

- **Método**: `DELETE`
- **Rota**: `/categories/:id`
- **Descrição**: Deleta uma categoria.


### 4. **Gerenciamento de Finanças**
- **Método**: `POST`
- **Rota**: `/financial`
- **Descrição**: Cria uma nova receita/despesa (requer autenticação JWT).
- **Corpo da Requisição**:
  ```json
  {
    "categoryId": "id",
    "title": "title",
    "amount": "15915",
    "type": "INCOME", // ou "EXPENSE"
    "date": "2023-10-01T00:00:00Z"
  }

---

- **Método**: `GET`
- **Rota**: `/financial`
- **Descrição**: Lista todas as finanças do user. Aceita parâmetros de filtro.

---

- **Método**: `GET`
- **Rota**: `/financial/:id`
- **Descrição**: Retorna os detalhes de uma finança específica.

---

- **Método**: `PUT`
- **Rota**: `/financial/:id`
- **Descrição**: Atualiza os dados de uma finança.
  ```json
  {
    "categoryId": "id",
    "title": "title",
    "amount": "15915",
    "type": "INCOME", // ou "EXPENSE"
    "date": "2023-10-01T00:00:00Z"
  }

---

- **Método**: `DELETE`
- **Rota**: `/financial/:id`
- **Descrição**: Deleta uma finança.
