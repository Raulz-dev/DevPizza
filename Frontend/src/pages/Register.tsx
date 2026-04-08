import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { type RegisterPayload } from "../context/AuthContext";
import { useAuth } from "../context/useAuth";

const CARGOS: RegisterPayload["cargo"][] = ["ATTENDANT", "MANAGER", "KITCHEN"];

export default function Register() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<RegisterPayload>({
    defaultValues: { cargo: "ATTENDANT", turno: "" },
  });

  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const onSubmit = async (values: RegisterPayload) => {
    try {
      setError("");
      await registerUser(values);
      reset();
      navigate("/login");
    } catch {
      setError("Não foi possível concluir o cadastro.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form-card">
      <h2 className="auth-form-title">Cadastro da brigada</h2>
      <p className="auth-form-subtitle">Adicione um novo colaborador para operar a pizzaria.</p>

      <label htmlFor="name" className="auth-field-label">
        Nome do colaborador
      </label>
      <input id="name" className="auth-input" {...register("name", { required: true })} placeholder="Nome completo da equipe" autoComplete="name" />

      <label htmlFor="email" className="auth-field-label">
        E-mail de acesso
      </label>
      <input
        id="email"
        type="email"
        className="auth-input"
        {...register("email", { required: true })}
        placeholder="gestao@devpizza.com"
        autoComplete="email"
      />

      <label htmlFor="senha" className="auth-field-label">
        Senha
      </label>
      <div className="auth-password-wrap">
        <input
          id="senha"
          type={showPass ? "text" : "password"}
          className="auth-input"
          {...register("senha", { required: true, minLength: 6 })}
          placeholder="Crie uma senha de acesso"
          autoComplete="new-password"
        />
        <button
          type="button"
          className="auth-password-toggle"
          onClick={() => setShowPass((current) => !current)}
          aria-label={showPass ? "Ocultar senha" : "Mostrar senha"}
        >
          {showPass ? "Ocultar" : "Mostrar"}
        </button>
      </div>

      <label htmlFor="cargo" className="auth-field-label">
        Função na casa
      </label>
      <select id="cargo" className="auth-select" {...register("cargo", { required: true })}>
        {CARGOS.map((cargo) => (
          <option key={cargo} value={cargo}>
            {cargo}
          </option>
        ))}
      </select>

      <label htmlFor="turno" className="auth-field-label">
        Turno
      </label>
      <input id="turno" className="auth-input" {...register("turno", { required: true })} placeholder="Ex.: NOITE (forno), TARDE (salão)" />

      {error ? <p className="auth-form-error">{error}</p> : null}

      <button type="submit" disabled={isSubmitting} className="auth-submit">
        {isSubmitting ? "Salvando cadastro..." : "Cadastrar colaborador"}
      </button>

      <p className="auth-form-footer">
        Já tem conta?{" "}
        <Link to="/login" className="auth-form-link">
          Entrar
        </Link>
      </p>
    </form>
  );
}
