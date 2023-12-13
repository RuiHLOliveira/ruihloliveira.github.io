

window.onload = () => {
    run()
}

function run() {
    fetch("./lista.json").then(async result => {
        lista = await result.json();
        console.log(lista);
        buildListaProdutos(lista)
})
}

function buildListaProdutos (lista) {
    const telefone = '5521975715902';
    let listaProdutoHtml = '';

    lista.forEach(produto => {
        if(produto.valid == false) return;
        let mensagem = `Olá noivos! Quero presentear vocês com ${produto.artigoMensagem} ${produto.nome}! Como faço?`;
        let template = `<div class="boxProduto flex f-column f-justify-spaceAround">
            <div>
                <img class="imgProduto" src="${produto.imgsrc}" />
            </div>
            
            <div>
                <div style="margin-bottom: 10px;">${produto.nome}</div>
                <div style="font-size: 0.8rem">${produto.valorMedio}</div>
                <div style="padding: 20px 0px 10px 0px;">
                    <a class="botaoPresentear" href="https://wa.me/${telefone}?text=${mensagem}" target="_blank">Presentear!</a>
                </div>
            </div>

        </div>`;
        listaProdutoHtml += template;
    });
    console.log(document.getElementById('ListaProdutos'));
    document.getElementById('ListaProdutos').innerHTML = listaProdutoHtml;
}
