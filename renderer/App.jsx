const { useState, useEffect } = React;

function App() {
  const [total, setTotal] = useState(0);
  const [itens, setItens] = useState([]);
  const [pagamento, setPagamento] = useState("Dinheiro");
  const [valorPago, setValorPago] = useState(0);

  const produtos = [
    { id: 1, nome: "Coxinha", preco: 5 },
    { id: 2, nome: "Refrigerante", preco: 6 },
    { id: 3, nome: "Doce", preco: 4 }
  ];

  function adicionarItem(prod) {
    setItens([...itens, prod]);
    setTotal(total + prod.preco);
  }

  function finalizar() {
    window.api.salvarVenda({
      itens,
      total,
      pagamento,
      data: new Date().toISOString()
    });

    alert("Venda salva!");
    setItens([]);
    setTotal(0);
    setValorPago(0);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Caixa da Lanchonete</h1>

      <div>
        {produtos.map(p => (
          <button key={p.id} onClick={() => adicionarItem(p)}>
            {p.nome} - R$ {p.preco}
          </button>
        ))}
      </div>

      <h2>Total: R$ {total}</h2>

      <select value={pagamento} onChange={e => setPagamento(e.target.value)}>
        <option>Dinheiro</option>
        <option>Pix</option>
        <option>Cartão</option>
      </select>

      {pagamento === "Dinheiro" && (
        <div>
          <input
            type="number"
            placeholder="Valor pago"
            onChange={e => setValorPago(Number(e.target.value))}
          />
          <p>Troco: R$ {valorPago - total}</p>
        </div>
      )}

      <button onClick={finalizar}>Finalizar compra</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);