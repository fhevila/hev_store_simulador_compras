// LISTA DE PRODUTOS 
const produtos = [
    { nome: "Triplo Carne e Cheddar",       preco: 50.00 },
    { nome: "Salada, Bacon e Cheddar",      preco: 30.00 },
    { nome: "Cebola Caramelizada e Picles", preco: 35.00 },
    { nome: "Duplo Queijo e Bacon",         preco: 45.00 },
    { nome: "Podrão X Tudo",                preco: 40.00 },
    { nome: "Frango com Salada",            preco: 30.00 },
    { nome: "Carne e Queijo Coalho",        preco: 40.00 }
];


// FORMATAR PREÇO 
// Recebe um número e devolve no formato de Real brasileiro.
// Exemplo: 40 -> "R$ 40,00" | 127.5 -> "R$ 127,50"
// O cálculo é feito com o número normal; a vírgula aparece só na exibição.
function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}


// ===== PEDIR QUANTIDADE =====
function pedirQuantidade(produto) {
    while (true) {
        const resposta = prompt(
            `Quantas unidades de "${produto.nome}" (${formatarPreco(produto.preco)}) você deseja?\n` +
            `Digite 0 para não comprar.`,
            "0"
        );

        if (resposta === null) {
            return 0;
        }

        const quantidade = Number(resposta.trim());

        if (Number.isInteger(quantidade) && quantidade >= 0) {
            return quantidade;
        }

        alert("Quantidade inválida! Digite um número inteiro igual ou maior que 0.");
    }
}


// SIMULAR COMPRA 
function simularCompra() {
    let total = 0;
    let totalItens = 0;
    let resumo = "";

    for (const produto of produtos) {
        const quantidade = pedirQuantidade(produto);
        const valorProduto = produto.preco * quantidade;

        total += valorProduto;
        totalItens += quantidade;

        resumo += `${produto.nome}: ${quantidade} x ${formatarPreco(produto.preco)} = ${formatarPreco(valorProduto)}\n`;
    }

    if (totalItens === 0) {
        alert("Nenhum produto foi selecionado.");
        return;
    }

    alert(
        "🍔 RESUMO DA COMPRA - HEV STORE\n\n" +
        resumo +
        `\nQuantidade de itens: ${totalItens}` +
        `\nTOTAL: ${formatarPreco(total)}`
    );
}

const iconeCarrinho = document.querySelector("#icone-carrinho");
const carrinho = document.querySelector(".carrinho");
const fecharCarrinho = document.querySelector("#fechar-carrinho");
const carrinhoConteudo = document.querySelector(".carrinho-conteudo");

// Abre e fecha o carrinho ao clicar nos ícones
iconeCarrinho.addEventListener("click", () => carrinho.classList.add("ativo"));
fecharCarrinho.addEventListener("click", () => carrinho.classList.remove("ativo"));

// Liga cada ícone de sacola dos produtos à função adicionarAoCarrinho
const botoesAdicionar = document.querySelectorAll(".adicionar-carrinho");
botoesAdicionar.forEach(botao => {
    botao.addEventListener("click", evento => {
        const produtoBox = evento.target.closest(".produto");
        adicionarAoCarrinho(produtoBox);
    });
});


