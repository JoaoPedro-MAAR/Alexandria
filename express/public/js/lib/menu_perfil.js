
export async function menu_perfil(id) {
    const segue = await fetch(`data/segue?id_user=${id}`).then(response => response.json());
    const palavra_usuario = await fetch(`data/palavra_usuario?id_user=${id}`).then(response => response.json());
    const disco = await fetch(`data/disco?id_user=${id}&modo=perfil`).then(response => response.json());
    const livro = await fetch(`data/livro?id_user=${id}&modo=perfil`).then(response => response.json());
    
    const coresBootstrap = [
            'primary', 'secondary', 'success', 'danger',
            'warning', 'info', 'dark'
    ];
    
    let container_seguidores = document.getElementById("menu-usuario__informacoes__seguidores");
    container_seguidores.innerHTML = segue.filter(obj => obj.seguido == id).length + " seguidores";

    let container_segue = document.getElementById("menu-usuario__informacoes__seguindo");
    container_segue.innerHTML = segue.filter(obj => obj.seguinte == id).length + " seguindo";

    //Adicionar a foto de perfil
    let img_fotodeperfil = document.getElementById("foto-de-perfil");
    img_fotodeperfil.src = `imgs/usuario/${id}.jpg`;

    //Adicionar as palavras chave
    let palavras = palavra_usuario.filter(obj => obj.usuario == id);
    let menu_palavras = document.getElementById("menu-palavras-chave__palavras-chave");
    for (let palavra of palavras) {
        let corAleatoria = coresBootstrap[Math.floor(Math.random() * coresBootstrap.length)];
        menu_palavras.insertAdjacentHTML("beforeend", `<span class="badge rounded-pill text-bg-${corAleatoria} menu-palavras-chave__palavra">
            ${palavra.nome}
        </span>`);
    }

    //Adicionar os produtos
    let meus_discos = disco.filter(obj => obj.id_usuario == id);
    let meus_livros = livro.filter(obj => obj.id_usuario == id);
    let container_produtos = document.getElementById("menu-produtos__produtos");

    for (let i of meus_discos) {
        container_produtos.insertAdjacentHTML("beforeend", `<div class="menu-produtos__produtos_produto" onclick="window.location.href = 'produto.html?id_prod=${i.id_prod}&id_user=${id}'">
                <img src="imgs/prod/${i.id_prod}.jpg" class="card-img-top" alt="...">
                <div>
                    <h5>${i.nome}</h5>
                    <h6>R$ ${(i.valor/100).toFixed(2)}</h6>
                </div>
            </div>`)
    }

    for (let i of meus_livros) {
        container_produtos.insertAdjacentHTML("beforeend", `<div class="menu-produtos__produtos_produto" onclick="window.location.href = 'produto.html?id_prod=${i.id_prod}&id_user=${id}'">
                <img src="imgs/prod/${i.id_prod}.jpg" class="card-img-top" alt="...">
                <div>
                    <h5>${i.nome}</h5>
                    <h6>R$ ${(i.valor / 100).toFixed(2)}</h6>
                </div>
            </div>`)
    }
}