import { useEffect, useState } from "react";
import { api } from "../lib/api";

type Payment = {
  id: number;
  orderId: number;
  method: string;
  amount: number;
  paidAt: string;
};

export default function Pagamento() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setError("");
        setIsLoading(true);
        const { data } = await api.get<Payment[]>("/payments");
        setPayments(data);
      } catch {
        setError("Não foi possível carregar os pagamentos.");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchPayments();
  }, []);

  const totalRecebido = payments.reduce((total, payment) => total + payment.amount, 0);

  return (
    <section className="page-stack">
      <header className="page-title-row">
        <div>
          <p className="page-eyebrow">Financeiro</p>
          <h2 className="page-title">Pagamentos</h2>
          <p className="page-subtitle">Resumo das cobranças registradas no dia.</p>
        </div>
      </header>

      <div className="metric-grid">
        <article className="metric-card">
          <p>Total recebido</p>
          <strong>R$ {totalRecebido.toFixed(2)}</strong>
        </article>
        <article className="metric-card">
          <p>Transações</p>
          <strong>{payments.length}</strong>
        </article>
      </div>

      <section className="section-card">
        {isLoading ? <p className="loading-state">Carregando pagamentos...</p> : null}
        {error ? <p className="error-state">{error}</p> : null}

        {!isLoading && !error ? (
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Pedido</th>
                  <th>Método</th>
                  <th>Valor</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>#{payment.id}</td>
                    <td>Pedido {payment.orderId}</td>
                    <td>{payment.method}</td>
                    <td>R$ {payment.amount.toFixed(2)}</td>
                    <td>{new Date(payment.paidAt).toLocaleDateString("pt-BR")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>
    </section>
  );
}
