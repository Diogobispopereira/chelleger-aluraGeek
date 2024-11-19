const url = "http://localhost:3001/carros";

async function produtoLista() {
    try{
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    catch(error){
        console.log("Erro ao encontrar", error)
    }
}
 async function criarvideo(nome, valor, imagem) {
    
    try{
        const response = await fetch(url, {
        method: "POST",
        headers: {"content-Type" : "application/json"},
            body: JSON.stringify({
             nome: nome,
             valor: valor,
             imagem: imagem
            })
    })
            const data = await response.json();
            return data;
        } catch(error){
            alert("Erro ao encontrar", error)
        }
}

async function excluirProduto(id) {
    try {
        await fetch(`${url}/${id}`, {
            method: "DELETE",
        });

        console.log(`Produto com ID ${id} excluído com sucesso.`);
        return { sucesso: true };
    } catch (error) {
        console.error("Erro ao excluir o produto:", error);
        alert("Não foi possível excluir o produto. Tente novamente.");
        return { sucesso: false, erro: error };
    }
}

export const produtos = {
    produtoLista,
    criarvideo,
    excluirProduto,
};
