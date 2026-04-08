export default function Cardapio() {
  const categorias = [
    { nome: "Pizzas Tradicionais", itens: 12, destaque: "Mussarela, Calabresa, Portuguesa" },
    { nome: "Pizzas Premium", itens: 8, destaque: "Parma, Brie com Mel, Camarão" },
    { nome: "Bebidas", itens: 14, destaque: "Refrigerantes, sucos e drinks" },
  ];

  return (
    <section className="page-stack">
      <header className="page-title-row">
        <div>
          <p className="page-eyebrow">Produtos</p>
          <h2 className="page-title">Cardápio</h2>
          <p className="page-subtitle">Organize categorias, preços e itens mais vendidos.</p>
        </div>
      </header>

      <div className="category-grid">
        {categorias.map((categoria) => (
          <article key={categoria.nome} className="category-card">
            <p className="category-count">{categoria.itens} itens</p>
            <h3>{categoria.nome}</h3>
            <p>{categoria.destaque}</p>
            <button type="button">Gerenciar categoria</button>
          </article>
        ))}
      </div>
    </section>
  );
}
