

import { produtos } from "./servicos/global.js";

const lista = document.querySelector("[data-produtos]");
const formulario = document.querySelector("[data-formulario]");

function criarCard(id, nome, valor, imagem) {
    console.log("Criando card para o produto", { id, nome, valor, imagem });
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <figure class="item">
        <img class="imagem-produtos" src="${imagem}">
        <figcaption>${nome}</figcaption>
        <div class="item__valor">
            <p class="item__preco">
                <img class="item__icons" src="./imagens/icons/dinheiro.png">${valor}</p>
            <button class="item__excluir">
                <img src="./imagens/icons/delete.png" alt="Excluir" class="item__excluir">
            </button>
        </div>
    </figure>`;

    // Adiciona o ouvinte de evento para excluir o produto
    const excluirBtn = card.querySelector(".item__excluir");
    excluirBtn.addEventListener("click", async () => {
        try {
            const sucesso = await produtos.excluirProduto(id);
            if (sucesso) {
                // Se a exclusão for bem-sucedida, remove o card do DOM
                card.remove();
            }
        } catch (error) {
            console.log("Erro ao excluir produto:", error);
        }
    });

    return card;
}

async function listaCard() {
    try {
        const listaApi = await produtos.produtoLista();
        listaApi.forEach(element => 
            lista.appendChild(criarCard(element.id, element.nome, element.valor, element.imagem))
        );
    } catch (error) {
        console.log("Erro ao carregar os cards", error);
    }
}

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nome = document.querySelector("[data-nome]").value;
    const valor = document.querySelector("[data-valor]").value;
    const imagem = document.querySelector("[data-imagem]").value;
   
    try {
        const novoproduto = await produtos.criarvideo(nome, valor, imagem);
           const novoCard = card(novoproduto);
        lista.appendChild(novoCard);
    } catch (error) {
        console.log("Erro ao criar produto:", error);
    }
});

listaCard();
