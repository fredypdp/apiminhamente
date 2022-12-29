<%- include("partials/head") %>
<body>
    <div style="display: flex;align-items: center; justify-content: center;height: 100vh;">
        <div class="login-area">
            <div class="login-form">
                <label for="login-email">Nova Senha:</label>
                <input type="password" name="senha" id="nova-senha" autocomplete="off" placeholder="Digite a sua nova senha" required>
                <input type="hidden" name="token" id="token" value="<%= token %>">
                <span style="display: none;color: green; margin-bottom: 5px;" id="sucesso">Senha alterada com sucesso</span>
                <span style="display: none;color: red; margin-bottom: 5px;" id="senha-erro">A senha precisa ter no mínimo 8 caracteres</span>
                <span style="display: none;color: red; margin-bottom: 5px;" id="token-erro">Token inválido ou inexistente!</span>
                <button onclick="mudarSenha()">Enviar</button>
            </div>
        </div>
    </div>
<%- include("partials/footer") %>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
    async function mudarSenha() {
        
        let novaSenha = document.getElementById("nova-senha").value
        let token = document.getElementById("token").value
    
        let user = {novaSenha: novaSenha, token: token}
        
        try {
            await axios.post("/mudarsenha", user)
            document.getElementById("token-erro").style.display = "none"
            document.getElementById("senha-erro").style.display = "none"
            document.getElementById("sucesso").style.display = "flex"
            setTimeout(() => {
                window.location = '/'
            }, 3000);
        } catch (error) {
            if(error.response.status == 406){
                document.getElementById("token-erro").style.display = "flex"
            } else{
                document.getElementById("token-erro").style.display = "none"
                document.getElementById("sucesso").style.display = "none"
            }

            if (error.response.status == 400) {
                document.getElementById("senha-erro").style.display = "flex"
            } else {
                document.getElementById("senha-erro").style.display = "none"
                document.getElementById("sucesso").style.display = "none"
            }
        }

    }
</script>