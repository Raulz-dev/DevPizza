import React, { useEffect, useState } from "react";
import { Employee, getEmployees } from "../services/employeeService";
import { EmployeeTable } from "../components/Employee/EmployeeTable";
import { EmployeeForm } from "../components/Employee/EmployeeForm";

export default function Funcionarios() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setError("");
      setIsLoading(true);
      const data = await getEmployees();
      setEmployees(data);
    } catch {
      setError("Não foi possível carregar funcionários agora.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  return (
    <section className="page-stack">
      <header className="page-title-row">
        <div>
          <p className="page-eyebrow">Equipe</p>
          <h2 className="page-title">Funcionários</h2>
          <p className="page-subtitle">Gerencie acesso, cargos e turnos da equipe de atendimento.</p>
        </div>
        <button type="button" onClick={() => setShowModal(true)} className="primary-btn">
          + Adicionar funcionário
        </button>
      </header>

      <section className="section-card">
        {isLoading ? (
          <p className="loading-state">Carregando funcionários...</p>
        ) : error ? (
          <p className="error-state">{error}</p>
        ) : employees.length === 0 ? (
          <p className="empty-state">Nenhum funcionário cadastrado ainda.</p>
        ) : (
          <EmployeeTable employees={employees} />
        )}
      </section>

      {showModal ? (
        <div className="modal-overlay" role="presentation">
          <div className="modal-card">
            <div className="modal-head">
              <h3>Novo Funcionário</h3>
              <button type="button" className="modal-close" onClick={() => setShowModal(false)}>
                Fechar
              </button>
            </div>

            <EmployeeForm
              onAdd={() => {
                void fetchData();
              }}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
