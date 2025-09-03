import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import "../css/login.css";

type FormData = { email: string; password: string };

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>();
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const onSubmit = async (values: FormData) => {
    try {
      setError("");
      const { data } = await api.post("/login", values);

      if (!data?.token) {
        setError("Resposta inválida do servidor.");
        return;
      }

      localStorage.setItem("token", data.token);

      navigate("/mesas", { replace: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e?.response?.data?.error ?? "Credenciais inválidas");
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit(onSubmit)} className="login-card">
        <h1 className="login-title">Acessar conta da pizzaria</h1>
        <p className="login-subtitle">Seja Bem-vindo!</p>

        <label htmlFor="email" className="login-label">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          {...register("email", { required: true })}
          className="login-input"
        />

        <label htmlFor="password" className="login-label">
          Senha
        </label>
        <div className="login-passwrap">
          <input
            id="password"
            type={showPass ? "text" : "password"}
            {...register("password", { required: true })}
            className="login-input"
          />
          <button
            type="button"
            onClick={() => setShowPass((s) => !s)}
            className="login-passbtn"
          >
            {showPass ? "🙈" : "👁️"}
          </button>
        </div>

        {error && <p className="login-error">{error}</p>}

        <button type="submit" disabled={isSubmitting} className="login-submit">
          {isSubmitting ? "Entrando..." : "Acessar conta da pizzaria"}
        </button>

        <p className="login-footer">
          Não tem conta?{" "}
          <Link to="/register" className="login-link">
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  );
}
