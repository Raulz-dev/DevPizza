import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import "../css/register.css";

type FormData = {
  name: string;
  email: string;
  senha: string;
  cargo: "ATTENDANT" | "MANAGER" | "KITCHEN";
  turno: string;
};

const CARGOS: FormData["cargo"][] = ["ATTENDANT", "MANAGER", "KITCHEN"];

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<FormData>({
    defaultValues: { cargo: "ATTENDANT", turno: "" },
  });

  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const onSubmit = async (values: FormData) => {
    try {
      setError("");
      await api.post("/register", {
        name: values.name,
        email: values.email,
        senha: values.senha,
        cargo: values.cargo,
        turno: values.turno,
      });
      reset();
      navigate("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e?.response?.data?.error ?? "Erro ao registrar funcionário");
    }
  };

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit(onSubmit)} className="register-card">
        <h1 className="register-title">Criar conta</h1>
        <p className="register-subtitle">
          Cadastre o funcionário para acessar o sistema
        </p>

        <label htmlFor="name" className="register-label">
          Nome
        </label>
        <input
          id="name"
          className="register-input"
          {...register("name", { required: true })}
          placeholder="Nome completo"
          autoComplete="name"
        />

        <label htmlFor="email" className="register-label">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          className="register-input"
          {...register("email", { required: true })}
          placeholder="voce@exemplo.com"
          autoComplete="email"
        />

        <label htmlFor="senha" className="register-label">
          Senha
        </label>
        <div className="register-passwrap">
          <input
            id="senha"
            type={showPass ? "text" : "password"}
            className="register-input"
            {...register("senha", { required: true, minLength: 6 })}
            placeholder="Crie uma senha"
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPass((s) => !s)}
            aria-label={showPass ? "Ocultar senha" : "Mostrar senha"}
            className="register-passbtn"
            title={showPass ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPass ? "🙈" : "👁️"}
          </button>
        </div>

        <label htmlFor="cargo" className="register-label">
          Cargo
        </label>
        <select
          id="cargo"
          className="register-select"
          {...register("cargo", { required: true })}
        >
          {CARGOS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <label htmlFor="turno" className="register-label">
          Turno
        </label>
        <input
          id="turno"
          className="register-input"
          {...register("turno", { required: true })}
          placeholder='Ex.: "MANHÃ", "TARDE", "NOITE"...'
        />

        {error && <p className="register-error">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="register-submit"
        >
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </button>

        <p className="register-footer">
          Já tem conta?{" "}
          <Link to="/login" className="register-link">
            Entrar
          </Link>
        </p>
      </form>
    </div>
  );
}
