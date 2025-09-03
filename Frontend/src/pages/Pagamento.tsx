import { useEffect, useState } from "react";

type Payment = {
  id: number;
  description: string;
  amount: number;
  status: string;
  createdAt: string;
};

export default function Pagamento() {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch("http://localhost:3000/payments");
        if (!res.ok) {
          throw new Error("Erro ao buscar pagamentos");
        }
        const data = await res.json();
        setPayments(data);
      } catch (error) {
        console.error("Erro ao carregar pagamentos:", error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1 style={{ color: "#c71f28" }}>Gerenciar Pagamento</h1>
      <p>Aqui você poderá ver os pagamentos.</p>

      <div style={{ overflowX: "auto", marginTop: 20 }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <thead style={{ background: "#c71f28", color: "white" }}>
            <tr>
              <th style={{ padding: 12, textAlign: "left" }}>ID</th>
              <th style={{ padding: 12, textAlign: "left" }}>Descrição</th>
              <th style={{ padding: 12, textAlign: "left" }}>Valor</th>
              <th style={{ padding: 12, textAlign: "left" }}>Status</th>
              <th style={{ padding: 12, textAlign: "left" }}>Data</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: 12 }}>{p.id}</td>
                <td style={{ padding: 12 }}>{p.description}</td>
                <td style={{ padding: 12 }}>R$ {p.amount.toFixed(2)}</td>
                <td style={{ padding: 12 }}>{p.status}</td>
                <td style={{ padding: 12 }}>
                  {new Date(p.createdAt).toLocaleDateString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
