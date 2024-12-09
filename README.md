# Dev Hub - Plataforma de Cursos Interativa

Uma plataforma moderna e interativa para cursos de desenvolvimento de software.

## Funcionalidades

- Sistema de autenticação de usuários
- Catálogo de cursos com filtros e busca
- Sistema de progresso e acompanhamento
- Certificados de conclusão
- Avaliações e comentários
- Interface responsiva e moderna

## Tecnologias Utilizadas

- Node.js com Express
- MySQL para banco de dados
- JWT para autenticação
- Bootstrap para interface
- JavaScript vanilla para interatividade

## Requisitos

- Node.js 14+
- MySQL 5.7+

## Instalação

1. Clone o repositório:
```bash
git clone https://seu-repositorio/dev-hub.git
cd dev-hub
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o banco de dados:
- Crie um banco de dados MySQL
- Execute o script SQL em `config/database.sql`
- Configure as variáveis de ambiente no arquivo `.env`

4. Inicie o servidor:
```bash
npm run dev
```

## Estrutura do Projeto

```
dev-hub/
├── config/             # Configurações do projeto
├── controllers/        # Controladores da aplicação
├── middlewares/       # Middlewares do Express
├── models/            # Modelos de dados
├── public/            # Arquivos estáticos
│   ├── css/
│   ├── js/
│   └── images/
└── routes/            # Rotas da API
```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=devhub
JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=24h
```

## Desenvolvimento

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run dev
```

## Contribuição

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença ISC.
