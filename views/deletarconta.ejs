<%- include("partials/head") %>
<body onload="deletarConta()">
    <div style="display: flex;align-items: center; justify-content: center;height: 100vh;">
        <div class="login-area">
            <div class="login-form">
                <input type="hidden" name="token" id="token" value="<%= token %>">
            </div>
        </div>
    </div>
<%- include("partials/footer") %>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
    async function deletarConta() {

        let token = document.getElementById("token").value
        let userToken = {token: token}
        
        try {
            await axios.post("/deletarconta", userToken)
            document.getElementById("token-erro").style.display = "none"
            window.location = '/login'
        } catch (error) {
            if(error.response.status == 406){
                alert("Token inválido ou inexistente!")
            }
        }

    }
</script>