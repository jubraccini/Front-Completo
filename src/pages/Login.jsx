import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { UserContext } from "../context/UserContext";

import logo from "../assets/img/logo.png";
import bg from "../assets/img/gmaps.jpg"; // Certifique-se de usar a imagem de fundo anterior

export function Login() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleSubmitLogin = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const senha = event.target.senha.value;

    try {
      const response = await fetch("https://denguealerta202401-production.up.railway.app/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

      const data = await response.text(); // JSON Web Token
      console.log(data); // JSON Web Token do usuário
      login(data);
      navigate("/home");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <>
      <main className="content" style={{ backgroundImage: `url(${bg})` }}>
        <img src={logo} width="120" className="mb-5" alt="Logo" />

        <form onSubmit={handleSubmitLogin}>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            name="email"
            className="input mb-5"
            required
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            name="senha"
            className="input mb-5"
            required
          />
          <button type="submit" className="btn mb-5">
            Entrar
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
        <Link to="/register" className="btn">
          Crie sua conta
        </Link>
      </div>
      </main>

      <Footer />
    </>
  );
}