// ===== ADICIONAR AO CARRINHO =====
function adicionarAoCarrinho(produtoBox) {
    const imagem = produtoBox.querySelector("img").src;
    const titulo = produtoBox.querySelector(".produto-titulo").textContent;
    const preco = Number(produtoBox.querySelector(".preco").dataset.preco);

    // Verifica se o produto já está no carrinho
    const titulosNoCarrinho = carrinhoConteudo.querySelectorAll(".item-titulo");
    for (const item of titulosNoCarrinho) {
        if (item.textContent === titulo) {
            alert("Este item já está no carrinho.");
            return;
        }
    }

    // Cria o item do carrinho
    const itemCarrinho = document.createElement("div");
    itemCarrinho.classList.add("item-carrinho");
    itemCarrinho.dataset.preco = preco; // guarda o preço como número para os cálculos
    itemCarrinho.innerHTML = `
        <img src="${imagem}" class="item-img" alt="${titulo}">
        <div class="item-detalhes">
            <h2 class="item-titulo">${titulo}</h2>
            <span class="item-preco">${formatarPreco(preco)}</span>
            <div class="item-quantidade">
                <button class="btn-diminuir">-</button>
                <span class="numero">1</span>
                <button class="btn-aumentar">+</button>
            </div>
        </div>
        <i class="ri-delete-bin-line item-remover"></i>
    `;

    carrinhoConteudo.appendChild(itemCarrinho);

    // Botão da lixeira: remove o item e atualiza contador e total
    itemCarrinho.querySelector(".item-remover").addEventListener("click", () => {
        itemCarrinho.remove();
        atualizarContador(-1);
        atualizarTotal();
    });

    // Botões + e -: mudam a quantidade (mínimo 1) e atualizam o total
    itemCarrinho.querySelector(".item-quantidade").addEventListener("click", evento => {
        const numero = itemCarrinho.querySelector(".numero");
        const btnDiminuir = itemCarrinho.querySelector(".btn-diminuir");
        let quantidade = Number(numero.textContent);

        if (evento.target.classList.contains("btn-diminuir") && quantidade > 1) {
            quantidade--;
        } else if (evento.target.classList.contains("btn-aumentar")) {
            quantidade++;
        }

        // Deixa o "-" cinza quando a quantidade é 1 (não dá para diminuir mais)
        btnDiminuir.style.color = quantidade === 1 ? "#999" : "#333";

        numero.textContent = quantidade;
        atualizarTotal();
    });

    atualizarContador(1);
    atualizarTotal();
}


// ATUALIZAR TOTAL 
// Percorre todos os itens do carrinho, multiplica preço x quantidade,
// soma tudo e mostra o total formatado em Real (ex.: R$ 125,00).
function atualizarTotal() {
    const totalPreco = document.querySelector(".total-preco");
    const itens = carrinhoConteudo.querySelectorAll(".item-carrinho");
    let total = 0;

    itens.forEach(item => {
        const preco = Number(item.dataset.preco);
        const quantidade = Number(item.querySelector(".numero").textContent);
        total += preco * quantidade;
    });

    totalPreco.textContent = formatarPreco(total);
}


// ATUALIZAR CONTADOR
// Soma ou subtrai do número de produtos diferentes no carrinho
// e mostra esse número na bolinha laranja do ícone do topo.
let quantidadeNoCarrinho = 0;

function atualizarContador(mudanca) {
    const contador = document.querySelector(".contador-carrinho");
    quantidadeNoCarrinho += mudanca;

    if (quantidadeNoCarrinho > 0) {
        contador.style.visibility = "visible";
        contador.textContent = quantidadeNoCarrinho;
    } else {
        contador.style.visibility = "hidden";
        contador.textContent = "";
    }
}


// ===== BOTÃO COMPRAR (do carrinho) =====
// Se o carrinho estiver vazio, avisa o usuário.
// Se tiver itens, mostra o total, esvazia o carrinho e agradece.
const btnComprar = document.querySelector(".btn-comprar");

btnComprar.addEventListener("click", () => {
    const itens = carrinhoConteudo.querySelectorAll(".item-carrinho");

    if (itens.length === 0) {
        alert("Seu carrinho está vazio. Adicione produtos para comprar.");
        return;
    }

    const totalFinal = document.querySelector(".total-preco").textContent;

    itens.forEach(item => item.remove());
    quantidadeNoCarrinho = 0;
    atualizarContador(0);
    atualizarTotal();

    alert(`Compra finalizada! Total: ${totalFinal}\nObrigado(a) por comprar na Hev Store!`);
});
