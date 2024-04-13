import { apiUrl } from "./config.js";

// Função para fazer uma requisição GET aos produtos
export async function getProdutos() {
	try {
		const response = await fetch(`${apiUrl}/produtos`);
		if (!response.ok) {
			throw new Error("Não foi possível obter os produtos.");
		}
		const produtos = await response.json();
		return produtos;
	} catch (error) {
		console.error("Erro ao obter os produtos:", error.message);
		return [];
	}
}

// Função para fazer uma requisição POST para criar um novo produto
export async function criarProduto(produto) {
	try {
		const response = await fetch(`${apiUrl}/produtos`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(produto),
		});
		if (!response.ok) {
			throw new Error("Não foi possível criar o produto.");
		}
		const novoProduto = await response.json();
		return novoProduto;
	} catch (error) {
		console.error("Erro ao criar o produto:", error.message);
		return null;
	}
}
