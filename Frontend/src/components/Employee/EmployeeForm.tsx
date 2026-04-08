import React, { useState } from "react";
import { createEmployee, type CreateEmployeePayload } from "../../services/employeeService";

interface Props {
  onAdd: () => void;
  onClose: () => void;
}

export const EmployeeForm: React.FC<Props> = ({ onAdd, onClose }) => {
  const [form, setForm] = useState<CreateEmployeePayload>({
    name: "",
    email: "",
    cargo: "ATTENDANT",
    turno: "",
    senha: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.cargo || !form.turno || !form.senha) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      setError("");
      setIsSubmitting(true);
      await createEmployee(form);
      onAdd();
      onClose();
    } catch {
      setError("Não foi possível criar o funcionário.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <div className="employee-grid">
        <label className="employee-field">
          Nome
          <input
            className="employee-input"
            name="name"
            placeholder="Ex: João Pereira"
            value={form.name}
            onChange={handleChange}
          />
        </label>

        <label className="employee-field">
          E-mail
          <input
            type="email"
            className="employee-input"
            name="email"
            placeholder="Ex: joao@empresa.com"
            value={form.email}
            onChange={handleChange}
          />
        </label>

        <label className="employee-field">
          Cargo
          <select className="employee-input" name="cargo" value={form.cargo} onChange={handleChange}>
            <option value="ATTENDANT">ATTENDANT</option>
            <option value="MANAGER">MANAGER</option>
            <option value="KITCHEN">KITCHEN</option>
          </select>
        </label>

        <label className="employee-field">
          Turno
          <input
            className="employee-input"
            name="turno"
            placeholder="Ex: Noite"
            value={form.turno}
            onChange={handleChange}
          />
        </label>

        <label className="employee-field">
          Senha
          <input
            type="password"
            className="employee-input"
            name="senha"
            placeholder="Digite uma senha segura"
            value={form.senha}
            onChange={handleChange}
          />
        </label>

        {error ? <p className="error-state">{error}</p> : null}

        <div className="employee-actions">
          <button type="button" className="secondary-btn" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="primary-btn" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar funcionário"}
          </button>
        </div>
      </div>
    </form>
  );
};
