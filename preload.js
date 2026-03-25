const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  salvarVenda: (v) => ipcRenderer.invoke('salvar-venda', v),
  listarProdutos: () => ipcRenderer.invoke('listar-produtos'),
  salvarProdutos: (p) => ipcRenderer.invoke('salvar-produtos', p)
});