# :checkered_flag: Leitura ao Toque

O projeto **Leitura ao Toque** consiste em uma plataforma de vendas exclusiva para livros digitais. A plataforma oferece um catálogo organizado de e-books que podem ser adquiridos pelos clientes após a autenticação no sistema.

A visualização dos livros estará disponível para todos os visitantes do site, mas funcionalidades compra serão restritas aos usuários logados. O administrador do sistema terá controle total, podendo adicionar, atualizar ou remover livros do catálogo conforme necessário. A plataforma visa oferecer uma experiência de leitura digital enriquecedora, com um ambiente fácil de navegar e recursos interativos para os usuários.

## :technologist: Membros da Equipe

- **495670 - Robert Vinícius**  
Curso: Engenharia de Computação

## :people_holding_hands: Papéis ou Tipos de Usuário da Aplicação

A plataforma contará com três tipos de usuários:

- **Administrador**:  
  Usuário com o mais alto nível de acesso e controle sobre o sistema. Suas responsabilidades incluem gerenciar o catálogo de livros, adicionar, atualizar e remover livros.

- **Usuário**:  
  Visitante não autenticado que pode navegar pelo catálogo de livros e visualizar informações básicas como títulos e descrições. Não possui permissão para comprar.

- **Usuário Logado**:  
  Usuário que possui uma conta e fez login na plataforma. Além de poder navegar pelo catálogo, pode comprar livros.

## :spiral_calendar: Entidades ou Tabelas do Sistema

As principais entidades do sistema são:

1. **Livro**  
   - Campos: ID, Título, Autor, Descrição, Preço.
2. **Usuário**  
   - Campos: ID, Nome, Email, Senha.
3. **Pedido**  
   - Campos: ID, ID do Usuário, Lista de Livros.

## :triangular_flag_on_post: Principais Funcionalidades da Aplicação

- **Funcionalidades Gerais (Acessíveis a Todos os Usuários)**:
  - Visualização do catálogo de livros.
  - Visualização de descrições dos livros.

- **Funcionalidades para Usuários Logados**:
  - Compra de livros.
  - Visualização do histórico de pedidos.

- **Funcionalidades para Administradores**:
  - Gerenciamento do catálogo de livros (adicionar, atualizar, remover).

## :desktop_computer: Tecnologias e Frameworks Utilizados

### **Frontend**:
- **Vue.js**: Framework JavaScript para construção de interfaces de usuário.
- **Vue Router**: Biblioteca de roteamento para Vue.js.
- **Pinia**: Gerenciamento de estado para Vue.js.
- **Bootstrap**: Biblioteca CSS para criação de interfaces responsivas.

### **Backend**:
- **Strapi**: Para criação e gestão do backend.
- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **MySQL**: Banco de dados relacional utilizado para armazenar as informações (junto ao strapi).

## :shipit: Rotas da API REST Utilizadas

| Método HTTP | URL                         | Descrição                                                                 |
|-------------|-----------------------------|---------------------------------------------------------------------------|
| `GET`       | `/api/livros/`              | Retorna todos os livros disponíveis no catálogo.                          |
| `GET`       | `/api/livros/:id`           | Retorna detalhes de um livro específico pelo ID.                          |
| `POST`      | `/api/livros`               | Cria um novo livro no catálogo.                                           |
| `PUT`       | `/api/livros/:id`           | Atualiza as informações de um livro existente pelo ID.                    |
| `DELETE`    | `/api/livros/:id`           | Remove um livro do catálogo pelo ID.                                      |
| `GET`       | `/api/usuarios/:id`         | Retorna detalhes de um usuário específico pelo ID.                        |
| `POST`      | `/api/usuarios`             | Cria um novo usuário na plataforma.                                       |
| `POST`      | `/api/login`                | Realiza login de um usuário na plataforma.                                |
| `POST`      | `/api/pedidos`              | Cria um novo pedido de compra para um usuário logado.                     |
| `GET`       | `/api/pedidos`              | Retorna os pedidos do usuário logado.                                     |

## :steam_locomotive: Rotas de Navegação da Aplicação

| Nome da Rota           | URL                       | Descrição                                                         | Proteção  |
|------------------------|---------------------------|-------------------------------------------------------------------|-----------|
| `HomePage`             | `/`                       | Página inicial da plataforma.                                     | Não      |
| `CatalogoPage`         | `/catalogo`               | Página com o catálogo completo de livros.                         | Não      |
| `LivroDetalhesPage`    | `/livro/:id`              | Detalhes de um livro específico.                                  | Não      |
| `UserLogin`            | `/login`                  | Página de login para usuários.                                    | Não      |
| `CheckoutPageView`     | `/checkout/:id`           | Página de checkout para completar a compra de um livro.           | Sim      |
| `MinhasCompras`        | `/compra`                 | Página de histórico de compras do usuário logado.                 | Sim      |
| `AdminDashboard`       | `/admin`                  | Dashboard de administração da plataforma.                         | Sim      |
| `NovoLivro`            | `/admin/novo-livro`       | Página para adicionar um novo livro ao catálogo.                  | Sim      |
| `EditarLivro`          | `/admin/editar-livro/:id` | Página para editar um livro existente no catálogo.                | Sim      |

> **Nota:** As rotas marcadas com "Sim" na coluna Proteção exigem que o usuário esteja autenticado. Caso contrário, o usuário será redirecionado para a página de login.

## :warning::warning::warning: Informações Adicionais

Essas informações devem ser enviadas juntamente com a versão final do projeto.
