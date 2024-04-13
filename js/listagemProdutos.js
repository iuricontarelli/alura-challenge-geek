import { getProdutos } from "./api.js";
import { apiUrl } from "./config.js";

// Função para listar os produtos e criar os cards dinamicamente
async function listarProdutos() {
	const produtos = await getProdutos();

	// Seletor do elemento onde os cards serão adicionados
	const listaProdutos = document.querySelector("#product-list");

	// Limpar qualquer conteúdo pré-existente
	listaProdutos.innerHTML = "";

	// Criar um card para cada produto
	produtos.forEach((produto) => {
		const cardHTML = `
            <div class="card" id="produto-${produto.id}">
                <img src="${produto.imagem}" alt="${produto.nome}" />
                <div class="card-container--info">
                    <p>${produto.nome}</p>
                    <div class="card-container--value">
                        <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
                    </div>
                    <button class="delete-button" data-id="${produto.id}">
                        Excluir
                    </button>
                </div>
            </div>
        `;
		// Adicionar o card ao elemento pai
		listaProdutos.innerHTML += cardHTML;
	});

	// Chamar a função para adicionar os eventos de clique aos botões de exclusão
	adicionarEventoExcluir();
}

// Chamar a função para listar os produtos quando a página carregar
document.addEventListener("DOMContentLoaded", listarProdutos);

// Função para adicionar evento de clique aos botões de exclusão
function adicionarEventoExcluir() {
	const botoesExcluir = document.querySelectorAll(".delete-button");

	botoesExcluir.forEach((botao) => {
		botao.addEventListener("click", async (event) => {
			event.preventDefault();
			const idProduto = event.target.dataset.id;

			try {
				const response = await fetch(`${apiUrl}/produtos/${idProduto}`, {
					method: "DELETE",
				});

				if (!response.ok) {
					throw new Error("Não foi possível excluir o produto.");
				}

				// Remover o card do produto da página
				const cardProduto = document.querySelector(`#produto-${idProduto}`);
				cardProduto.remove();
			} catch (error) {
				console.error("Erro ao excluir o produto:", error.message);
			}
		});
	});
}
