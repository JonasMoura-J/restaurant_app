const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

function caminhoVendas() {
  const hoje = new Date();
  return path.join(__dirname, '..', 'data', 'vendas', `${hoje.getFullYear()}-${hoje.getMonth()+1}.xlsx`);
}

function backupArquivo(filePath) {
  const backupDir = path.join(__dirname, '..', 'data', 'backup');
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

  const nome = path.basename(filePath);
  const destino = path.join(backupDir, nome.replace('.xlsx', `-${Date.now()}.xlsx`));

  if (fs.existsSync(filePath)) fs.copyFileSync(filePath, destino);
}

function salvarVenda(venda) {
  const filePath = caminhoVendas();
  backupArquivo(filePath);

  let wb, ws;

  if (fs.existsSync(filePath)) {
    wb = XLSX.readFile(filePath);
    ws = wb.Sheets['Vendas'];
  } else {
    wb = XLSX.utils.book_new();
    ws = XLSX.utils.json_to_sheet([]);
    XLSX.utils.book_append_sheet(wb, ws, 'Vendas');
  }

  const dados = XLSX.utils.sheet_to_json(ws);

  dados.push({
    id: Date.now(),
    data: new Date().toLocaleDateString(),
    itens: venda.itens.map(i => i.nome).join(', '),
    pagamento: venda.pagamento,
    total: venda.total
  });

  wb.Sheets['Vendas'] = XLSX.utils.json_to_sheet(dados);
  XLSX.writeFile(wb, filePath);
}

module.exports = { salvarVenda };