<%- include("../../partials/head") %>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css">
<%- include("../../partials/navBarAdmin") %>
<div class="container">
    <hr>
    <h2 class="text-dark">Usuários</h2>
    <hr>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th class="text-dark">Id</th>
                <th class="text-dark">Nome</th>
                <th class="text-dark">Email</th>
                <th class="text-dark">Role</th>
                <th class="text-dark">Ações</th>
            </tr>
        </thead>
        <tbody>
            <% users.forEach(user => { %>
                <tr>
                    <td class="text-dark"><%= user.id %></td>
                    <td class="text-dark"><%= user.nome %></td>
                    <td class="text-dark"><%= user.email %></td>
                    <td class="text-dark"><%= user.role %></td>
                    <td>
                        <a href="/perfil/<%= user.id %>/<%= user.nome %>" class="btn btn-warning">Editar</a>

                        <div style="display: inline;">
                            <input type="hidden" name="id" id="id" value="<%= user.id %>">
                            <button class="botao-apagar" onclick="confirmarDelecao()">Deletar</button>
                        </div>
                    </td>
                </tr>
            <% }) %>
        </tbody>
    </table>
</div>

<%- include("../../partials/footer") %>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"></script>
<script>
    async function confirmarDelecao() {
        let decision = confirm("Deletar usuário?")
    
        if(decision){
            let id = event.target.previousElementSibling.value
            
            await axios.delete("/user/"+id)
            window.location.reload(true)
        }
    }
</script>
