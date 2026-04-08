import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const fillDemoUser = () => {
    setValue("email", "raul@devpizza.com");
    setValue("password", "123456");
  };

  const onSubmit = async (values: FormData) => {
    try {
      setError("");
      await login(values.email, values.password);
      navigate("/mesas", { replace: true });
    } catch {
      setError("Credenciais inválidas.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form-card">
      <h2 className="auth-form-title">Entrar</h2>
      <p className="auth-form-subtitle">Acesse para gerenciar a operação da pizzaria.</p>

      <div className="auth-demo-box">
        <p>
          Usuário padrão: <strong>raul@devpizza.com</strong>
        </p>
        <p>
          Senha: <strong>123456</strong>
        </p>
        <button type="button" className="auth-demo-fill" onClick={fillDemoUser}>
          Preencher automático
        </button>
      </div>

      <label htmlFor="email" className="auth-field-label">
        E-mail
      </label>
      <input
        id="email"
        type="email"
        className="auth-input"
        {...register("email", { required: true })}
        placeholder="voce@empresa.com"
        autoComplete="email"
      />

      <label htmlFor="password" className="auth-field-label">
        Senha
      </label>
      <div className="auth-password-wrap">
        <input
          id="password"
          type={showPass ? "text" : "password"}
          className="auth-input"
          {...register("password", { required: true })}
          placeholder="Digite sua senha"
          autoComplete="current-password"
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

      {error ? <p className="auth-form-error">{error}</p> : null}

      <button type="submit" disabled={isSubmitting} className="auth-submit">
        {isSubmitting ? "Entrando..." : "Entrar"}
      </button>

      <p className="auth-form-footer">
        Não tem conta?{" "}
        <Link to="/register" className="auth-form-link">
          Cadastre-se
        </Link>
      </p>
    </form>
  );
}
