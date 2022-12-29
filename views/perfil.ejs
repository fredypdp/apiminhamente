<%- include("partials/head") %>
<%- include("partials/navBarAdmin") %>
    <div class="container">
        <div class="perfil-container">
            <div class="cartao-usuario-mobile">
                <img src="<%= user.avatar %>" draggable="false" class="foto-perfil">
                <h1 class="nome-usuario"><%= user.nome %></h1>
                <span class="email-usuario"><%= user.email %></span>
                <a href="">
                    <button>Saír</button>
                </a>
            </div>
            <div class="editar">
                <h1>Editar</h1>
                <form action="">
                    <label for="nome">Nome:</label>
                    <input type="text" name="nome" id="nome" autocomplete="off">
                    <label for="email">Email:</label>
                    <input type="email" name="email" id="email" autocomplete="off">
                    <label for="avatar">Foto de perfil:</label>
                    <input type="url" name="avatar" id="avatar" placeholder="Link da foto de perfil" autocomplete="off" pattern=".*\.com/.*" required>
                    <div class="editar-botoes">
                        <label for="importar-foto-perfil">Foto de perfil</label>
                        <input type="file" name="avatar" id="avatar" accept="image/png, image/jpeg">
                        <button type="submit">Editar</button>
                    </div>
                </form>
            </div>
            <div class="cartao-usuario">
                <img src="<%= user.avatar %>" draggable="false" class="foto-perfil">
                <h1 class="nome-usuario"><%= user.nome %></h1>
                <span class="email-usuario"><%= user.email %></span>
                <a href="">
                    <button>Saír</button>
                </a>
                <a href="" onclick="deletar(event)">
                    <button>Eliminar conta</button>
                </a>
                <input type="hidden" name="id" value="<%= user.id %>" id="id">
                <input type="hidden" name="email" value="<%= user.email %>" id="del-email">
                <span style="display: none;color: green; margin-bottom: 5px;" id="sucesso">Enviamos um email com o link de verificação para você</span>
                <span style="display: none;color: red; margin-bottom: 5px;" id="email-erro">Não existe uma conta com esse email</span>
            </div>
        </div>
    </div>
<%- include("partials/footer") %>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
    async function deletar(event) {
        event.preventDefault()

        let id = document.getElementById("id").value
        let email = document.getElementById("del-email").value
        
        try {
            let result = await axios.delete(`/user/${id}/${email}`)
            document.getElementById("sucesso").style.display = "flex"
        } catch (error) {
            if(error.response.status == 406){
                document.getElementById("email-erro").style.display = "flex"
                document.getElementById("sucesso").style.display = "none"
            } else{
                document.getElementById("email-erro").style.display = "none"
            }
        }

    }

    async function esqueciSenha() {
        
        let email = document.getElementById("email").value
        let user = {email: email}
        try {
            let result = await axios.post("/recuperarsenha", user)
            document.getElementById("sucesso").style.display = "flex"
        } catch (error) {
            if(error.response.status == 406){
                document.getElementById("email-erro").style.display = "flex"
                document.getElementById("sucesso").style.display = "none"
            } else{
                document.getElementById("email-erro").style.display = "none"
            }
        }

    }
</script>