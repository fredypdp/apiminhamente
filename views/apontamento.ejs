<%- include("partials/head") %>
<%- include("partials/navBarAdmin") %>
    <div class="container">
        <div class="apontamento-container">
            <aside>
                <nav class="assuntos-lateral-bar">
                    <% assuntos.forEach(assunto => { %>
                        <a href="/assunto/<%= assunto.slug %>">
                            <div>
                                <i class="<%= assunto.icone %>"></i>
                                <span><%= assunto.nome %></span>
                            </div>
                        </a>
                    <% }) %>
                </nav>
            </aside>
            <section>
                <div class="apontamento-area">
                    <div class="apontamento-titulo"><%= apontamento.titulo %></div>
                    <span class="apontamento-data">Publicado em <%= dataCriacao %></span>
                    <div class="apontamento-conteudo" ><%- apontamento.conteudo %></div>

                    <div style="display: inline;">
                        <button class="botao-apagar" type="submit" onclick="confirmarDelecao()">Deletar</button>
                        <input type="hidden" name="id" id="id" value="<%= apontamento.id %>">
                        <a href="/adm/apontamento/editar/<%= apontamento.id %>" class="botao-editar">Editar</a>
                    </div>
                </div>
            </section>            
        </div>
    </div>
<%- include("partials/footer") %>
<script>
    function confirmarDelecao() {
        let decision = confirm("Deletar apontamento?")
        
        if(decision){
            let id = document.getElementById("id").value

            axios.delete("/apontamento/"+id)
            window.location.href = '/adm/apontamentos' 
        }
    }
</script>