# Rotas

## Apontamento

### Pegar todos os apontamentos

### Requisição
```
var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://apiminhamente.vercel.app/apontamentos'
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
    id: {type: String, required: true},
    titulo: {type: String, required: true},
    slug: {type: String, required: true},
    conteudo: {type: String, required: true},
    miniatura: {type: String, required: true},
    miniatura_public_id: {type: String, required: true},
    visibilidade: {type: mongoose.Schema.Types.Boolean, default: true},
    assuntos: [],
    temas: [],
    created_at: {type: mongoose.Schema.Types.Date, required: true},
    edited_at: {type: mongoose.Schema.Types.Date},
 }
 ...
]
```

# Funcionamento

## Apontamento

### Criação do apontamento

- Validação dos elementos recebidos (título, conteúdo, assuntos, temas, miniaturas)
- Fazer upload da miniatura para a pasta "temp" usando o path e multer (no arquivo das rotas)
- Fazer upload da miniatura que tá na pasta "temp" para a Cloudinary e retornando um objeto do CDN da imagem
- Deletar a miniatura que tá na pasta "temp"
- Criar o apontamento no banco de dados usando os dados recebidos (e enviá-los pra um Model), e usar a cdn da miniatura pra preencher o campo dela

### Edição do apontamento

- Validação dos elementos recebidos (título, conteúdo, assuntos, temas, miniaturas)
- Procurar o apontamento recebido, e verificar se existe
- Deletar miniatura antiga salva na nuvem
- Fazer upload da miniatura para a pasta "temp" usando o path e multer (no arquivo das rotas)
- Fazer upload da miniatura que tá na pasta "temp" para a Cloudinary e retornando um objeto do CDN da imagem
- Deletar a miniatura que tá na pasta "temp"
- Editar o apontamento no banco de dados usando os dados recebidos (e enviá-los pra um Model), e usar a cdn da miniatura pra preencher o campo dela

### Deleção do apontamento

- Procurar um apontamento que corresponde ao apontamento recebido
- Deletar o apontamento

## Assunto

### Criação do assunto

- Validação dos elementos recebidos (nome, ícone)
- Verificar se já existe um assunto com esse nome
- Criar assunto no banco de dados

### Edição do assunto

- Validação dos elementos recebidos (nome, ícone)
- Procurar o assunto recebido
- Verificar se já existe um assunto com esse nome
- Editar o assunto no banco de dados

### Deleção do assunto

- Procurar um assunto que corresponde ao assunto recebido
- Deletar o assunto

## Usuário

### Criação do usuário

- Validação dos elementos recebidos (avatar, nome, email, senha)
- Verfificar se o email já tá cadastrado
- Fazer upload do avatar para a pasta "temp" usando o path e multer (no arquivo das rotas)
- Fazer upload do avatar que tá na pasta "temp" para a Cloudinary e retornando um objeto do CDN da imagem
- Deleta do avatar que tá na pasta "temp"
- Criar usuário no banco de dados ("usuário normal" é o padrão)

### Edição do usuário

- Validação dos elementos recebidos
- Procurar o assunto recebido, e verificar se existe
- Deletar avatar antigo salvo na nuvem
- Fazer upload do avatar para a pasta "temp" usando o path e multer (no arquivo das rotas)
- Fazer upload do avatar que tá na pasta "temp" para a Cloudinary e retornando um objeto do CDN da imagem
- Deleta do avatar que tá na pasta "temp"
- Adicionar o token de login antigo à lista negra

### Deleção da minha conta

- Criar token de deleção da conta
- Enviar o token pra o email do usuário
- Validar o token depois do usuário entrar na página e verificar que quer deletar, se o token já foi usado retornar false, mas se não, retorna o token
- Procurar o dono do token
- Deletar o usuário, e o avatar que tá na nuvem
- Definir o token como usado

### Adm deletar usuário

- Validação dos elementos recebidos
- Verificar se usuário existe
- Deletar usuário, e o avatar que tá na nuvem

### Login

- Validação dos elementos recebidos
- Procurar a conta do usuário usando o email recebido
- Usar o bcrypt pra descriptografar a hash, e comparar a senha recebida e a senha do banco de dados
- Se as senhas forem iguais criar um token usando o JWS (Jason Web Token)
- Verificar se o token criado tá na lista negra
- Retornar o usuário e o token dele

## Logout

- Adicionar o token do usuário à lista negra

## Recuperar senha

- Criar token de recuperação de senha
- Enviar o token pra o email do usuário
- Validar o token depois do usuário entrar na página e verificar que quer recuperar a senha, se o token já foi usado retornar false, mas se não, retorna o token
- Criar nova senha e definir o token como usado
