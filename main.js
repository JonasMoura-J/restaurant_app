const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { salvarVenda } = require('./services/excelService');
const { listarProdutos, salvarProdutos } = require('./services/productService');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  win.loadFile('./renderer/index.html');
}

app.whenReady().then(createWindow);

ipcMain.handle('salvar-venda', (_, venda) => salvarVenda(venda));
ipcMain.handle('listar-produtos', () => listarProdutos());
ipcMain.handle('salvar-produtos', (_, produtos) => salvarProdutos(produtos));