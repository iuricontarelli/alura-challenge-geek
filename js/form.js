// Importe a função para fazer a requisição POST
import { criarProduto } from "./api.js";

// Função para capturar eventos do formulário
function capturarEventosFormulario() {
	// Seletor do formulário
	const formulario = document.querySelector("#add-product-form");

	// Adicionando um listener de evento para o envio do formulário
	formulario.addEventListener("submit", async function (event) {
		// Prevenir o comportamento padrão do formulário
		event.preventDefault();

		// Capturar os valores dos inputs do formulário
		const nomeProduto = document.querySelector("#product-name").value;
		const precoProduto = document.querySelector("#product-price").value;
		const imagemProduto = document.querySelector("#product-image").value;

		// Criar um objeto com os dados do produto
		const novoProduto = {
			nome: nomeProduto,
			preco: parseFloat(precoProduto),
			imagem: imagemProduto,
		};

		// Chamar a função para criar um novo produto no servidor
		try {
			const resposta = await criarProduto(novoProduto);
			console.log("Novo produto criado:", resposta);

			// Limpar o formulário após o envio bem-sucedido
			formulario.reset();
		} catch (error) {
			console.error("Erro ao criar novo produto:", error.message);
		}
	});
}

// Chamar a função para capturar eventos do formulário quando a página carregar
document.addEventListener("DOMContentLoaded", capturarEventosFormulario);
