# índice

* [Como iniciar o projeto](#Como-iniciar-o-projeto)
* [Tecnologias usadas](#Tecnologias-usadas)
* [Rotas protegidas](#Rotas-protegidas)
  * [Rotas administrativas](#Rotas-administrativas)
  * [Rotas de usuários comuns](#Rotas-de-usuários-comuns)
* [Funcionamento](#Funcionamento)
    * [Observações](#Observações)
    * [Apontamento](#Apontamento-(Funcionamento))
      * [Criação do apontamento](#Criação-do-apontamento-(Funcionamento))
      * [Edição do apontamento](#Edição-do-apontamento-(Funcionamento))
      * [Deleção do apontamento](#Deleção-do-apontamento-(Funcionamento))
    * [Assunto](#Assunto-(Funcionamento))
      * [Criação do assunto](#Criação-do-assunto-(Funcionamento))
      * [Edição do assunto](#Edição-do-assunto-(Funcionamento))
      * [Deleção do assunto](#Deleção-do-assunto-(Funcionamento))
    * [Tema](#Tema-(Funcionamento))
      * [Criação do tema](#Criação-do-tema-(Funcionamento))
      * [Edição do tema](#Edição-do-tema-(Funcionamento))
      * [Deleção do tema](#Deleção-do-tema-(Funcionamento))
    * [Usuário](#Usuário-(Funcionamento))
      * [Criação do usuário](#Criação-do-usuário-(Funcionamento))
      * [Edição do usuário](#Edição-do-usuário-(Funcionamento))
      * [Deleção da minha conta](#Deleção-da-minha-conta-(Funcionamento))
      * [Adm deletar usuário](#Adm-deletar-usuário-(Funcionamento))
      * [Login](#Login-(Funcionamento))
      * [Logout](#Logout-(Funcionamento))
      * [Recuperar senha](#Recuperar-senha-(Funcionamento))
* [Rotas](#Rotas)
  * [Apontamento](#Apontamento)
    * [Pegar todos os apontamentos](#Pegar-todos-os-apontamentos)
    * [Pegar o apontamento pelo id](#Pegar-o-apontamento-pelo-id)
    * [Criar apontamento](#Criar-apontamento)
    * [Editar apontamento](#Editar-apontamento)
    * [Deletar apontamento](#Deletar-apontamento)
    * [Pesquisar apontamentos](#Pesquisar-apontamentos)
  * [Assunto](#Assunto)
    * [Pegar todos os assuntos](#Pegar-todos-os-assuntos)
    * [Pegar o assunto pelo id](#Pegar-o-assunto-pelo-id)
    * [Pegar o assunto pelo slug](#Pegar-o-assunto-pelo-slug)
    * [Criar assunto](#Criar-assunto)
    * [Editar assunto](#Editar-assunto)
    * [Deletar assunto](#Deletar-assunto)
  * [Tema](#Tema)
    * [Pegar todos os temas](#Pegar-todos-os-temas)
    * [Pegar o tema pelo id](#Pegar-o-tema-pelo-id)
    * [Pegar o tema pelo slug](#Pegar-o-tema-pelo-slug)
    * [Criar tema](#Criar-tema)
    * [Editar tema](#Editar-tema)
    * [Deletar tema](#Deletar-tema)
  * [Usuário](#Usuário)
    * [Pegar todos os usuários](#Pegar-todos-os-usuários)
    * [Pegar o usuário pelo id](#Pegar-o-usuário-pelo-id)
    * [Pegar o usuário pelo email](#Pegar-o-usuário-pelo-email)
    * [Login](#Login)
    * [Logout](#Logout)
    * [Criar conta](#Criar-conta)
    * [Editar conta](#Editar-conta)
    * [Enviar email de recuperação de senha](#Enviar-email-de-recuperação-de-senha)
    * [Mudar senha](#Mudar-senha)
    * [Enviar email de deleção de conta](#Enviar-email-de-deleção-de-conta)
    * [Deletar minha conta](#Deletar-minha-conta)
    * [Adm deletar usuário](#Adm-deletar-usuário)

# Como iniciar o projeto

### 1- Instale todas as dependências

```
npm intall
```

### 2- Crie variávei de ambiente, siga o exemplo que está no arquivo .env.example
### 3- Inicie o projeto

```
node index
```

# Tecnologias usadas

<table>
  <tr>
    <td>MongoDB</td>
    <td>Mongoose</td>
  </tr>
  <tr>
    <td>^5.2.0</td>
    <td>^7.0.3</td>
  </tr>
</table>

# Rotas protegidas

## Rotas administrativas

```
router.get("/usuarios") // Todos os usuários
```

```
router.delete("/usuario/:id") // Adm deletar usuário
```

```
router.post("/assunto") // Criar assunto
```

```
router.put("/assunto") // Editar assunto
```

```
router.delete("/assunto/:id") // Deletar assunto
```

```
router.post("/tema") // Criar tema
```

```
router.put("/tema") // Editar tema
```

```
router.delete("/tema/:id") // Deletar tema
```

```
router.post("/apontamento") // Criar apontamento
```

```
router.put("/apontamento") // Editar apontamento
```

```
router.delete("/apontamento/:id") // Deletar apontamento
```

## Rotas de usuários comuns

```
router.get("/usuario/:id") // Usuário pelo id
```

```
router.get("/usuario/email/:email") // Usuário pelo email
```

```
router.put("/usuario") // Editar usuário
```

```
router.post("/recuperarsenha/:email") // Enviar email de recuperação de senha
```

```
router.post("/mudarsenha/:token") // Mudar senha
```

```
router.post("/usuario/:id/:email") // Enviar email de deleção de conta
```

```
router.delete("/deletarconta/:token") // Deletar minha conta
```

```
router.post("/logout", UsuarioAuth, new UsuarioController().logout) // Terminar sessão
```
# Funcionamento

## Observações
* Você pode fazer as requisições pelos seguintes links:

```
https://apiminhamente.onrender.com
```
```
https://apiminhamente.vercel.app
```

## Apontamento (Funcionamento)

### Criação do apontamento (Funcionamento)

- Validação dos elementos recebidos (título, conteúdo, assuntos, temas, miniaturas)
- Fazer upload da miniatura para a pasta "temp" usando o path e multer (no arquivo das rotas)
- Fazer upload da miniatura que tá na pasta "temp" para a Cloudinary e retornando um objeto do CDN da imagem
- Deletar a miniatura que tá na pasta "temp"
- Criar o apontamento no banco de dados

### Edição do apontamento (Funcionamento)

- Validação dos elementos recebidos (título, conteúdo, assuntos, temas, miniaturas)
- Procurar o apontamento recebido e verificar se existe
- Deletar miniatura antiga salva na nuvem
- Fazer upload da miniatura para a pasta "temp" usando o path e multer (no arquivo das rotas)
- Fazer upload da miniatura que tá na pasta "temp" para a Cloudinary e retornando um objeto do CDN da imagem
- Deletar a miniatura que tá na pasta "temp"
- Editar o apontamento no banco de dados

### Deleção do apontamento (Funcionamento)

- Procurar um apontamento que corresponde ao apontamento recebido
- Deletar ele dos assuntos e temas que ele pertence
- Deletar o apontamento

## Assunto (Funcionamento)

### Criação do assunto (Funcionamento)

- Validação dos elementos recebidos (nome, ícone)
- Verificar se já existe um assunto com esse nome
- Criar assunto no banco de dados

### Edição do assunto

- Validação dos elementos recebidos (nome, ícone)
- Procurar o assunto recebido
- Verificar se já existe um assunto com esse nome
- Editar o assunto no banco de dados

### Deleção do assunto (Funcionamento)

- Procurar um assunto que corresponde ao assunto recebido
- Deletar ele dos apontamentos que pertence e deletar todos os temas que pertencem a ele
- Deletar o assunto

## Tema (Funcionamento)

### Criação do tema (Funcionamento)

- Validação dos elementos recebidos (nome, ícone)
- Verificar se já existe um tema com esse nome
- Criar tema no banco de dados

### Edição do tema (Funcionamento)

- Validação dos elementos recebidos (nome, ícone)
- Procurar o tema recebido
- Verificar se já existe um assunto com esse nome
- Editar o tema no banco de dados

### Deleção do tema (Funcionamento)

- Procurar um tema que corresponde ao assunto recebido
- Deletar ele dos assuntos e apontamentos que ele pertence
- Deletar o tema

## Usuário (Funcionamento)

### Criação do usuário (Funcionamento)

- Validação dos elementos recebidos (avatar, nome, email, senha)
- Verfificar se o email já tá cadastrado
- Fazer upload do avatar para a pasta "temp" usando o path e multer (no arquivo das rotas)
- Fazer upload do avatar que tá na pasta "temp" para a Cloudinary e retornando um objeto do CDN da imagem
- Deleta do avatar que tá na pasta "temp"
- Criar usuário no banco de dados

### Edição do usuário (Funcionamento)

- Validação dos elementos recebidos
- Procurar o assunto recebido, e verificar se existe
- Deletar avatar antigo salvo na nuvem
- Fazer upload do avatar para a pasta "temp" usando o path e multer (no arquivo das rotas)
- Fazer upload do avatar que tá na pasta "temp" para a Cloudinary e retornando um objeto do CDN da imagem
- Deleta do avatar que tá na pasta "temp"
- Adicionar o token de login antigo à lista negra
- Editar conta

### Deleção da minha conta (Funcionamento)

- Validar se a conta a ser deletada pertence a esse usuário
- Criar token de deleção da conta
- Enviar o token pra o email do usuário
- Validar o token depois do usuário entrar na página e verificar que quer deletar, se o token já foi usado retornar false, mas se não, retorna o token
- Procurar o dono do token
- Deletar o usuário, e o avatar que tá na nuvem
- Definir o token como usado

### Adm deletar usuário (Funcionamento)

- Validação dos elementos recebidos
- Verificar se usuário existe
- Deletar usuário, e o avatar que tá na nuvem

### Login (Funcionamento)

- Validação dos elementos recebidos
- Procurar a conta do usuário usando o email recebido
- Usar o bcrypt pra descriptografar a hash, e comparar a senha recebida e a senha do banco de dados
- Se as senhas forem iguais criar um token usando o JWS (Jason Web Token)
- Verificar se o token criado tá na lista negra
- Retornar o usuário e o token dele

## Logout (Funcionamento)

- Adicionar o token do usuário à lista negra

## Mudar/recuperar senha (Funcionamento)

- Validar se a conta a ter a senha mudada pertence a esse usuário
- Criar token de recuperação de senha
- Enviar o token pra o email do usuário
- Validar o token depois do usuário entrar na página e verificar que quer recuperar a senha, se o token já foi usado retornar false, mas se não, retorna o token
- Criar nova senha e definir o token como usado

# Rotas

## Apontamento

### Pegar todos os apontamentos

```
https://apiminhamente.onrender.com/apontamentos
```

### Requisição
```
import axios from "axios";

let config = {
  method: 'get',
  url: 'https://apiminhamente.onrender.com/apontamentos'
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
[
 {
  "_id": ObjectId("616d6efb46c45b7f064526e3"),
  "id": "616d6efb46c",
  "titulo": "Título do apontamento",
  "slug": "Título_do_apontamento",
  "conteudo": "Conteúdo do apontamento",
  "miniatura": "https://miniatura.com.br",
  "miniatura_public_id": "miniaturaDSF35.jpg",
  "visibilidade": true,
  "assuntos": [],
  "temas": [],
  "created_at": Thu Apr 20 2023 23:29:42 GMT+0100,
  "edited_at": Thu Apr 20 2023 23:29:42 GMT+0100,
 }
 ...
]
```

### Exemplo de resposta de erro
```
{
  "erro": "Erro ao encontrar apontamentos"
}
```

### Exemplo de resposta não encontrada
```
{
  "erro": "Nenhum apontamento encontrado"
}
```

### Pegar o apontamento pelo id

```
https://apiminhamente.onrender.com/apontamento/:id
```

#### Parâmetros

* id - É o id do apontamento

### Requisição
```
import axios from "axios";

let config = {
  method: 'get',
  url: 'https://apiminhamente.onrender.com/apontamento/:id'
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
{
  "_id": ObjectId("616d6efb46c45b7f064526e3"),
  "id": "616d6efb46c",
  "titulo": "Título do apontamento",
  "slug": "Título_do_apontamento",
  "conteudo": "Conteúdo do apontamento",
  "miniatura": "https://miniatura.com.br",
  "miniatura_public_id": "miniaturaDSF35.jpg",
  "visibilidade": true,
  "assuntos": [],
  "temas": [],
  "created_at": Thu Apr 20 2023 23:29:42 GMT+0100,
  "edited_at": Thu Apr 20 2023 23:29:42 GMT+0100,
}
```

### Exemplo de resposta de erro
```
{
  "erro": "Erro ao encontrar o apontamento"
}
```

### Exemplo de resposta não encontrada
```
{
  "erro": "Nenhum apontamento encontrado"
}
```

### Criar apontamento

```
https://apiminhamente.onrender.com/apontamento
```

#### Segurança
Esta API usa Bearer Token como um método de autenticação.

- Nome: authorization
- Em: header

#### Elementos

* titulo - String (required)
* conteudo - String (required)
* assuntos - Array com o _id dos assuntos (required)
* temas - Array com o _id dos temas
* visibilidade - Boolean, (required, false é o valor padrão)
* miniatura - Imagem (png, jpg, jpeg) (required)

### Requisição
```
import axios from "axios";

const formData = new FormData();
let titulo = "Título do apontamento"
let conteudo = "Conteúdo do apontamento"
let assuntos = ["616d6efb46c45b7f064526e3"]
let temas = ["616d6efb46c45b7f064526e3"]
let visibilidade = true
let miniatura = "file.png"

formData.append('titulo', titulo);
formData.append('conteudo', conteudo);
formData.append('assuntos', assuntos);
formData.append('temas', temas);
formData.append('visibilidade', visibilidade);
formData.append('miniatura', miniatura);

axios.post("https://apiminhamente.onrender.com/apontamento", formData, {headers: {'authorization': 'token de login'}})
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
{
 {
  "_id": ObjectId("616d6efb46c45b7f064526e3"),
  "id": "616d6efb46c",
  "titulo": "Título do apontamento",
  "slug": "Título_do_apontamento",
  "conteudo": "Conteúdo do apontamento",
  "miniatura": "https://miniatura.com.br",
  "miniatura_public_id": "miniaturaDSF35.jpg",
  "visibilidade": true,
  "assuntos": ["616d6efb46c45b7f064526e3"],
  "temas": ["616d6efb46c45b7f064526e3"],
  "created_at": Thu Apr 20 2023 23:29:42 GMT+0100,
  "edited_at": Thu Apr 20 2023 23:29:42 GMT+0100,
 },
 "msg": "apontamento criado com sucesso"
}
```

### Exemplo de resposta de erro
```
{
  "erro": "Erro ao criar apontamento"
}
```

### Editar apontamento

```
https://apiminhamente.onrender.com/apontamento
```

#### Segurança
Esta API usa Bearer Token como um método de autenticação.

- Nome: authorization
- Em: header

#### Elementos

* id - id do apontamento (required)

### Requisição
```
import axios from "axios";

const formData = new FormData();
let id = "n5jSDHH7dsf"
let conteudo = "Novo conteúdo"

formData.append('id', id);
formData.append('conteudo', conteudo);

axios.put("https://apiminhamente.onrender.com/apontamento", formData, {headers: {'authorization': 'token de login'}})
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
{
 {
  "_id": ObjectId("616d6efb46c45b7f064526e3"),
  "id": "616d6efb46c",
  "titulo": "Título do apontamento",
  "slug": "Título_do_apontamento",
  "conteudo": "Conteúdo do apontamento",
  "miniatura": "https://miniatura.com.br",
  "miniatura_public_id": "miniaturaDSF35.jpg",
  "visibilidade": true,
  "assuntos": ["616d6efb46c45b7f064526e3"],
  "temas": ["616d6efb46c45b7f064526e3"],
  "created_at": Thu Apr 20 2023 23:29:42 GMT+0100,
  "edited_at": Thu Apr 20 2023 23:29:42 GMT+0100,
 },
 "msg": "apontamento editado com sucesso"
}
```

### Exemplo de resposta de erro
```
{
  "erro": "Erro ao editar apontamento"
}
```

### Deletar apontamento

```
https://apiminhamente.onrender.com/apontamento/:id
```

#### Segurança
Esta API usa Bearer Token como um método de autenticação.

- Nome: authorization
- Em: header

#### Parâmetros

* id - id do apontamento

### Requisição
```
import axios from "axios";

let config = {
  method: 'delete',
  url: 'https://apiminhamente.onrender.com/apontamento/:id',
  headers: {
    'authorization': 'token de login'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
{
 {
  "_id": ObjectId("616d6efb46c45b7f064526e3"),
  "id": "616d6efb46c",
  "titulo": "Título do apontamento",
  "slug": "Título_do_apontamento",
  "conteudo": "Conteúdo do apontamento",
  "miniatura": "https://miniatura.com.br",
  "miniatura_public_id": "miniaturaDSF35.jpg",
  "visibilidade": true,
  "assuntos": ["616d6efb46c45b7f064526e3"],
  "temas": ["616d6efb46c45b7f064526e3"],
  "created_at": Thu Apr 20 2023 23:29:42 GMT+0100,
  "edited_at": Thu Apr 20 2023 23:29:42 GMT+0100,
 },
 "msg": "Apontamento deletado com sucesso"
}
```

### Exemplo de resposta de erro
```
{
  "erro": "Erro ao deletar apontamento"
}
```

### Pesquisar apontamentos

```
https://apiminhamente.onrender.com/results
```

### Parâmetros (query param)

* pesquisa - Elementos da pesquisa

### Requisição
```
import axios from "axios";

let config = {
  method: 'get',
  url: 'https://apiminhamente.onrender.com/results',
  params: {
    pesquisa: "Título"
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
[
 {
  "_id": ObjectId("616d6efb46c45b7f064526e3"),
  "id": "616d6efb46c",
  "titulo": "Título do apontamento",
  "slug": "Título_do_apontamento",
  "conteudo": "Conteúdo do apontamento",
  "miniatura": "https://miniatura.com.br",
  "miniatura_public_id": "miniaturaDSF35.jpg",
  "visibilidade": true,
  "assuntos": [],
  "temas": [],
  "created_at": Thu Apr 20 2023 23:29:42 GMT+0100,
  "edited_at": Thu Apr 20 2023 23:29:42 GMT+0100,
 }
 ...
]
```

### Exemplo de resposta de erro
```
{
  "erro": "Erro ao encontrar apontamentos"
}
```

### Exemplo de resposta não encontrada
```
{
  "erro": "Nenhum apontamento encontrado"
}
```

## Assunto

### Pegar todos os assuntos

```
https://apiminhamente.onrender.com/assuntos
```

### Requisição
```
import axios from "axios";

let config = {
  method: 'get',
  url: 'https://apiminhamente.onrender.com/assuntos'
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
[
 {
  "_id": ObjectId("616d6efb46c45b7f064526e3"),
  "nome": "Nome do assunto",
  "slug": "Nome_do_assunto",
  "icone": "<i class='icon solid-icon'></i>",
  "apontamentos": [
    "616d6efb46c45b7f064526e3"
  ],
  "temas": [
    "616d6efb46c45b7f064526e3"
  ],
  "created_at": Thu Apr 20 2023 23:29:42 GMT+0100,
  "edited_at": Thu Apr 20 2023 23:29:42 GMT+0100,
 }
 ...
]
```

### Exemplo de resposta de erro
```
{
  "erro": "Erro ao encontrar assuntos"
}
```

### Exemplo de resposta não encontrada
```
{
  "erro": "Nenhum assunto encontrado"
}
```

### Pegar o assunto pelo id

```
https://apiminhamente.onrender.com/assunto/:id
```

#### Parâmetros

* id - É o ObjectId do assunto

### Requisição
```
import axios from "axios";

let config = {
  method: 'get',
  url: 'https://apiminhamente.onrender.com/assunto/:id'
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
{
"_id": ObjectId("616d6efb46c45b7f064526e3"),
"nome": "Nome do assunto",
"slug": "Nome_do_assunto",
"icone": "<i class='icon solid-icon'></i>",
"apontamentos": [
  "616d6efb46c45b7f064526e3"
],
"temas": [
  "616d6efb46c45b7f064526e3"
],
"created_at": Thu Apr 20 2023 23:29:42 GMT+0100,
"edited_at": Thu Apr 20 2023 23:29:42 GMT+0100,
}
```

### Exemplo de resposta de erro
```
{
  "erro": "Erro ao encontrar o assunto"
}
```

### Exemplo de resposta não encontrada
```
{
  "erro": "Nenhum assunto encontrado"
}
```

### Pegar o assunto pelo slug

```
https://apiminhamente.onrender.com/apontamento/assunto/slug/:slug
```

#### Parâmetros

* slug - É o slug do assunto

### Requisição
```
import axios from "axios";

let config = {
  method: 'get',
  url: 'https://apiminhamente.onrender.com/assunto/slug/:slug'
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
{
 {
  "_id": ObjectId("616d6efb46c45b7f064526e3"),
  "nome": "Nome do assunto",
  "slug": "Nome_do_assunto",
  "icone": "<i class='icon solid-icon'></i>",
  "apontamentos": [
    "616d6efb46c45b7f064526e3"
  ],
  "temas": [
    "616d6efb46c45b7f064526e3"
  ],
  "created_at": Thu Apr 20 2023 23:29:42 GMT+0100,
  "edited_at": Thu Apr 20 2023 23:29:42 GMT+0100,
 }
}
```

### Exemplo de resposta de erro
```
{
  "erro": "Erro ao encontrar o assunto"
}
```

### Exemplo de resposta não encontrada
```
{
  "erro": "Nenhum assunto encontrado"
}
```

### Criar assunto

```
https://apiminhamente.onrender.com/assunto
```

#### Segurança
Esta API usa Bearer Token como um método de autenticação.

- Nome: authorization
- Em: header

#### Elementos

* nome - String (required)
* icone - String da classe do ícone do fontawesome (required)

### Requisição
```
import axios from "axios";

let config = {
  method: 'post',
  url: 'https://apiminhamente.onrender.com/assunto',
  headers: {
    'authorization': 'token de login'
  },
  data: {
    nome: "Nome do assunto",
    icone: "<i class='icon solid-icon'></i>",
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
{
 {
  "_id": ObjectId("616d6efb46c45b7f064526e3"),
  "nome": "Nome do assunto",
  "slug": "Nome-do-assunto",
  "icone": "<i class='icon solid-icon'></i>",
  "apontamentos": [
    "616d6efb46c45b7f064526e3"
  ],
  "temas": [
    "616d6efb46c45b7f064526e3"
  ],
  "created_at": Thu Apr 20 2023 23:29:42 GMT+0100,
  "edited_at": Thu Apr 20 2023 23:29:42 GMT+0100,
 },
 "msg": "Assunto criado com sucesso"
}
```

### Exemplo de resposta de erro
```
{
  "erro": "Erro ao criar assunto"
}
```

### Editar assunto

```
https://apiminhamente.onrender.com/assunto
```

#### Segurança
Esta API usa Bearer Token como um método de autenticação.

- Nome: authorization
- Em: header

#### Elementos

* id - ObjectId do assunto (required)

### Requisição
```
import axios from "axios";

let config = {
  method: 'post',
  url: 'https://apiminhamente.onrender.com/assunto',
  headers: {
    'authorization': 'token de login'
  },
  data: {
     nome: "Novo nome do assunto"
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
{
 {
  "_id": ObjectId("616d6efb46c45b7f064526e3"),
  "nome": "Novo nome do assunto",
  "slug": "Novo-nome-do-assunto",
  "icone": "<i class='icon solid-icon'></i>",
  "apontamentos": [
    "616d6efb46c45b7f064526e3"
  ],
  "temas": [
    "616d6efb46c45b7f064526e3"
  ],
  "created_at": Thu Apr 20 2023 23:29:42 GMT+0100,
  "edited_at": Thu Apr 20 2023 23:29:42 GMT+0100,
 },
 "msg": "Assunto editado com sucesso"
}
```

### Exemplo de resposta de erro
```
{
  "erro": "Erro ao editar assunto"
}
```

### Deletar assunto

```
https://apiminhamente.onrender.com/assunto/:id
```

#### Segurança
Esta API usa Bearer Token como um método de autenticação.

- Nome: authorization
- Em: header

#### Parâmetros

* id - ObjectId do assunto (required)

### Requisição
```
import axios from "axios";

let config = {
  method: 'post',
  url: 'https://apiminhamente.onrender.com/assunto/:id',
  headers: {
    'authorization': 'token de login'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
{
 {
  "_id": ObjectId("616d6efb46c45b7f064526e3"),
  "nome": "Novo nome do assunto",
  "slug": "Novo-nome-do-assunto",
  "icone": "<i class='icon solid-icon'></i>",
  "apontamentos": [
    "616d6efb46c45b7f064526e3"
  ],
  "temas": [
    "616d6efb46c45b7f064526e3"
  ],
  "created_at": Thu Apr 20 2023 23:29:42 GMT+0100,
  "edited_at": Thu Apr 20 2023 23:29:42 GMT+0100,
 },
 "msg": "Assunto deletado com sucesso"
}
```

### Exemplo de resposta de erro
```
{
  "erro": "Erro ao deletar assunto"
}
```

## Tema

### Pegar todos os temas

```
https://apiminhamente.onrender.com/temas
```

### Requisição
```
import axios from "axios";

let config = {
  method: 'get',
  url: 'https://apiminhamente.onrender.com/temas'
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
{
  "_id": ObjectId("616d6efb46c45b7f064526e3"),
  "titulo": "Título do tema",
  "slug": "Título-do-tema",
  "assunto": "616d6efb46c45b7f064526e3",
  "apontamentos": ["616d6efb46c45b7f064526e3"],
  "created_at": Thu Apr 20 2023 23:29:42 GMT+0100,
  "edited_at": Thu Apr 20 2023 23:29:42 GMT+0100,
}
```

### Exemplo de resposta de erro
```
{
  "erro": "Erro ao encontrar temas"
}
```

### Exemplo de resposta não encontrada
```
{
  "erro": "Nenhum tema encontrado"
}
```

### Pegar o tema pelo id

```
https://apiminhamente.onrender.com/tema/:id
```

#### Parâmetros

* id - É o ObjectId do tema

### Requisição
```
import axios from "axios";

let config = {
  method: 'get',
  url: 'https://apiminhamente.onrender.com/tema/:id'
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
{
"_id": ObjectId("616d6efb46c45b7f064526e3"),
"titulo": "Título do tema",
"slug": "Título-do-tema",
"assunto": "616d6efb46c45b7f064526e3",
"apontamentos": ["616d6efb46c45b7f064526e3"],
"created_at": Thu Apr 20 2023 23:29:42 GMT+0100,
"edited_at": Thu Apr 20 2023 23:29:42 GMT+0100,
}
```

### Exemplo de resposta de erro
```
{
  "erro": "Erro ao encontrar o tema"
}
```

### Exemplo de resposta não encontrada
```
{
  "erro": "Nenhum tema encontrado"
}
```

### Pegar o tema pelo slug

```
https://apiminhamente.onrender.com/tema/slug/:slug
```

#### Parâmetros

* slug - É o slug do tema

### Requisição
```
import axios from "axios";

let config = {
  method: 'get',
  url: 'https://apiminhamente.onrender.com/tema/slug/:slug'
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
{
  "_id": ObjectId("616d6efb46c45b7f064526e3"),
  "titulo": "Título do tema",
  "slug": "Título-do-tema",
  "assunto": "616d6efb46c45b7f064526e3",
  "apontamentos": ["616d6efb46c45b7f064526e3"],
  "created_at": Thu Apr 20 2023 23:29:42 GMT+0100,
  "edited_at": Thu Apr 20 2023 23:29:42 GMT+0100,
}
```

### Exemplo de resposta de erro
```
{
  "erro": "Erro ao encontrar o tema"
}
```

### Exemplo de resposta não encontrada
```
{
  "erro": "Nenhum tema encontrado"
}
```

### Criar tema

```
https://apiminhamente.onrender.com/tema
```

#### Segurança
Esta API usa Bearer Token como um método de autenticação.

- Nome: authorization
- Em: header

#### Elementos

* titulo - String (required)
* assunto - ObjectId do tema (required)

### Requisição
```
import axios from "axios";

let config = {
  method: 'post',
  url: 'https://apiminhamente.onrender.com/tema',
  headers: {
    'authorization': 'token de login'
  },
  data: {
    titulo: "Título do tema",
    assunto: "616d6efb46c45b7f064526e3",
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
{
  "_id": ObjectId("616d6efb46c45b7f064526e3"),
  "titulo": "Título do tema",
  "slug": "Título-do-tema",
  "assunto": "616d6efb46c45b7f064526e3",
  "apontamentos": ["616d6efb46c45b7f064526e3"],
  "created_at": Thu Apr 20 2023 23:29:42 GMT+0100
}
```

### Exemplo de resposta de erro
```
{
  "erro": "Erro ao criar tema"
}
```

### Editar tema

```
https://apiminhamente.onrender.com/tema
```

#### Segurança
Esta API usa Bearer Token como um método de autenticação.

- Nome: authorization
- Em: header

#### Elementos

* id - ObjectId do tema (required)
* titulo - String (required)

### Requisição
```
import axios from "axios";

let config = {
  method: 'put',
  url: 'https://apiminhamente.onrender.com/tema',
  headers: {
    'authorization': 'token de login'
  },
  data: {
    id: "616d6efb46c45b7f064526e3",
    titulo: "Novo titulo do tema"
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
{
 {
    "_id": ObjectId("616d6efb46c45b7f064526e3"),
    "titulo": "Novo título do tema",
    "slug": "Novo-título-do-tema",
    "assunto": "616d6efb46c45b7f064526e3",
    "apontamentos": ["616d6efb46c45b7f064526e3"],
    "created_at": Thu Apr 20 2023 23:29:42 GMT+0100,
    "edited_at": Thu Apr 20 2023 23:29:42 GMT+0100,
 },
 "msg": "Tema editado com sucesso"
}
```

### Exemplo de resposta de erro
```
{
  "erro": "Erro ao editar tema"
}
```

### Deletar tema

```
https://apiminhamente.onrender.com/tema/:id
```

#### Segurança
Esta API usa Bearer Token como um método de autenticação.

- Nome: authorization
- Em: header

#### Parâmetros

* id - ObjectId do assunto (required)

### Requisição
```
import axios from "axios";

let config = {
  method: 'post',
  url: 'https://apiminhamente.onrender.com/tema/:id',
  headers: {
    'authorization': 'token de login'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
{
 {
  "_id": ObjectId("616d6efb46c45b7f064526e3"),
  "titulo": "Novo título do tema",
  "slug": "Novo-título-do-tema",
  "assunto": "616d6efb46c45b7f064526e3",
  "apontamentos": ["616d6efb46c45b7f064526e3"],
  "created_at": Thu Apr 20 2023 23:29:42 GMT+0100,
  "edited_at": Thu Apr 20 2023 23:29:42 GMT+0100,
 },
 "msg": "Tema deletado com sucesso"
}
```

### Exemplo de resposta de erro
```
{
  "erro": "Erro ao deletar tema"
}
```

## Usuário

### Pegar todos os usuários

```
https://apiminhamente.onrender.com/usuarios
```

### Requisição
```
import axios from "axios";

let config = {
  method: 'get',
  url: 'https://apiminhamente.onrender.com/usuarios',
  headers: {
    'authorization': 'token de login'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
[
  {
    "_id": ObjectId("616d6efb46c45b7f064526e3"),
    "id": "616d6efb46c",
    "nome": "Nome",
    "sobrenome": "Sobrenome",
    "email": "email@gmail.com",
    "senha": "senha",
    "role": 1,
    "avatar": "https://avatar.com",
    "avatar_public_id": {"avatar324f.jpg",
    "created_at": Thu Apr 20 2023 23:29:42 GMT+0100,
    "edited_at": Thu Apr 20 2023 23:29:42 GMT+0100,
  }
  ...
]
```

### Exemplo de resposta de erro
```
{
  "erro": "Nenhum usuário encontrado"
}
```

### Pegar o usuário pelo id

```
https://apiminhamente.onrender.com/usuario/:id
```

#### Parâmetros

* id - É o id do usuario

### Requisição
```
import axios from "axios";

let config = {
  method: 'get',
  url: 'https://apiminhamente.onrender.com/usuario/:id',
  headers: {
    'authorization': 'token de login'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
{
  "_id": ObjectId("616d6efb46c45b7f064526e3"),
  "id": "616d6efb46c",
  "nome": "Nome",
  "sobrenome": "Sobrenome",
  "email": "email@gmail.com",
  "senha": "senha",
  "role": 1,
  "avatar": "https://avatar.com",
  "avatar_public_id": {"avatar324f.jpg",
  "created_at": Thu Apr 20 2023 23:29:42 GMT+0100,
  "edited_at": Thu Apr 20 2023 23:29:42 GMT+0100,
}
```

### Exemplo de resposta de erro
```
{
  "erro": "Erro ao encontrar o usuário"
}
```

### Pegar o usuário pelo email

```
https://apiminhamente.onrender.com/usuario/email/:email
```

#### Parâmetros

* email - email do usuario

### Requisição
```
import axios from "axios";

let config = {
  method: 'get',
  url: 'https://apiminhamente.onrender.com/usuario/email/:email',
  headers: {
    'authorization': 'token de login'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
{
  "_id": ObjectId("616d6efb46c45b7f064526e3"),
  "id": "616d6efb46c",
  "nome": "Nome",
  "sobrenome": "Sobrenome",
  "email": "email@gmail.com",
  "senha": "senha",
  "role": 1,
  "avatar": "https://avatar.com",
  "avatar_public_id": {"avatar324f.jpg",
  "created_at": Thu Apr 20 2023 23:29:42 GMT+0100,
  "edited_at": Thu Apr 20 2023 23:29:42 GMT+0100,
}
```

### Exemplo de resposta de erro
```
{
  "erro": "Erro ao encontrar o usuário"
}
```

### Login

```
https://apiminhamente.onrender.com/login
```
#### Elementos

* email - String (required)
* senha - String (required)

### Requisição
```
import axios from "axios";

let config = {
     method: 'post',
     url: 'https://apiminhamente.onrender.com/login',
     data: {
        email: email@gmail.com,
        senha: 1234567890,
   }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
{
  token: "616d6efb46c45b7f064526e3616d6efb46c45b7f064526e3616d6efb46c45b7f064526e3616d6efb46c45b7f064526e3",
  usuario: {
    "_id": ObjectId("616d6efb46c45b7f064526e3"),
    "id": "616d6efb46c",
    "nome": "Nome",
    "sobrenome": "Sobrenome",
    "email": "email@gmail.com",
    "senha": "senha",
    "role": 1,
    "avatar": "https://avatar.com",
    "avatar_public_id": {"avatar324f.jpg",
    "created_at": Thu Apr 20 2023 23:29:42 GMT+0100,
    "edited_at": Thu Apr 20 2023 23:29:42 GMT+0100,
  },
  "msg": "Login feito com sucesso"
}
```

### Exemplos de respostas de erro
```
{
  "erro": "Erro ao criar assunto"
}
```

```
{
  "erro": "Senha incorreta"
}
```

```
{
  "erro": "Usuário não encontrado"
}
```

### Logout

```
https://apiminhamente.onrender.com/logout
```
#### Segurança
Esta API usa Bearer Token como um método de autenticação.

- Nome: authorization
- Em: header

### Requisição
```
import axios from "axios";

let config = {
  method: 'post',
  url: 'https://apiminhamente.onrender.com/logout',
  headers: {
    'authorization': 'token de login'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
{"Sessão terminada com sucesso"}
```

### Exemplos de respostas de erro
```
{
  "erro": "Erro ao terminar sessão"
}
```

### Criar conta

```
https://apiminhamente.onrender.com/usuario
```

#### Elementos

* nome - String (required)
* sobrenome - String(required)
* avatar - Imagem (png, jpg, jpeg) (required)
* email - String(required)
* senha - String de no mínimo 8 caracteres(required)

### Requisição
```
import axios from "axios";

const formData = new FormData();
let nome = "nome"
let sobrenome = "sobrenome"
let avatar = "avatar.png"
let email = "email"
let senha = "senha"

formData.append('nome', nome);
formData.append('sobrenome', sobrenome);
formData.append('avatar', avatar);
formData.append('email', email);
formData.append('senha', senha);

axios.post("https://apiminhamente.onrender.com/usuario", formData)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
{
 {
  "_id": ObjectId("616d6efb46c45b7f064526e3"),
  "id": "616d6efb46c",
  "nome": "Nome",
  "sobrenome": "Sobrenome",
  "email": "email@gmail.com",
  "senha": "d8gf9dgfdjg9048ujr9ijy9854uyfjhg9854jy98gfdjhoif",
  "role": {type: Number, default: 1, required: true},
  "avatar": "https://avatar.com.br",
  "avatar_public_id": "avatarDSF35.jpg",
  "created_at": Thu Apr 20 2023 23:29:42 GMT+0100
 },
 "msg": "Conta criada com sucesso"
}
```

### Exemplo de resposta de erro
```
{
  "erro": "Erro ao criar conta"
}
```

```
{
  "erro": "Nome inválido"
}
```

```
{
  "erro": "Já existe uma conta com esse enail"
}
```

### Editar conta

```
https://apiminhamente.onrender.com/usuario
```

#### Elementos

* id - String (required)
* nome - String
* senha - String de no mínimo 8 caracteres(required)

### Requisição
```
import axios from "axios";

const formData = new FormData();
let id = "616d6efb46c"
let nome = "Novo nome"
let senha = "1234567890"

formData.append('id', id);
formData.append('nome', nome);
formData.append('senha', senha);

axios.put("https://apiminhamente.onrender.com/usuario", formData)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
{
 {
  "_id": ObjectId("616d6efb46c45b7f064526e3"),
  "id": "616d6efb46c",
  "nome": "Novo nome",
  "sobrenome": "Sobrenome",
  "email": "email@gmail.com",
  "senha": "d8gf9dgfdjg9048ujr9ijy9854uyfjhg9854jy98gfdjhoif",
  "role": {type: Number, default: 1, required: true},
  "avatar": "https://avatar.com.br",
  "avatar_public_id": "avatarDSF35.jpg",
  "created_at": Thu Apr 20 2023 23:29:42 GMT+0100,
  "edited_at": Thu Apr 20 2023 23:29:42 GMT+0100,
 },
 "msg": "Conta editada com sucesso"
}
```

### Exemplo de resposta de erro
```
{
  "erro": "Erro ao editar conta"
}
```

```
{
  "erro": "Nome inválido"
}
```

```
{
  "erro": "Já existe uma conta com esse enail"
}
```

### Enviar email de recuperação de senha

```
https://apiminhamente.onrender.com/recuperarsenha/:email
```
#### Parâmetros

* email - email do usuário (required)

### Requisição
```
import axios from "axios";

let config = {
  method: 'post',
  url: 'https://apiminhamente.onrender.com/recuperarsenha/:email',
  headers: {
    'authorization': 'token de login'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
{msg: "Link enviado ao seu email com sucesso"}
```

### Exemplos de respostas de erro
```
{
  "erro": "Erro ao enviar email"
}
```

```
{
  "erro": "Erro, talvez o email usado não exista"
}
```

### Mudar senha

```
https://apiminhamente.onrender.com/mudarsenha/:token
```

#### Parâmetros

* token - Token recebido no email (required)

#### Elementos

* senha - Nova senha (required)

### Requisição
```
import axios from "axios";

let config = {
  method: 'post',
  url: 'https://apiminhamente.onrender.com/mudarsenha/:token',
  headers: {
    'authorization': 'token de login'
  },
  data: {
    senha: "1234567890"
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
{
 {
  "_id": ObjectId("616d6efb46c45b7f064526e3"),
  "id": "616d6efb46c",
  "nome": "Novo nome",
  "sobrenome": "Sobrenome",
  "email": "email@gmail.com",
  "senha": "d8gf9dgfdjg9048ujr9ijy9854uyfjhg9854jy98gfdjhoif",
  "role": {type: Number, default: 1, required: true},
  "avatar": "https://avatar.com.br",
  "avatar_public_id": "avatarDSF35.jpg",
  "created_at": Thu Apr 20 2023 23:29:42 GMT+0100,
  "edited_at": Thu Apr 20 2023 23:29:42 GMT+0100,
 },
 "msg": "Senha alterada com sucesso"
}
```

### Exemplos de respostas de erro
```
{
  "erro": "Erro ao mudar senha"
}
```

### Enviar email de deleção de conta

```
https://apiminhamente.onrender.com/usuario/:id/:email
```

#### Parâmetros

* email - email do usuário (required)
* id - id do usuário

### Requisição
```
import axios from "axios";

let config = {
  method: 'post',
  url: 'https://apiminhamente.onrender.com/usuario/:id/:email',
  headers: {
    'authorization': 'token de login'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
{msg: "Email de deleção enviado com sucesso"}
```

### Exemplos de respostas de erro
```
{
  "erro": "Erro ao enviar email"
}
```

### Deletar minha conta

```
https://apiminhamente.onrender.com/deletarconta/:token
```

#### Parâmetros

* token - token recebido no email (required)

### Requisição
```
import axios from "axios";

let config = {
  method: 'delete',
  url: 'https://apiminhamente.onrender.com/deletarconta/:token',
  headers: {
    'authorization': 'token de login'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
{
 {
  "_id": ObjectId("616d6efb46c45b7f064526e3"),
  "id": "616d6efb46c",
  "nome": "Novo nome",
  "sobrenome": "Sobrenome",
  "email": "email@gmail.com",
  "senha": "d8gf9dgfdjg9048ujr9ijy9854uyfjhg9854jy98gfdjhoif",
  "role": {type: Number, default: 1, required: true},
  "avatar": "https://avatar.com.br",
  "avatar_public_id": "avatarDSF35.jpg",
  "created_at": Thu Apr 20 2023 23:29:42 GMT+0100,
  "edited_at": Thu Apr 20 2023 23:29:42 GMT+0100,
 },
 "msg": "Conta deletada com sucesso"
}
```

### Exemplos de respostas de erro
```
{
  "erro": "Erro ao deletar a conta"
}
```

### Adm deletar usuário

```
https://apiminhamente.onrender.com/usuario/:id
```

#### Parâmetros

* id - id do usuário (required)

### Requisição
```
import axios from "axios";

let config = {
  method: 'delete',
  url: 'https://apiminhamente.onrender.com/usuario/:id',
  headers: {
    'authorization': 'token de login'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de resposta de sucesso
```
{
 {
  "_id": ObjectId("616d6efb46c45b7f064526e3"),
  "id": "616d6efb46c",
  "nome": "Novo nome",
  "sobrenome": "Sobrenome",
  "email": "email@gmail.com",
  "senha": "d8gf9dgfdjg9048ujr9ijy9854uyfjhg9854jy98gfdjhoif",
  "role": {type: Number, default: 1, required: true},
  "avatar": "https://avatar.com.br",
  "avatar_public_id": "avatarDSF35.jpg",
  "created_at": Thu Apr 20 2023 23:29:42 GMT+0100,
  "edited_at": Thu Apr 20 2023 23:29:42 GMT+0100,
 },
 "msg": "Conta deletada com sucesso"
}
```

### Exemplos de respostas de erro
```
{
  "erro": "Erro ao deletar a conta"
}
```
