const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'produtos.json');

function listarProdutos() {
  if (!fs.existsSync(file)) {
    const padrao = [
      { id: 1, nome: 'Coxinha', preco: 5 },
      { id: 2, nome: 'Refrigerante', preco: 6 }
    ];
    fs.writeFileSync(file, JSON.stringify(padrao, null, 2));
    return padrao;
  }
  return JSON.parse(fs.readFileSync(file));
}

function salvarProdutos(produtos) {
  fs.writeFileSync(file, JSON.stringify(produtos, null, 2));
}

module.exports = { listarProdutos, salvarProdutos };