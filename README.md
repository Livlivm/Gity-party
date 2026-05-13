# 🎉 GityParty

Sistema web para gerenciamento de eventos desenvolvido com:

- HTML
- CSS
- JavaScript
- Node.js
- Express
- MySQL

O projeto permite cadastrar eventos, visualizar detalhes, adicionar imagens e excluir eventos diretamente do banco de dados.

---

# Funcionalidades

✅ Cadastro de eventos  
✅ Upload de imagens  
✅ Listagem de eventos  
✅ Visualização de detalhes  
✅ Exclusão de eventos  
✅ Integração com banco MySQL  
✅ Interface moderna e responsiva  

---

#  Tela Inicial

Na tela principal os eventos cadastrados aparecem automaticamente vindos do banco de dados.

Cada card mostra:

- imagem do evento
- nome
- data

Ao clicar no evento, o sistema abre uma janela com:

- descrição
- local
- data
- capacidade máxima
- status

---

# Estrutura do Projeto

```bash
frontend/
│
├── index.html
├── style.css
└── script.js

backend/
│
├── controllers/
├── routes/
├── middleware/
├── prisma/
├── server.js
└── .env
```

---

# ⚙️ Tecnologias Utilizadas

## Frontend

- HTML
- CSS
- JavaScript
- Tailwind CDN

## Backend

- Node.js
- Express
- Multer
- Prisma
- MySQL

---

#  Rotas da API

```http
POST   /eventos/cadastrar
POST   /eventos/cadastrar/imagem/:id
GET    /eventos/listar
GET    /eventos/buscar/:id
GET    /eventos/buscar/imagem/:id
PUT    /eventos/atualizar/:id
DELETE /eventos/excluir/:id
```

---

# Banco de Dados

Variáveis utilizadas no `.env`:

```env
PORT=3000

DATABASE_URL="mysql://root@localhost:3306/gitparty"
```

---

# Como Executar

## Instalar dependências

```bash
npm install
```

---

## Rodar servidor

```bash
node server.js
```

ou

```bash
npx nodemon server.js
```

---

# frontend

Abra o arquivo:

```bash
index.html
```

ou utilize extensão Live Server no VSCode.

---

#  Upload de Imagens

As imagens são enviadas utilizando:

- Multer
- FormData
- Fetch API

---

#  Desenvolvido por

Lívia 
